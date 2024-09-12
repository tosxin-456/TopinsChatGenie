import { useState } from "react";
import searchIcon from "../images/ic_round-search.svg";
import on from "../images/SwitcherOn.svg";
import off from "../images/SwitcherOff.svg";
import notifyIcon from "../images/ri_notification-4-line.svg";
import { useNavigate } from "react-router";
import { useTheme } from "./useTheme";
import back from "../images/ep--back-black.svg";
import backWhite from "../images/ep--back-white.svg";
import { Link } from "react-router-dom";

export default function Settings() {
  const history = useNavigate();
  const { isDarkMode } = useTheme();
  const [isOn, setIsOn] = useState(true);
  const [isOn2, setIsOn2] = useState(true);
  const [isOn3, setIsOn3] = useState(true);
  const [isOn4, setIsOn4] = useState(true);

  const toggleImage = () => setIsOn(!isOn);
  const toggleImage2 = () => setIsOn2(!isOn2);
  const toggleImage3 = () => setIsOn3(!isOn3);
  const toggleImage4 = () => setIsOn4(!isOn4);

  return <div className={`${isDarkMode ? "bg-[#121212] text-white" : "bg-white text-black"} min-h-screen`} style={{ fontFamily: "Roboto, sans-serif", fontWeight: "400" }}>
      {/* <header className="hidden md:block">
        <nav className={`topHeader flex justify-between items-center my-10 ${isDarkMode ? "bg-[#1e1e1e]" : "bg-[#f0f0f0]"}`}>
          <h1
            className={`text-2xl font-bold ${isDarkMode
              ? "text-[#a1c4fd]"
              : "text-[#263A5C]"}`}
          >
            Settings
          </h1>
          <div className="flex items-center gap-4">
            <img onClick={() => history("../notification")} src={notifyIcon} alt="Bell Icon" className={isDarkMode ? "filter invert" : ""} />
            <span onClick={() => history("../profile")} className={`rounded-full px-3 py-1 text-xl cursor-pointer ${isDarkMode ? "bg-[#6C8571] text-white" : "bg-[#6C8571] text-white"}`}>
              T
            </span>
          </div>
        </nav>
      </header> */}
      <div className="h-[45vh] sm:h-[50vh] w-[90%] m-auto flex flex-col justify-between">
        <Link className="mt-[15px]" to="/dashboard">
          <img  src={isDarkMode ? backWhite : back} alt="Back Arrow" width={30} className="mb-4" />
        </Link>
        <div className="flex items-center">
          <div>
            <b>
              <h1>Notification</h1>
            </b>
            <p>Allow notifications from this app</p>
          </div>
          <img onClick={toggleImage} className="ml-auto hover:cursor-pointer" src={isOn ? on : off} alt="Toggle" />
        </div>
        <div className={`w-full ${isDarkMode ? "bg-gray-300" : "bg-[#333]"} h-[1px]`} />
        <div className="flex items-center">
          <b>
            <p>Show notifications from this app</p>
          </b>
          <img onClick={toggleImage2} className="ml-auto hover:cursor-pointer" src={isOn2 ? on : off} alt="Toggle" />
        </div>
        <div className={`w-full ${isDarkMode ? "bg-gray-300" : "bg-[#333]"} h-[0.05rem]`} />
        <div className="flex items-center">
          <div>
            <b>
              <h1>Sounds</h1>
            </b>
            <p>None</p>
          </div>
          <img onClick={toggleImage3} className="ml-auto hover:cursor-pointer" src={isOn3 ? on : off} alt="Toggle" />
        </div>
        <div className={`w-full ${isDarkMode ? "bg-gray-300" : "bg-[#333]"} h-[0.05rem]`} />
        <div className="flex items-center">
          <b>
            <p>Vibrate</p>
          </b>
          <img onClick={toggleImage4} className="ml-auto hover:cursor-pointer" src={isOn4 ? on : off} alt="Toggle" />
        </div>
        <div className={`w-full ${isDarkMode ? "bg-gray-300" : "bg-[#333]"} h-[0.05rem]`} />
        <p>Change email address</p>
        <div className={`w-full ${isDarkMode ? "bg-gray-300" : "bg-[#333]"} h-[0.05rem]`} />
        <p>Reset Password</p>
      </div>
    </div>;
}
