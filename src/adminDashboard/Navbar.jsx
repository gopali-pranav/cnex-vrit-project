import "../App.css";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="header grid grid-cols-1 px-10 shadow-md h-14">
      <div className="user flex items-center justify-end gap-3">
        <FaUserCircle className="text-3xl" /> Pranav Gopali
      </div>
    </header>
  );
};

export default Navbar;
