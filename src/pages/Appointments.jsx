import { Link } from "react-router-dom";

const Appointments = () => {
  return (
    <div>
      <div className="content1 flex justify-between p-4">
        <div>
          <h2 className="text-xl font-semibold">Appointments</h2>
          <p className="text-featurecolor text-sm">View all appointments</p>
        </div>
        <Link to={"/manage_appointment"}>
          <button
            type="submit" // Specify button type as submit
            className="bg-primary w-52 p-2 rounded-md text-categoriestextcolor"
          >
            Manage Appointment
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Appointments;
