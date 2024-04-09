import { Link } from "react-router-dom";
import { Table, Input, DatePicker, Space, Select, Modal } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";

const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [rangeDates, setRangeDates] = useState([]);
  const [serviceType, setServiceType] = useState("");
  const [selectedAppointment, setSelectedAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by search text
    const searchMatch = appointment.serviceType
      .toLowerCase()
      .includes(searchText.toLowerCase());
    // Filter by date range
    const dateMatch =
      !rangeDates.length ||
      (new Date(appointment.date) >= rangeDates[0].startOf("day") &&
        new Date(appointment.date) <= rangeDates[1].endOf("day"));
    // Filter by service type
    const serviceMatch =
      !serviceType || appointment.serviceType === serviceType;

    return searchMatch && dateMatch && serviceMatch;
  });

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => {
        const truncatedId =
          text.length > 8 ? text.substring(0, 8) + "..." : text;
        return (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedAppointmentId(text)}
          >
            {truncatedId}
          </span>
        );
      },
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Slots",
      dataIndex: "slots",
      key: "slots",
      render: (slots) => (
        <span>
          {slots.map((slot, index) => (
            <span key={index}>
              {slot.startTime} - {slot.endTime}
              {index !== slots.length - 1 && <br />}
            </span>
          ))}
        </span>
      ),
    },
    {
      title: "No. of Sheets",
      dataIndex: "numSheets",
      key: "numSheets",
    },
    {
      title: "Service Charge",
      dataIndex: "serviceCharge",
      key: "serviceCharge",
    },
  ];

  return (
    <div>
      <div className="content1 flex justify-between">
        <div>
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-featurecolor text-sm">View all appointments</p>
        </div>
        <Link to={"/manage_appointment"}>
          <button
            type="submit"
            className="bg-primary w-52 p-2 rounded-md text-categoriestextcolor"
          >
            Manage Appointment
          </button>
        </Link>
      </div>
      <div className="mt-4">
        <div style={{ marginBottom: 16 }} className="flex justify-between">
          <div>
            <span>
              Show{" "}
              <span className="border p-1 rounded-md border-lorem">10</span> per
              page
            </span>
          </div>
          <Search
            placeholder="Search orders"
            style={{ width: 200, marginRight: 16 }}
            onChange={(e) => setSearchText(e.target.value)}
          />

          <RangePicker
            style={{ marginRight: 16 }}
            onChange={(dates) => setRangeDates(dates)}
          />

          <Select
            placeholder="Service Type"
            style={{ width: 150, marginRight: 16 }}
            onChange={(value) => setServiceType(value)}
          >
            <Option value="styling">Styling</Option>
            <Option value="Nail Painting">Nail Painting</Option>
          </Select>

          <Select placeholder="Payment Status" style={{ width: 150 }}>
            <Option value="Pending">Pending</Option>
            <Option value="Paid">Paid</Option>
            <Option value="Failed">Failed</Option>
          </Select>

          <Modal
            title="Appointment ID"
            visible={selectedAppointment !== null}
            onCancel={() => setSelectedAppointmentId(null)}
            footer={null}
          >
            <p>{selectedAppointment}</p>
          </Modal>
        </div>
        <Table dataSource={filteredAppointments} columns={columns} />
      </div>
    </div>
  );
};

export default Appointments;
