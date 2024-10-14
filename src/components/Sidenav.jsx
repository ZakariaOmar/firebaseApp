import { MdDashboard } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut, IoMdSettings } from "react-icons/io";
import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <div className="city">
      <img src="/download.png" className="future" alt="" />
      <h1 className="title">Bando Boys</h1>
      <div className="content">
        <ul className="list">
          <li>
            <Link to="/">
              <MdDashboard />
              Dashbord
            </Link>{" "}
          </li>
          <li>
            <Link to="/Income">
              <FaWallet />
              Income
            </Link>
          </li>
          <li>
            <Link to="/Expense">
              <GiExpense />
              Expense
            </Link>
          </li>
          <li>
            <Link to="/Profile">
              <CgProfile />
              Profile
            </Link>
          </li>
          <li>
            <Link to="/Settings">
              <IoMdSettings />
              Settings
            </Link>
          </li>
        </ul>
      </div>

      <button className="logout">
        <Link to="/Signin">Logout</Link>
      </button>
    </div>
  );
}

export default Sidenav;
