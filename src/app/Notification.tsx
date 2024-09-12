import searchIcon from "../images/ic_round-search.svg";
import bigIcon from "../images/ProfilePic.svg";
import notification from "../images/clarity_notification-solid.svg";
import notifyIcon from "../images/ri_notification-4-line.svg";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useTheme } from "./useTheme";

export default function Notification() {
  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion
  const { isDarkMode } = useTheme();
  const decodedToken = jwtDecode(token) as { [key: string]: string };
  const history = useNavigate();

  return (
    <div
      className={`sm:flex ${isDarkMode
        ? "bg-[#121212]"
        : "bg-white"} min-h-screen`}
    >
      <div
        className={`items-center w-[90%] ${isDarkMode
          ? "text-white"
          : "text-black"}`}
      >
        <header className="hidden md:block">
          <nav
            className={`topHeader flex justify-between items-center my-10 ${isDarkMode
              ? "bg-[#1e1e1e]"
              : "bg-[#f0f0f0]"}`}
          >
            <h1 className="text-2xl font-bold">
              {isDarkMode ? "text-[#a1c4fd]" : "text-[#263A5C]"}
            </h1>
            <div className="flex items-center gap-4">
              <img
                onClick={() => history("../notification")}
                src={notifyIcon}
                alt="Bell Icon"
                className={isDarkMode ? "filter invert" : ""}
              />
              <span
                onClick={() => history("../profile")}
                className={`rounded-full px-3 py-1 text-xl cursor-pointer ${isDarkMode
                  ? "bg-[#6C8571] text-white"
                  : "bg-[#6C8571] text-white"}`}
              >
                T
              </span>
            </div>
          </nav>
        </header>
        <div>
          <div className="w-fit m-auto mt-[50px]">
            <div className="flex">
              <img src={bigIcon} alt="" className="p-[5px] w-[90px]" />
              <h1 className="m-auto text-[30px] p-[5px]">
                {decodedToken.name}
              </h1>
            </div>
            <p className="ml-[30px] mb-[30px] text-[25px]">789001827</p>
          </div>
          <div className="flex flex-col items-center">
            <div
              style={{
                borderLeft: "1px rgba(161,164,170,0.5) solid",
                boxShadow: "2px 3px 2px rgba(161,164,170,0.5)"
              }}
              className={`flex w-full max-w-[600px] p-[5px] rounded-md mb-[15px] ${isDarkMode
                ? "bg-[#1e1e1e] text-white"
                : "bg-white text-black"}`}
            >
              <img
                src={notification}
                alt=""
                className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] p-[1px] mt-auto mb-auto mr-[20px] ml-[20px]"
              />
              <div>
                <p className="w-full text-[18px] md:text-[30px] md:pr-[2rem]">
                  {isDarkMode ? "text-[#b0b0b0]" : "text-[#464E5F]"}
                </p>
                <span className="text-[#A1A4AA] ml-[3px]">2:00pm</span>
              </div>
            </div>
            <div
              style={{
                borderLeft: "1px rgba(161,164,170,0.5) solid",
                boxShadow: "2px 3px 2px rgba(161,164,170,0.5)"
              }}
              className={`flex w-full max-w-[600px] p-[5px] rounded-md mb-[15px] ${isDarkMode
                ? "bg-[#1e1e1e] text-white"
                : "bg-white text-black"}`}
            >
              <img
                src={notification}
                alt=""
                className="w-[25px] h-[25px] md:w-[50px] md:h-[50px] p-[1px] mt-auto mb-auto mr-[20px] ml-[20px]"
              />
              <div>
                <p className="w-full text-[18px] md:text-[30px] md:pr-[2rem]">
                  {isDarkMode ? "text-[#b0b0b0]" : "text-[#464E5F]"}
                </p>
                <span className="text-[#A1A4AA] ml-[3px]">2:00pm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
