import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="flex justify-between px-16 items-center bg-slate-300 max-w-full h-[70px]">
      <div className="logo w-[138px] h-[50px] flex items-center">
        <img src="/logo.jpg" alt="" className="mix-blend-multiply" />
      </div>
      <nav>
        <ul className="menu flex items-center text-primary space-x-14 font-semibold">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
          <li>
            <Link to="/contact">Contact us</Link>
          </li>
        </ul>
      </nav>
      <button className="btn bg-primary">Download Now</button>
    </div>
  );
};

export default Header;
