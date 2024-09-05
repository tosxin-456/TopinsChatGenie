import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import notify from "../../images/ri_notification-4-line.svg";
import { jwtDecode } from "jwt-decode";
import { ScaleLoader } from "react-spinners";


import { Link, Outlet, useLocation } from "react-router-dom";

import Profilesvg from "../../images/iconamoon_profile-fill.svg";
import Settingssvg from "../../images/settings_24px.svg";
import Logosvg from "../../images/senexCare.svg";
import Picture from "../../images/Frame 2608382.svg";
import Dashboarddark from "../../images/ic_sharp-dashboard.dark.svg";
import Scheduledark from "../../images/uis_schedule..dark.svg";
import messagedark from "../../images/ic_baseline-chat.dark.svg";
import Activitydark from "../../images/jam_activity.dark.svg";
import Emergencydark from "../../images/material-symbols_emergency-home-outline (1).svg";
import profiledark from "../../images/iconamoon_profile-fill.dark.svg";
import settingsdark from "../../images/ic_round-settings.dark.svg";
import logout from "../../images/solar_logout-bold (1).svg";

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
    Yesterday: [],
    "Last 7 Days": [],
    "Last 30 Days": [],
    Older: [],
  };

  chats.forEach((chat) => {
    const chatDate = new Date(chat.createdAt);

    if (
      chatDate.toDateString() === yesterday.toDateString()
    ) {
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
    <div className="w-full md:flex">
      <div
        style={{ fontFamily: "Roboto, sans-serif", fontWeight: "500" }}
        className="mobiledesktop nav sm:max-w-[100%] md:w-[23%]"
      >
        <div className="hidden bg-[#263A5c]  text-white h-screen md:block sticky top-0">
          <div className="pl-20">
            
          <div className="w-full md:w-[77%] md:flex">
  <div className="flex-1 md:p-6">
    {isLoading ? (
     <ScaleLoader  color="#263A5C" />

    ) : (
      <>
        <h1 className="text-2xl font-bold mb-4">Chat List</h1>
        {Object.keys(groupedChats).every((key) => groupedChats[key].length === 0) ? (
          <p>No chats available.</p>
        ) : (
          Object.keys(groupedChats).map((group) => (
            groupedChats[group].length > 0 && (
              <div key={group} className="mb-6">
                <h2 className="text-lg font-semibold">{group}</h2>
                <ul className="list-none">
                  {groupedChats[group].map((chatItem) => (
                    <li
                      key={chatItem.question}
                      className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{chatItem.question}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(chatItem.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))
        )}
      </>
    )}
  </div>
</div>
            <div className="flex pt-10 text-center">
              <img className="px-3" src={Profilesvg} alt="" />
              <Link to="/profile">Profile</Link>
            </div>
            <div className="flex pt-10 text-center">
              <img className="px-3" src={Settingssvg} alt="" />
              <Link to="/settings">Settings</Link>
            </div>
          </div>
        </div>

        <div
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          className={
            Nav
              ? "   flex h-screen md:hidden w-full fixed ease-in-out duration-1000 text-[#263638]"
              : "fixed left-[-100%] ease-in-out duration-500"
          }
        >
          <div className="bg-white py-2 min-w-[300px] ">
            <div onClick={changenav}>
              <MdClose size={30} className="ml-[80%]" />
            </div>
            <div className="flex px-3 border-b-gray border-b-2  pb-3">
              <img className="px-3" src={Picture} alt="" />
              <div className="text-[#585555] font-normal">
                <h1>
                  Hi! {decodedToken.name}
                </h1>
                <p>
                  {decodedToken.email}
                </p>
              </div>
            </div>
<div className="w-full md:w-[77%] md:flex">
  <div className="flex-1 md:p-6">
    {isLoading ? (
      <p>Loading chats...</p>
    ) : (
      <>
        <h1 className="text-2xl font-bold mb-4">Chat List</h1>
        {Object.keys(groupedChats).every((key) => groupedChats[key].length === 0) ? (
          <p>No chats available.</p>
        ) : (
          Object.keys(groupedChats).map((group) => (
            groupedChats[group].length > 0 && (
              <div key={group} className="mb-6">
                <h2 className="text-lg font-semibold">{group}</h2>
                <ul className="list-none">
                  {groupedChats[group].map((chatItem) => (
                    <li
                      key={chatItem.question}
                      className="p-4 border border-gray-300 rounded-lg my-2 cursor-pointer hover:bg-gray-200"
                    >
                      <div className="flex justify-between">
                        <p className="font-medium">{chatItem.question}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(chatItem.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))
        )}
      </>
    )}
  </div>
</div>

            <div className={Nav ? "pl-11 ease-in-out duration-1000 " : ""}>
              <div className="w-[300px] mt-[50px] bg-gray-300 h-[0.1rem] ml-[-45px] " />
              <div className="flex mr-[30px] pt-10 text-center">
  
                <img className="px-3" src={profiledark} alt="" />
                <Link to="/profile" className="text-center" onClick={changenav}>
                  Profile
                </Link>
              </div>
              <div className="flex mr-[30px] pt-10 text-center">
                <img className="px-3" src={settingsdark} alt="" />
                <Link to="/settings" onClick={changenav}>
                  Settings
                </Link>
              </div>
              <div className=" w-fit ml-[30px] mt-[30px] ">
                <Link
                  to="/"
                  className="bg-[#263238] text-white my-5 p-[3px] m-auto  rounded-md flex text-center justify-center items-center mr-5 w-[4rem]"
                >
                  <img src={logout} alt="" />
                  <p />
                </Link>
              </div>
            </div>
          </div>
          <div className=" bg-gray-100 w-full bg-opacity-90 text-black h-screen" />
        </div>

        <div className="p-4 sm:px-12 flex items-center justify-between md:hidden">
          {!Nav ? <RxHamburgerMenu size={30} onClick={changenav} /> : ""}
          <p className="text-[#263A5C] text-base">
            {capitalizedPath}
          </p>
          <Link to="/notification">
            <img src={notify} alt="" className="m-[3px] w-[30px] h-[30px] " />
          </Link>
        </div>
      </div>
      <main className="container px-4 sm:px-12 mx-auto mb-10 md:w-[77%]">
        <Outlet />
      </main>
    </div>
  );
}
