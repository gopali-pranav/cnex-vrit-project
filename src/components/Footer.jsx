import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className=" text-white bg-primary flex flex-col justify-center items-center">
      <div className="footerContainer  flex justify-between mt-32 ">
        <div>
          <img
            src="/logo.jpg"
            alt=""
            className="h-14 w-32 mix-blend-multiply"
          />
        </div>
        <div className="footinfo1 flex flex-col gap-3">
          <h3 className="text-2xl">Contact us</h3>
          <div className="space-y-2 text-sm">
            <h4>Head office:</h4>
            <h4>Sankhamul, Baneshwor</h4>
            <h4>+977 98********</h4>
            <h4>cnex@gmail.com</h4>
          </div>
          <div className="flex text-secondary gap-2">
            <Link>
              {" "}
              <FaFacebookSquare className="text-3xl " />{" "}
            </Link>
            <Link>
              {" "}
              <FaInstagram className="text-3xl" />{" "}
            </Link>
            <Link>
              {" "}
              <FaSquareTwitter className="text-3xl" />{" "}
            </Link>
          </div>
        </div>

        <div className="footinfo2 flex flex-col gap-3">
          <h3 className="text-2xl">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link>Order and Pre-order</Link>
            </li>
            <li>
              <Link>Beauty service Appointment Booking</Link>
            </li>
            <li>
              <Link>Order and Pre-order</Link>
            </li>
            <li>
              <Link>Order and Pre-order</Link>
            </li>
          </ul>
        </div>

        <div className="footinfo3 flex flex-col gap-3">
          <h3 className="text-2xl">Download our App</h3>
          <div className="w-44 flex flex-col gap-3">
            <img src="/AppStore.png" alt="" />
            <img src="/GooglePlay.png" alt="" />
          </div>
        </div>
      </div>
      <div className="border-t-2 mt-14 w-5/6">
        <p className="flex text-sm text-footercolor mt-8 mb-36 justify-center">
          Copyright © 2024 Cnex. All rights reserved. Powered by:{" "}
          <span>
            {" "}
            <img src="/vrit.png" alt="" className="w-14" />
          </span>{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
