import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import avatar1 from '../images/profile.png';
import logoutbtn from '../images/solar_logout-bold (1).svg';
import { TbCameraPlus } from 'react-icons/tb';
import { GrClose } from "react-icons/gr";
import back from '../images/back.png';
import { useTheme } from './useTheme';
import {jwtDecode} from "jwt-decode";

// Define User type
interface User {
  name: string;
  number: string;
  email: string;
  gender: string;
  avatar: string;
  age: string;
}

const ProfilePage = () => {
  const [isPending, setIsPending] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [pic, setPic] = useState<string | null>(null);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Handle logout
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };

  // Fetch token and decode it
  const tosinToken = localStorage.getItem('token');
  const token = tosinToken ? JSON.parse(tosinToken) : null;
  const decodedToken = token ? jwtDecode(token) as { [key: string]: string } : { name: '' };
  const firstLetter = decodedToken.name?.slice(0, 1) || '';
  // Fetch profile data

return (
  <div
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '500',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
    className={`h-[100vh] ${isDarkMode ? 'bg-[#121212]' : 'bg-white'}`}
  >
    <div
      className={`text-center p-[60px] ${isDarkMode ? 'bg-[#263A5C] text-white' : 'bg-[#263A5C] text-black'}`}
    >
      <Link to='/dashboard'>
        <div className='inline-block max-content float-left'>
          <img src={back} alt="Back" />
        </div>
      </Link>
      <h2 className='text-[30px] p-[10px] mr-[25px] text-white'>Profile</h2>
    </div>
    <div className='flex-grow'>
      <div className='w-fit m-auto mt-[10px] mb-[10px]'>
        <span
          className={`text-white mt-[-40px] text-3xl bg-[#6C8571] rounded-lg flex items-center justify-center h-[85px] w-[85px] p-[1rem] m-auto md:p-[1.5rem]`}
          style={{ lineHeight: '1' }}
        >
          {firstLetter}
        </span>
      </div>

      <div className={`p-[20px] ${isDarkMode ? 'bg-[#121212] text-white' : 'bg-white text-black'}`}>
        <p className={`w-4/5 rounded-md p-[10px] m-auto mt-[10px] ${isDarkMode ? 'bg-[#1e1e1e] text-[#b0b0b0]' : 'bg-[#E2E2E2] text-[#818181]'}`}>
          <span className={`text-[#263A5C] ${isDarkMode ? 'text-[#a1c4fd]' : 'text-[#263A5C]'}`}>Full Name:</span> {decodedToken?.name}
        </p>
        <p className={`w-4/5 rounded-md p-[10px] m-auto mt-[10px] ${isDarkMode ? 'bg-[#1e1e1e] text-[#b0b0b0]' : 'bg-[#E2E2E2] text-[#818181]'}`}>
          <span className={`text-[#263A5C] ${isDarkMode ? 'text-[#a1c4fd]' : 'text-[#263A5C]'}`}>Email:</span> {decodedToken?.email}
        </p>
        <p className={`w-4/5 rounded-md p-[10px] m-auto mt-[10px] ${isDarkMode ? 'bg-[#1e1e1e] text-[#b0b0b0]' : 'bg-[#E2E2E2] text-[#818181]'}`}>
          <span className={`text-[#263A5C] ${isDarkMode ? 'text-[#a1c4fd]' : 'text-[#263A5C]'}`}>Gender:</span> {decodedToken?.gender === 'M' ? 'Male' : 'Female'}
        </p>
        <p className={`w-4/5 rounded-md p-[10px] m-auto mt-[10px] ${isDarkMode ? 'bg-[#1e1e1e] text-[#b0b0b0]' : 'bg-[#E2E2E2] text-[#818181]'}`}>
          <span className={`text-[#263A5C] ${isDarkMode ? 'text-[#a1c4fd]' : 'text-[#263A5C]'}`}>Age:</span> {decodedToken?.age}
        </p>
      </div>
    </div>
    <div className="w-4/5 m-auto mb-5">
      <div onClick={handleClick}>
        {!isPending ? (
          <button className={`my-5 py-2 rounded-md flex text-center justify-center items-center ${isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-[#263238] text-white'} w-[7rem] ml-auto`}>
            <img src={logoutbtn} className="m-auto" alt="Logout" />
          </button>
        ) : (
          <button disabled className="my-5 py-2 rounded-md text-center flex justify-center items-center">
            Logging Out...
          </button>
        )}
      </div>
    </div>
  </div>
);

};

export default ProfilePage;
