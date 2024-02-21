import React from 'react'
import { MdClose } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";


import { Link } from "react-router-dom";
import Dashboardsvg from "../../images/ic_sharp-dashboard.svg"
import Schedulesvg from "../../images/uis_schedule.svg"
import messagesvg from "../../images/ic_baseline-chat.svg"
import Activitysvg from "../../images/jam_activity.svg"
import Emergencysvg from "../../images/material-symbols_emergency-home-outline.svg"
import Profilesvg from "../../images/iconamoon_profile-fill.svg"
import Settingssvg from "../../images/settings_24px.svg"
import Logosvg from "../../images/senexCare.svg"
import Picture from "../../images/Frame 2608382.svg"

import Dashboarddark from "../../images/ic_sharp-dashboard.dark.svg"
import Scheduledark from "../../images/uis_schedule..dark.svg"
import messagedark from "../../images/ic_baseline-chat.dark.svg"
import Activitydark from "../../images/jam_activity.dark.svg"
import Emergencydark from "../../images/material-symbols_emergency-home-outline (1).svg"
import profiledark from "../../images/iconamoon_profile-fill.dark.svg"
import settingsdark from "../../images/ic_round-settings.dark.svg"
import logout from "../../images/solar_logout-bold (1).svg"







export default function Sidenav() {

  const [Nav, navhidden] = useState(false)

  const changenav = () => {
    navhidden(!Nav)
  }


  return (
    <div className='mobiledesktop nav sm:max-w-[100%]'>
      <div className='hidden bg-[#263A5c]  text-white max-w-[300px] h-screen md:block'>
        <div className='pl-20'>
          <img className='pt-10 w-[60%]' src={Logosvg} alt="" />
          <div className='flex pt-[4rem] text-center'>
            <img className='px-3 ' src={Dashboardsvg} alt="" />
            <Link to="/dashboard">Dashboard</Link>
          </div>
          <div className='flex pt-10 text-center j'>
            <img className='px-3' src={Schedulesvg} alt="" />
            <Link to="/schedule">Schedule</Link>
          </div>
          <div className='flex pt-10 text-center '>
            <img className='px-3' src={messagesvg} alt="" />
            <Link to="/chat">Chat</Link>
          </div>
          <div className='flex pt-10 text-center '>
            <img className='px-3' src={Activitysvg} alt="" />
            <Link to="/activity">Activty</Link>
          </div>
          <div className='flex pt-10 text-center '>
            <img className='px-3' src={Emergencysvg} alt="" />
            <Link to="/emergency">Emergency</Link>
          </div>
          <div className='flex pt-10 text-center'>
            <img className='px-3' src={Profilesvg} alt="" />
            <Link to="/profile">Profile</Link>
          </div>
          <div className='flex pt-10 text-center'>
            <img className='px-3' src={Settingssvg} alt="" />
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </div>

      <div className={Nav ? '  bg-gray-100 flex h-screen md:hidden w-full fixed ease-in-out duration-1000 text-[#263638]' : "fixed left-[-100%] ease-in-out duration-500"} >
        <div className='bg-white py-2 min-w-[300px] rounded-r-[2rem]'>
          <div onClick={changenav}>
            <MdClose size={30} className='ml-[80%]' />
          </div>
          <div className='flex px-3 border-b-gray border-b-2  pb-3'>
            <img className='px-3' src={Picture} alt="" />
            <div>
              <h1>Hi! Deborah Allen</h1>
              <p>deborahallen12@gmail.com</p>
            </div>

          </div>
          <div className={Nav ? 'pl-20 ease-in-out duration-1000 ' : ''}>
            <div className='flex pt-[2rem] text-center'>
              <img className='px-3 ' src={Dashboarddark} alt="" />
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className='flex pt-10 text-center j'>
              <img className='px-3' src={Scheduledark} alt="" />
              <Link to="/schedule">Schedule</Link>
            </div>
            <div className='flex pt-10 text-center '>
              <img className='px-3' src={messagedark} alt="" />
              <Link to="/chat">Chat</Link>
            </div>
            <div className='flex pt-10 text-center '>
              <img className='px-3' src={Activitydark} alt="" />
              <Link to="/activity">Activty</Link>
            </div>
            <div className='flex pt-10 text-center '>
              <img className='px-3' src={Emergencydark} alt="" />
              <Link to="/emergency">Emergency</Link>
            </div>
            <div className='flex pt-10 text-center'>
              <img className='px-3' src={profiledark} alt="" />
              <Link to="/profile">Profile</Link>
            </div>
            <div className='flex pt-10 text-center'>
              <img className='px-3' src={settingsdark} alt="" />
              <Link to="/settings">Settings</Link>
            </div>
            <Link to="/signin" className='bg-[#263238] text-white my-5 py-2 rounded-md flex text-center justify-center items-center mr-5 w-[70%]'>
              <img src={logout} alt="" />
              <p>logout</p>
            </Link>
          </div>
        </div>
        <div className=' bg-gray-100 w-full bg-opacity-90 text-black h-screen'>
        </div>
      </div>

      <div className='p-4 fixed' onClick={changenav}>
        {!Nav ? <RxHamburgerMenu size={30} /> : ""}
      </div>
    </div>

  )
}
