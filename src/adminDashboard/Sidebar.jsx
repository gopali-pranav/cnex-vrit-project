import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineShoppingCart } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { RiCoupon3Fill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { AiTwotoneSound } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FaSackDollar } from "react-icons/fa6";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [dropdown, setdropdown] = useState("");
  const [activeItem, setActiveItem] = useState("Products");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const toggleDropdown = () => {
    setdropdown(!dropdown);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-container px-5 w-72 shadow-lg min-h-full">
        <div className="logo">
          <img src={"/logo.jpg"} alt="logo" className="w-44 mb-8" />
        </div>
        <div className="sidebarList ">
          <ul>
            <li>
              <Link
                className={` list px-4 ${
                  activeItem === "Products" ? "bg-primary" : ""
                } rounded-md`}
                onClick={() => handleItemClick("Products")}
              >
                <HiOutlineArchiveBox /> Products{" "}
                <IoMdArrowDropdown
                  className={`ml-14 text-2xl ${dropdown ? "rotate-180" : ""}`}
                  onClick={toggleDropdown}
                />
              </Link>
              <div>
                {dropdown && (
                  <ul className="ml-12 space-y-4 text-sidebarcolor mb-3 text-lg">
                    <li>
                      <Link to={"/categories"}>Categories</Link>
                    </li>
                    <li>
                      <Link to={"/variations"}>Variations</Link>
                    </li>
                    <li>
                      <Link to={"/products"}>Products</Link>
                    </li>
                    <li>
                      <Link to={"/collections"}>Collections</Link>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Order" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Order")}
            >
              <Link to={"/order"} className="list">
                <MdOutlineShoppingCart /> Order
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Appointments" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Appointments")}
            >
              <Link to={"/appointment"} className="list">
                <SlCalender /> Appointments
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Coupons" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Coupons")}
            >
              <Link to={"/coupon"} className="list">
                <RiCoupon3Fill /> Coupons
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Inventory" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Inventory")}
            >
              <Link className="list">
                <FaClipboardList /> Inventory
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Campaign (CMS)" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Campaign (CMS)")}
            >
              <Link className="list">
                <AiTwotoneSound /> Campaign (CMS)
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Customer Profile" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Customer Profile")}
            >
              <Link to={"/customerprofile"} className="list">
                <FaUser /> Customer Profile
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Pre-order" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Pre-order")}
            >
              <Link className="list">
                <FaClock /> Pre-order
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Delivery" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Delivery")}
            >
              <Link className="list">
                <FaSackDollar /> Delivery Charge
              </Link>
            </li>
            <li
              className={`px-4 ${
                activeItem === "Rating & Reviews" ? "bg-primary" : ""
              } rounded-md`}
              onClick={() => handleItemClick("Rating & Reviews")}
            >
              <Link className="list">
                <MdOutlineStarPurple500 /> Rating & Reviews
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
