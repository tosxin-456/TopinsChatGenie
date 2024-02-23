import React from 'react'
import Sidenav from "./components/Sidenav";
import { GrSearch } from 'react-icons/gr';
import scheduleIcon from '../images/schedule.svg'
import activityIcon from '../images/activity.svg'
import emergencyIcon from '../images/emergencyHome.svg'
import chatIcon from '../images/chat.svg'
import { useNavigate } from 'react-router';
import LineGraph from './components/Linegraph';

export default function Settings() {
  const history = useNavigate();

  return (
    <div>
      <Sidenav/>
      <main className="container px-4 mx-auto">
        <section>
          <div className="profileWrap flex items-center space-x-4 my-4">
            <span className="rounded-full text-white px-4 py-2 text-lg bg-[#6C8571]">T</span>
            <p className='text-[#263A5C]'>Hi! Deborah Allen</p>
          </div>
          <div className="searchWrapper flex  space-x-3">
            <GrSearch size={25}/>
            <input 
              className='bg-[#F2F2F2] px-4 rounded-lg w-full text-sm' 
              placeholder='Search' 
              type="text" 
            />
          </div>
        </section>
        <section className='text-[#263A5C] grid grid-cols-2 items-center my-6 gap-6'>
          <div 
            className="icon-container mx-auto shadow-md rounded-md p-6 cursor-pointer"
            onClick={()=> history('/schedule')}
          >
            <img src={scheduleIcon} alt="Schedule" />
            <p className='text-center'>Schedule</p>
          </div>
          <div 
            className="icon-container mx-auto shadow-md rounded-md p-6 cursor-pointer"
            onClick={()=> history('/chat')}
          >
            <img src={chatIcon} alt="Chat" />
            <p className='text-center'>Chat</p>
          </div>
          <div 
            className="icon-container mx-auto shadow-md rounded-md p-6 cursor-pointer"
            onClick={()=> history('/activity')}
          >
            <img src={activityIcon} alt="Activity" />
            <p className='text-center'>Activity</p>
          </div>
          <div 
            className="icon-container mx-auto shadow-md rounded-md p-6 cursor-pointer"
            onClick={()=> history('/emergency')}
          >
            <img src={emergencyIcon} alt="Emergency shadow-md" />
            <p className='text-center'>Emergency</p>
          </div>
        </section>
        <section className='my-8'>
          <h2 className='text-[#263A5C]'>Activity</h2>
          <LineGraph />
        </section>
      </main>
    </div>
  )
}