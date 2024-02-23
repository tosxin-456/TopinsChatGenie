import React from 'react'
import Sidenav from "./components/Sidenav";
import notify from "../images/ri_notification-4-line.svg";
import profile from '../images/profilepic2.svg'
import info from '../images/information.svg'
import { Link } from "react-router-dom";
import send from '../images/sendMessage.svg'
import ai from '../images/carbon_watsonx-ai.svg'

export default function Notification() {
  return (
    <div
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '400',
  }}
    >
      {/* <Sidenav /> */}
      <div className='  items-center w-full'>
      <div className=' flex text-center'>
          <h1
              style={{
                fontFamily: 'Roboto, sans-serif',
                fontWeight: '500',
            }}
            
            className=' w-full md:mt-[50px] mt-[40px] ml-[20px]  md:ml-[40px] text-[#263A5C] text-[20px]'>Chat</h1>
             <div className='flex p-[5px] md:mr-[20px] md:mt-[20px] mr-[30px] mt-[30px] ml-auto'>
            <Link to='/notification'>
            <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
            </Link>
          <Link to='/profile'>
          <img src={profile} alt="" className='m-[3px]  w-[30px] h-[30px]'/>          
          </Link>
          </div>
        </div>
      </div>
      <div className=' w-[95%] m-auto p-[10px] max-w-[55rem] rounded-lg border-[1px] border-[solid] border-[#E1E2FF] '>
        <div className='flex  border-b-[1px] border-b-[solid] border-b-[#E1E2FF] '>
          <div className='w-fit mt-[5px]'>
          <img src={ai} alt=""  />
          </div>
          <div>
            <p className='text-[20px] ml-[5px] font-bold'>Al</p>
            <p className='text-[18px]  font-bold'>#7286376</p>
          </div>
          <div className='ml-[auto] w-[3%] items-center  '>
          <img src={info} alt="" className='w-full mt-[50%] mb-[50%] ' />
          </div>
        </div>
        <div 
         style={{
          height: '67vh', 
          overflowX: 'auto' 
        }}
        >
          <div className='w-[85%] flex ' >
            <img src={ai} alt="" className='m-[10px]' />
            <div>
            <div className='  bg-white text-[#263A5C] mr-auto mt-[20px] border-[#333333] border-[1px] border-[solid] rounded-lg p-[12px] '>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolores impedit minima quasi incidunt, quas, unde quae cum magni nobis, labore voluptate exercitationem. Unde incidunt amet nemo necessitatibus aut cumque totam ullam esse labore ex, impedit, tempora autem. Modi odio, distinctio repellat delectus sequi in doloribus expedita minus ab obcaecati?.</p>
          </div>
          <p className='text-end w-fit mr-auto ml-[3px] text-[#333333] ' >8pm</p>
            </div>
          </div>
          <div className='w-[85%] flex ml-auto'>
            <div>
          <div className=' bg-[#263A5C] text-[white] ml-auto mt-[20px] rounded-lg p-[12px] '>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur dolores impedit minima quasi incidunt, quas, unde quae cum magni nobis, labore voluptate exercitationem. Unde incidunt amet nemo necessitatibus aut cumque totam ullam esse labore ex, impedit, tempora autem. Modi odio, distinctio repellat delectus sequi in doloribus expedita minus ab obcaecati?.</p>
          </div>
          <p className='text-end w-fit ml-auto mr-[3px] text-[#333333] ' >8pm</p>
            </div>
            <img src={profile} alt="" className='m-[auto] ml-[10px] mr-[10px] w-[30px] h-[30px]' />
          </div>
        </div>
        <div className='bg-white flex w-[80%] m-auto p-[4px] mb-[10px] mt-[10px] border-[solid] border-[1px] rounded-md border-[black] '>
          <input type="text" className='outline-none w-[100%]' />
          <img src={send} alt="" className='hover:cursor-pointer' />
        </div>
      </div>
    </div>
  )
}