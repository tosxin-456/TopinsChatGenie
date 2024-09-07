import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import history from "../../images/fluent--history-16-regular.svg";
import { jwtDecode } from "jwt-decode";
import { ScaleLoader } from "react-spinners";


import { Link, Outlet, useLocation } from "react-router-dom";

import Profilesvg from "../../images/iconamoon_profile-fill.dark.svg";
import Clearsvg from "../../images/material-symbols--delete-outline (1).svg";
import Lightsvg from "../../images/clarity--sun-solid.svg";
// import svg from "../../images/iconamoon_profile-fill.svg";

import Settingssvg from "../../images/solar--settings-bold.svg";
import Logosvg from "../../images/senexCare.svg";
import Picture from "../../images/Frame 2608382.svg";
import Dashboarddark from "../../images/ic_sharp-dashboard.dark.svg";
import Scheduledark from "../../images/uis_schedule..dark.svg";
import messagedark from "../../images/ic_baseline-chat.dark.svg";
import Activitydark from "../../images/jam_activity.dark.svg";
import Emergencydark from "../../images/material-symbols_emergency-home-outline (1).svg";
import profiledark from "../../images/iconamoon_profile-fill.dark.svg";
import settingsdark from "../../images/ic_round-settings.dark.svg";
import logout from "../../images/material-symbols--logout (1).svg";

export default function Sidenav() {
  const location = useLocation();
  const path = location.pathname;
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

  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion
  const decodedToken = jwtDecode(token) as { [key: string]: string };

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

  const groups: { [date: string]: Chat[] } = {
    Today: [],
    Yesterday: [],
    "Last 7 Days": [],
    "Last 30 Days": [],
    Older: [],
  };

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt);
    const chatDateString = chatDate.toDateString();
    const todayString = today.toDateString();
    const yesterdayString = yesterday.toDateString();

    if (chatDateString === todayString) {
      groups.Today.push(chat);
    } else if (chatDateString === yesterdayString) {
      groups.Yesterday.push(chat);
    } else if (chatDate > last7Days) {
      groups["Last 7 Days"].push(chat);
    } else if (chatDate > last30Days) {
      groups["Last 30 Days"].push(chat);
    } else {
      groups.Older.push(chat);
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
  <div className="w-full md:flex justify-between">
    {/* Desktop Sidebar */}
    <div
      style={{ fontFamily: "Roboto, sans-serif", fontWeight: "500" }}
      className="mobiledesktop nav sm:max-w-[100%] md:w-[25%]"
    >
      <div className="hidden bg-[white] text-[#4A90E2 h-screen md:block sticky top-0">
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
                  (key) => groupedChats[key].length === 0
                ) ? (
                  <p className="text-center mt-4">No chats available.</p>
                ) : (
                  Object.keys(groupedChats).map(
                    (group) =>
                      groupedChats[group].length > 0 && (
                        <div key={group} className="mb-6 px-6">
                          <h2 className="text-lg font-semibold">{group}</h2>
                          <ul className="list-none">
                            <li
                              key={groupedChats[group][0].question}
                              className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200 bg-[#F5F7FA]   "
                            >
                              <p className="font-medium">
                                {groupedChats[group][0].question}
                              </p>
                            </li>
                          </ul>
                        </div>
                      )
                  )
                )}
              </>
            )}
          </div>

          {/* Bottom (Profile, Settings, Log Out) */}
          <div className="mb-10 px-4 text-[#4A90E2">
  <div className="w-full h-[1px] mb-7 bg-gray-300"></div>
  <div className="flex flex-col items-start space-y-6">
    <div className="flex items-center space-x-3">
      <img className="w-6 h-6" src={Clearsvg} alt="Profile Icon" />
      <Link to="/profile" className=" hover:underline">Clear Conversations</Link>
    </div>
    <div className="flex items-center space-x-3">
      <img className="w-6 h-6" src={Lightsvg} alt="Profile Icon" />
      <Link to="/profile" className=" hover:underline">Light Mode</Link>
    </div>
    <div className="flex items-center space-x-3">
      <img className="w-6 h-6" src={Profilesvg} alt="Profile Icon" />
      <Link to="/profile" className=" hover:underline">Profile</Link>
    </div>
    <div className="flex items-center space-x-3">
      <img className="w-6 h-6" src={Settingssvg} alt="Settings Icon" />
      <Link to="/settings" className=" hover:underline">Settings</Link>
    </div>
    <div className="flex items-center space-x-3">
      <img className="w-6 h-6" src={logout} alt="Log Out Icon" />
      <Link to="/" className=" hover:underline">Log Out</Link>
    </div>
  </div>
</div>

        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        className={
          Nav
            ? "flex h-screen md:hidden w-full fixed ease-in-out duration-1000 text-[#263638]"
            : "fixed left-[-100%] ease-in-out duration-500"
        }
      >
        <div className="bg-white py-2 min-w-[300px]">
          {/* Close Button */}
          <div onClick={changenav} className="flex justify-end pr-4 pt-2">
            <MdClose size={30} className="cursor-pointer" />
          </div>

          {/* User Info */}
          <div className="flex px-4 py-4 items-center border-b border-gray-300">
            <img className="w-10 h-10 rounded-full mr-3" src={Picture} alt="" />
            <div className="text-[#585555] font-normal">
              <h1 className="font-semibold">Hi! {decodedToken.name}</h1>
              <p className="text-sm">{decodedToken.email}</p>
            </div>
          </div>

          {/* Chat List */}
          <div className="p-4">
            {isLoading ? (
              <ScaleLoader color="#263A5C" />
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4 ">TopinnsChatGenie</h1>
                {Object.keys(groupedChats).every(
                  (key) => groupedChats[key].length === 0
                ) ? (
                  <p className="text-center text-gray-500">
                    Start chatting, today.
                  </p>
                ) : (
                  Object.keys(groupedChats).map(
                    (group) =>
                      groupedChats[group].length > 0 && (
                        <div key={group} className="mb-6">
                          <h2 className="text-lg font-semibold">{group}</h2>
                          <ul className="list-none">
                            <li
                              key={groupedChats[group][0].question}
                              className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200"
                            >
                              <p className="font-medium">
                                {groupedChats[group][0].question}
                              </p>
                            </li>
                          </ul>
                        </div>
                      )
                  )
                )}
              </>
            )}
          </div>

          {/* Profile, Settings, Log Out */}
          <div className="flex flex-col items-start p-4 space-y-6">
            <div className="flex items-center">
              <img className="w-6 h-6 mr-3" src={profiledark} alt="Profile" />
              <Link to="/profile" className="text-base" onClick={changenav}>
                Profile
              </Link>
            </div>
            <div className="flex items-center">
              <img className="w-6 h-6 mr-3" src={settingsdark} alt="Settings" />
              <Link to="/settings" className="text-base" onClick={changenav}>
                Settings
              </Link>
            </div>
            <div className="flex items-center">
              <img className="w-6 h-6 mr-3" src={logout} alt="Log out" />
              <Link to="/" className="text-base" onClick={changenav}>
                Log out
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-screen" />
      </div>

      {/* Mobile Top Bar */}
      <div className="p-4 sm:px-12 flex items-center justify-between md:hidden">
        {!Nav ? <img src={history} alt="" className="m-[3px] w-[30px] h-[30px] cursor-pointer" onClick={changenav}  /> : ""}
        {/* <p className="text-[#263A5C] text-xl ">Chat</p> */}
        <Link to="/settings">
                      <img className="w-10 h-10 mr-3  " src={settingsdark} alt="Settings" />

        </Link>
      </div>
    </div>

    {/* Main Content Area */}
    <main className="container px-4 sm:px-12 mx-auto mb-10 md:w-[77%]">
      <Outlet />
    </main>
  </div>
);




}
