import React from 'react';
import BarChart from './components/Barchart';
import LineGraph from './components/Linegraph';
import Piechart from './components/Pie';
import { Link } from 'react-router-dom'
import notify from "../images/ri_notification-4-line.png";
import profile from '../images/ProfilePic.png'
import info from '../images/information.svg'

const MainComponent = () => {
  return (
    <div>
       <div className='  items-center w-full'>
      <div className=' flex '>
          <h1 className=' sm:m-auto md:w-full md:mt-[50px]  md:ml-[40px] text-[#263A5C] text-[20px]'>Chat</h1>
          <div className='flex p-[5px] mr-[20px] mt-[20px]'>
          <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
          <Link to='/profile'>
          <img src={profile} alt="" className='m-[3px]'/>          
          </Link>
          </div>
        </div>
      </div>
      <LineGraph/>
      <BarChart />
      <Piechart/>
    </div>
  );
};

export default MainComponent;
