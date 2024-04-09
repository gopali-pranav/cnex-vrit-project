import { useState, useEffect } from "react";
import { Table, Tag, Button, Switch, Checkbox } from "antd";
import { FaPlus } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import AppointmentsSetup from "../components/adminComponents/AppointmentsSetup";
import axios from "axios";
import { HiOutlineTrash } from "react-icons/hi";
import toast from "react-hot-toast";

const ManageAppointments = () => {
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointments, setSelectedAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState(null);

  useEffect(() => {
    fetchAppointments();
  }, [selectedAppointments, appointments]); // Refetch appointments when selected appointments change

  useEffect(() => {
    // Update the count of selected appointments
    const selectedCount = selectedAppointments.length;
    if (selectedCount === 0) {
      setIsDeleteVisible(false);
    } else {
      setIsDeleteVisible(true);
    }
  }, [selectedAppointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleChangeActive = () => {};
  const handleEdit = (id) => {
    setAppointmentId(id); // Set the appointmentId
    setIsSetupOpen(true); // Open the setup page
  };
  const handleCheckboxChange = (checked, id) => {
    if (checked) {
      // Add the ID to the selectedAppointments array
      setSelectedAppointments((prevSelected) => [...prevSelected, id]);
    } else {
      // Remove the ID from the selectedAppointments array if it exists
      setSelectedAppointments((prevSelected) =>
        prevSelected.filter((selectedId) => selectedId !== id)
      );
    }
  };

  const handleDelete = async () => {
    // Delete selected appointments
    try {
      // Iterate over each selected appointment and delete it
      await Promise.all(
        selectedAppointments.map(async (id) => {
          await axios.delete(`http://localhost:3000/appointments/${id}`);
        })
      );
      // Remove deleted appointments from the local state
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => !selectedAppointments.includes(appointment._id)
        )
      );
      setSelectedAppointments([]); // Clear selected appointments after successful deletion
      toast.success("Appointments deleted successfully");
    } catch (error) {
      console.error("Error deleting appointments:", error);
      toast.error("Failed to delete appointments");
    }
  };

  const handleSetupClick = () => {
    setIsSetupOpen(true);
  };

  const handleCloseSetup = () => {
    setIsSetupOpen(false);
    setAppointmentId(null); // Reset appointmentId when closing setup page
  };

  const [isDeleteVisible, setIsDeleteVisible] = useState(false);

  const columns = [
    {
      title: "Select",
      dataIndex: "_id",
      render: (_, record) => (
        <Checkbox.Group>
          <Checkbox
            checked={selectedAppointments.includes(record._id)} // Use _id instead of id
            onChange={(e) => {
              console.log("Checkbox change event:", e);
              handleCheckboxChange(e.target.checked, record._id); // Pass _id instead of id
            }}
            key={record._id} // Use _id as key for unique identification
          />
        </Checkbox.Group>
      ),
    },
    {
      title: "S.N",
      dataIndex: "id",
      render: (_, record, index) => index + 1,
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
        <>
          {slots.map((slot, index) => (
            <Tag key={index}>
              {slot.startTime} - {slot.endTime}
            </Tag>
          ))}
        </>
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
    {
      title: "Edit",
      render: (_, record) => (
        <Button
          className="w-14 border flex items-center justify-center p-3 text-sidebarcolor"
          size="small"
          onClick={() => handleEdit(record._id)} // Pass the ID of the appointment to be edited
        >
          Edit
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Switch
          checked={record.isActive}
          onChange={(checked) => handleChangeActive(record.id, checked)}
          style={{ backgroundColor: record.isActive ? "#28a745" : "#636363" }}
        />
      ),
    },
  ];

  return (
    <div>
      <div className={`wrapper ${isSetupOpen ? "blur" : ""}`}>
        <div className="content1 flex justify-between">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-4">
              <Link to={"/appointment"}>
                <FaArrowLeft className="cursor-pointer" />
              </Link>{" "}
              Manage Appointment
            </h2>
          </div>
          <div className="flex">
            {isDeleteVisible && (
              <Button
                type="danger"
                className="mr-2 border border-secondary text-secondary w-32 p-4 h-10 rounded-md justify-center flex items-center gap-2"
                onClick={handleDelete}
                disabled={selectedAppointments.length === 0}
              >
                <HiOutlineTrash /> Delete ({selectedAppointments.length})
              </Button>
            )}
            <Button
              type="submit"
              className="bg-primary w-32 p-4 h-10 rounded-md text-categoriestextcolor flex items-center gap-4"
              onClick={handleSetupClick}
            >
              <FaPlus />
              Setup
            </Button>
          </div>
        </div>
      </div>

      {isSetupOpen && (
        <div className="overlay relative flex justify-center">
          <div className="overlay-content absolute z-20 ">
            <AppointmentsSetup
              onClose={handleCloseSetup}
              appointmentId={appointmentId}
            />
          </div>
        </div>
      )}

      <div className="mt-4">
        <Table
          dataSource={appointments}
          columns={columns}
          className={`wrapper ${isSetupOpen ? "blur" : ""}`}
        />
      </div>
    </div>
  );
};

export default ManageAppointments;
