import React, { useContext, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import history from "../../images/fluent--history-16-regular.svg";
import { jwtDecode } from "jwt-decode";
import { ScaleLoader } from "react-spinners";
import { useNavigate } from "react-router";
import { Link, Outlet, useLocation } from "react-router-dom";
import Profilesvg from "../../images/iconamoon_profile-fill.svg";
import Clearsvg from "../../images/material-symbols--delete-outline (1).svg";
import Lightsvg from "../../images/clarity--sun-solid.svg";
import Darksvg from "../../images/basil--moon-solid.svg";
import Settingssvg from "../../images/solar--settings-bold.svg";
import ClearWhitesvg from "../../images/material-symbols-light--delete.svg";
import ProfileWhitesvg from "../../images/iconamoon--profile-fill.svg";
import SettingsWhite from "../../images/solar--settings-bold (1)white.svg";
import logoutWhite from "../../images/material-symbols--logout-rounded.svg";
import logout from "../../images/material-symbols--logout-rounded (1)black.svg";
import { useTheme } from "../useTheme";


export default function Sidenav() {
  const location = useLocation();
  const path = location.pathname;
  const historee = useNavigate();

  const formattedPath = path.split("/").filter(Boolean)[0];
  const capitalizedPath =
    formattedPath.charAt(0).toUpperCase() + formattedPath.slice(1);
  const [Nav, navhidden] = useState(false);
  const [user, setUser] = useState("");

  const changenav = () => {
    navhidden(!Nav);
  };
  interface Chat {
    question: string;
    response: string;
    time: string;
    createdAt:string;
  }
  
  const [chat, setChat] = useState<Chat[]>([]);
  // console.log(tosinToken);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 const { isDarkMode, toggleTheme } = useTheme();


  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion
  const decodedToken = jwtDecode(token) as { [key: string]: string };

const firstLetter = decodedToken.name?.slice(0, 1) || '';


  const handleClick = () => {
  localStorage.removeItem('patient');
  historee("../profile")
}



  const fetchChat = async () => {
    try {
      const response = await fetch(
        "https://topins-chat-backend.onrender.com/user/allChat",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      const chatData = await response.json();
      // console.log(chatData)
      setChat(chatData);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
const groupChatsByDate = (chats: Chat[]) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 7);

  const last30Days = new Date(today);
  last30Days.setDate(today.getDate() - 30);

  const groups: { [group: string]: { [date: string]: Chat[] } } = {
    Today: {},
    Yesterday: {},
    "Last 7 Days": {},
    "Last 30 Days": {},
    Older: {},
  };

  chats.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt);
    const chatDateString = chatDate.toDateString();
    const todayString = today.toDateString();
    const yesterdayString = yesterday.toDateString();

    if (chatDateString === todayString) {
      if (!groups.Today[chatDateString]) groups.Today[chatDateString] = [];
      groups.Today[chatDateString].push(chat);
    } else if (chatDateString === yesterdayString) {
      if (!groups.Yesterday[chatDateString]) groups.Yesterday[chatDateString] = [];
      groups.Yesterday[chatDateString].push(chat);
    } else if (chatDate > last7Days) {
      if (!groups["Last 7 Days"][chatDateString]) groups["Last 7 Days"][chatDateString] = [];
      groups["Last 7 Days"][chatDateString].push(chat);
    } else if (chatDate > last30Days) {
      if (!groups["Last 30 Days"][chatDateString]) groups["Last 30 Days"][chatDateString] = [];
      groups["Last 30 Days"][chatDateString].push(chat);
    } else {
      if (!groups.Older[chatDateString]) groups.Older[chatDateString] = [];
      groups.Older[chatDateString].push(chat);
    }
  });

  return groups;
};






  const groupedChats = groupChatsByDate(chat);

  useEffect(
    () => {
      fetchChat(); // Fetch initial chat data when the component mounts
    },
    [token]
  );
return (
  <div className={`w-full md:flex justify-between ${isDarkMode ? "text-white bg-[#212121]" : ""}`}>
    {/* Navbar Opener (Hamburger Menu for Mobile) */}
    <div className="md:hidden flex justify-between items-center p-4">
      <button onClick={changenav} className="text-2xl">
        {/* Hamburger icon */}
  <svg
  className="w-8 h-8 transform scale-x-[-1]" // rotate by 90 degrees
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4 6h16M4 12h16m-7 6h7"
  />
</svg>

      </button>
      <h1 className="text-xl font-bold">TopinnsChatGenie</h1>

          <span
              onClick={() => historee("../profile")}
              className="rounded-full text-white py-1 text-xl bg-[#6C8571] m-[2px] mt-[auto] mb-[auto] mr-[5px] w-[40px] h-[40px] text-center cursor-pointer"
            >
              {firstLetter}
            </span>
    </div>

    {/* Desktop Sidebar */}
    <div
      style={{ fontFamily: "Roboto, sans-serif", fontWeight: "500" }}
      className={`mobiledesktop nav sm:max-w-[100%] md:w-[25%] ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`hidden h-screen md:block sticky top-0 ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Top (ChatGenie Header) */}
          <h1 className="text-2xl font-bold text-center mt-[50px] mb-[60px] ">
            TopinnsChatGenie
          </h1>

          {/* Middle (Scrollable Chat List) */}
        <div className="flex-1 flex flex-col overflow-y-auto">
  {isLoading ? (
    <ScaleLoader color="#263A5C" />
  ) : (
    <>
      {Object.keys(groupedChats).every(
        (key) => Object.keys(groupedChats[key]).length === 0
      ) ? (
        <p className="text-center mt-4">No chats available.</p>
      ) : (
        Object.keys(groupedChats).map(
          (group) =>
            Object.keys(groupedChats[group]).length > 0 && (
              <div key={group} className="mb-6 px-6">
                <h2 className="text-lg font-semibold">{group}</h2>
                {Object.keys(groupedChats[group]).map((date) => (
                  <div key={date} className="mb-4">
                    <h3 className="text-md font-medium">{date}</h3>
                    <ul className="list-none">
                      {groupedChats[group][date].map((chat) => (
                        <li
                          key={chat.question}
                          className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200 bg-[#F5F7FA]"
                        >
                          <p className="font-medium">{chat.question}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )
        )
      )}
    </>
  )}
</div>


          {/* Bottom (Profile, Settings, Log Out) */}
          <div className="mb-10 px-4">
            <div className="w-full h-[1px] mb-7 bg-gray-300"></div>
            <div className="flex flex-col items-start space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? ClearWhitesvg : Clearsvg}
                  alt="Clear Chat Icon"
                />
                <Link to="/profile" className="hover:underline">
                  Clear Chat
                </Link>
              </div>
              <div className="flex items-center space-x-3" onClick={toggleTheme}>
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? Darksvg : Lightsvg}
                  alt="Light Mode Icon"
                />
                <span className="hover:cursor-pointer hover:underline">
                 {isDarkMode? "Light Mode" : "Dark Mode" } 
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? Profilesvg : ProfileWhitesvg}
                  alt="Profile Icon"
                />
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? SettingsWhite : Settingssvg}
                  alt="Settings Icon"
                />
                <Link to="/settings" className="hover:underline">
                  Settings
                </Link>
              </div>
              <div onClick={handleClick} className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? logoutWhite : logout}
                  alt="Log Out Icon"
                />
                <span className="hover:underline">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed h-screen w-[50%] ${Nav ? "flex" : "hidden"} md:hidden`}
      >
        {/* Overlay: Clicking anywhere outside the navbar closes it */}
        <div
          onClick={changenav}
          className="flex-1 backdrop-blur-sm bg-[#212121] bg-opacity-50"
        />

        {/* Sidebar */}
        <div
          className={`py-2 min-w-[300px] flex flex-col justify-between text-[#263638] ${
            isDarkMode ? "bg-[#212121] text-white" : "bg-white text-black"
          }`}
        >
          {/* Close Button */}
          <div onClick={changenav} className="flex justify-end pr-4 pt-2">
            <MdClose size={30} className="cursor-pointer" />
          </div>

          {/* User Info */}
          <div className="flex px-4 py-4 items-center border-b border-gray-300">
            <span
              onClick={() => historee("../profile")}
              className="rounded-full text-white py-1 text-xl bg-[#6C8571] m-[2px] mt-[auto] mb-[auto] mr-[5px] w-[40px] h-[40px] text-center cursor-pointer"
            >
              {firstLetter}
            </span>
            <div className="text-[#585555] font-normal">
              <h1 className="font-semibold">Hi! {decodedToken.name}</h1>
              <p className="text-sm">{decodedToken.email}</p>
            </div>
          </div>

          {/* Chat List */}
<div className="p-4 flex-1 overflow-y-auto">
  {isLoading ? (
    <ScaleLoader color="#263A5C" />
  ) : (
    <>
      <h1 className="text-2xl font-bold mb-4">TopinnsChatGenie</h1>
      {Object.keys(groupedChats).every(
        (key) => Object.keys(groupedChats[key]).length === 0
      ) ? (
        <p className="text-center text-gray-500">Start chatting, today.</p>
      ) : (
        Object.keys(groupedChats).map((group) => (
          <div key={group} className="mb-6">
            <h2 className="text-lg font-semibold">{group}</h2>
            {Object.keys(groupedChats[group]).map((date) => (
              <div key={date} className="mb-4">
                <h3 className="text-md font-medium">{date}</h3>
                <ul className="list-none">
                  {groupedChats[group][date].map((chat) => (
                    <li
                      key={chat.question}
                      className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200"
                    >
                      <p className="font-medium">{chat.question}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))
      )}
    </>
  )}
</div>



          {/* Profile, Settings, Log Out */}
           <div
      className={`mb-20 px-4 ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}
    >
            <div className="w-full h-[1px] mb-7 bg-gray-300"></div>
            <div className="flex flex-col items-start space-y-6">
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? ClearWhitesvg : Clearsvg}
                  alt="Clear Chat Icon"
                />
                <Link to="/profile" className="hover:underline">
                  Clear Chat
                </Link>
              </div>
              <div className="flex items-center space-x-3" onClick={toggleTheme}>
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? Darksvg : Lightsvg}
                  alt="Light Mode Icon"
                />
                <span className="hover:cursor-pointer hover:underline">
                 {isDarkMode? "Light Mode" : "Dark Mode" } 
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? Profilesvg : ProfileWhitesvg}
                  alt="Profile Icon"
                />
                <Link to="/profile" className="hover:underline">
                  Profile
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? SettingsWhite : Settingssvg}
                  alt="Settings Icon"
                />
                <Link to="/settings" className="hover:underline">
                  Settings
                </Link>
              </div>
              <div onClick={handleClick} className="flex items-center space-x-3">
                <img
                  className="w-6 h-6"
                  src={isDarkMode ? logoutWhite : logout}
                  alt="Log Out Icon"
                />
                <span className=" hover:cursor-pointer hover:underline">
                  Log Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clickable Overlay */}
      <div
        onClick={changenav}
        className="flex flex-1 backdrop-blur-sm md:hidden w-full"
      />
    </div>

    {/* Main Chat Component */}
    <div className="md:w-[75%] w-[100%]">
      <Outlet />
    </div>
  </div>
);



}
