import { FaPlus } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ManageAppointments = () => {
  return (
    <div>
      <div className="content1 flex justify-between p-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-4">
            {" "}
            <Link to={"/appointment"}>
              <FaArrowLeft className="cursor-pointer" />
            </Link>{" "}
            Manage Appointment
          </h2>
        </div>
        <button
          type="submit" // Specify button type as submit
          className="bg-primary w-32 p-4 h-10 rounded-md text-categoriestextcolor flex items-center gap-4"
        >
          {" "}
          <FaPlus />
          Setup
        </button>
      </div>
    </div>
  );
};

export default ManageAppointments;
