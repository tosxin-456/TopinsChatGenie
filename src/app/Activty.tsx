import React from 'react';
import BarChart from './components/Barchart';
import LineGraph from './components/Linegraph';
import Piechart from './components/Pie';
import { Link } from 'react-router-dom'
import notify from "../images/ri_notification-4-line.png";
import profile from '../images/ProfilePic.png'
import info from '../images/information.svg'
import searchIcon from '../images/ic_round-search.svg'

const MainComponent = () => {
  return (
    <div>
   <div className='  items-center w-full'>
      <div className=' flex text-center'>
          <h1 className=' w-full md:mt-[50px] mt-[30px] md:ml-[40px] text-[#263A5C] text-[20px]'>Activity</h1>
          <div className='flex p-[5px] md:mr-[20px] md:mt-[20px]  ml-auto'>
          <img src={notify} alt="" className='m-[3px] w-[30px] h-[30px] ' />
          <Link to='/profile'>
          <img src={profile} alt="" className='m-[3px]'/>          
          </Link>
          </div>
        </div>
      </div>
      <div className='flex w-fit m-auto mt-[30px] bg-[#F2F2F2] rounded-lg p-1' >
            <img src={searchIcon} alt=""className='w-[20px] md:w-[40px]'  />
            <input className='bg-[#F2F2F2] w-[20rem] rounded-md p-1 md:p-3 outline-none' type="text" placeholder='search' />
          </div>
      <LineGraph/>
      <BarChart />
      <Piechart/>
    </div>
  );
};

export default MainComponent;
