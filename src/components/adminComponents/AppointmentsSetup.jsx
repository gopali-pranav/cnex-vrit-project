import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { GoDash } from "react-icons/go";
import { HiOutlineTrash } from "react-icons/hi";
import { FiUploadCloud } from "react-icons/fi";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentsSetup = ({ onClose, appointmentId }) => {
  const [serviceType, setServiceType] = useState("");
  const [slots, setSlots] = useState([{ startTime: "", endTime: "" }]);
  const [numSheets, setNumSheets] = useState("");
  const [serviceCharge, setServiceCharge] = useState("");
  const [image, setImage] = useState(null);
  const [editedSlots, setEditedSlots] = useState([]);

  useEffect(() => {
    if (appointmentId) {
      fetchAppointment();
    }
  }, [appointmentId]);

  const fetchAppointment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/appointments/${appointmentId}`
      );
      const appointmentData = res.data;

      // Populate form fields with fetched appointment details
      setServiceType(appointmentData.serviceType);
      setSlots(appointmentData.slots);
      setNumSheets(appointmentData.numSheets);
      setServiceCharge(appointmentData.serviceCharge);
      setImage(appointmentData.image);
    } catch (error) {
      console.error("Error fetching appointment:", error);
    }
  };

  const handleAddSlot = () => {
    setSlots([...slots, { startTime: "", endTime: "" }]);
  };

  const handleClose = () => {
    onClose();
  };

  const handleDeleteSlot = (index) => {
    const updatedSlots = [...slots];
    updatedSlots.splice(index, 1);
    setSlots(updatedSlots);
  };

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...slots];
    updatedSlots[index][field] = value;
    setSlots(updatedSlots);

    // Update the edited slots
    const editedSlot = { ...updatedSlots[index], [field]: value };
    setEditedSlots((prevEditedSlots) => {
      const newEditedSlots = [...prevEditedSlots];
      newEditedSlots[index] = editedSlot;
      return newEditedSlots;
    });
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (appointmentId) {
        // If appointmentId is present, update the appointment
        const updatedData = {};
        if (serviceType !== "") updatedData.serviceType = serviceType;
        if (editedSlots.length > 0) updatedData.slots = editedSlots;
        if (numSheets !== "") updatedData.numSheets = numSheets;
        if (serviceCharge !== "") updatedData.serviceCharge = serviceCharge;
        if (image !== null) updatedData.image = image;

        const res = await axios.put(
          `http://localhost:3000/appointments/${appointmentId}`,
          updatedData
        );
        toast.success("Appointment updated successfully", res.data);
      } else {
        // Otherwise, add a new appointment
        const res = await axios.post("http://localhost:3000/appointments", {
          serviceType,
          slots,
          numSheets,
          serviceCharge,
          image,
        });
        toast.success("Appointment added successfully", res.data);
      }

      // Reset form fields after submission
      setServiceType("");
      setSlots([{ startTime: "", endTime: "" }]);
      setNumSheets("");
      setServiceCharge("");
      setImage(null);
    } catch (error) {
      toast.error("Error adding/updating appointment: ", error);
    }
  };

  return (
    <div className="flex justify-center relative top-10">
      <div className="appointment-setup-form shadow-2xl bg-white w-[460px] p-10">
        <div className="text1 border-b border-b-lorem flex items-center justify-center relative">
          <h2 className=" p-2 text-lg mb-3">Setup Appointment</h2>
          <IoMdClose
            className="text-2xl absolute right-0 top-2 cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-2 mt-3">
          <label>Service Type:</label>
          <input
            type="text"
            placeholder="Hair cutting and  Styling"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="border border-lorem placeholder:text-xs p-2 rounded-lg w-full "
          />
          {slots.map((slot, index) => (
            <div
              key={index}
              className="flex items-center justify-between relative"
            >
              <div>
                <p>Add slots</p>
                <input
                  type="time"
                  value={slot.startTime}
                  onChange={(e) =>
                    handleSlotChange(index, "startTime", e.target.value)
                  }
                  className="border border-lorem rounded-md p-2 w-36 mt-2"
                />
              </div>

              <GoDash className="relative top-3 text-2xl" />

              <div>
                <button
                  type="button"
                  onClick={handleAddSlot}
                  className="flex items-center gap-2"
                >
                  <FaPlus className="text-sm font-normal" />{" "}
                  <span>Add More Slots</span>
                </button>
                <input
                  type="time"
                  value={slot.endTime}
                  onChange={(e) =>
                    handleSlotChange(index, "endTime", e.target.value)
                  }
                  className="border border-lorem rounded-md p-2 w-36 mt-2"
                />
              </div>

              {index > 0 && (
                <button
                  type="button"
                  onClick={() => handleDeleteSlot(index)}
                  className="absolute -right-8 bottom-3 text-2xl text-red"
                >
                  <HiOutlineTrash />
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-between">
            <label className="flex flex-col gap-2">
              No. of Available Staffs
              <input
                type="number"
                value={numSheets}
                onChange={(e) => setNumSheets(e.target.value)}
                className="w-44 h-10 p-2 border rounded-md border-lorem"
              />
            </label>

            <label className="flex flex-col gap-2">
              Service Fee
              <input
                type="number"
                value={serviceCharge}
                onChange={(e) => setServiceCharge(e.target.value)}
                className="w-44 h-10 p-2 border rounded-md border-lorem"
              />
            </label>
          </div>

          <label className="w-full bg-categoriestextcolor h-32 flex items-center justify-center cursor-pointer text-primary font-semibold rounded-md">
            {image ? (
              <img
                src={image}
                className="w-full h-full object-cover"
                alt="Uploaded"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <FiUploadCloud />
                <p>Upload Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </div>
            )}
          </label>
        </form>

        <button
          className="w-full bg-primary text-categoriestextcolor p-3 mt-10 rounded-md"
          onClick={handleSubmit}
        >
          {appointmentId ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentsSetup;
