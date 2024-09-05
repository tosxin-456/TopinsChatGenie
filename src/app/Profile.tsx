import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../images/profile.png';
import logoutbtn from '../images/solar_logout-bold (1).svg';
import { TbCameraPlus } from 'react-icons/tb';
import { GrClose } from "react-icons/gr";
import back from '../images/back.png';
import { Link } from "react-router-dom";


const ProfilePage = () => {
//   const history = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [pic, setPic] = useState(null);
  const [user, setUser] = useState<User>();
  
//   const patientData = localStorage.getItem('patient')
//   const patient = JSON.parse(patientData);
  
  // const handleFileChange = (event) => setAvatar(event.target.files[0]); 
  const tosinToken = localStorage.getItem('token');
  const token = JSON.parse(tosinToken as string);

  useEffect( () => {
    fetch('https://senexcare.onrender.com/user/profile',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setPic(data.avatar)
      // console.log(user);
      setUser(prevUser => ({ ...prevUser, ...data}));
    })
    .catch(error => {
      console.error('Tosin Error', error);
    });
  }, [user]);
  
  interface User {
    name: string;
    number: string;
    email: string;
    gender: string;
    avatar: string;
    age:string;
  }

//   const handleExit = () => setIsClosed(true);  

//   const handleUpload = async() => {
//       setIsUploading(true);
//       try {
//         const formData = new FormData();
//         formData.append('image', avatar )
//         const response = await fetch(`https://hospital-management-backend.onrender.com/patient/${patient._id}/upload-picture`, {
//           method: 'POST',
//           body: formData, 
//         })
//         const data = await response.json();
//         if(response.ok){
//           setIsUploading(false);
//           setIsClosed(true);
//           setPic(URL.createObjectURL(avatar));
//         }else{
//           console.log('Image upload failed',data);
//           setIsUploading(false);
//         }
//       } catch(err){
//         console.log('Error uploading image:', err);
//         setIsUploading(false);
//       }
//   }
  
// const handleClick = () => {
//   localStorage.removeItem('patient');
// }

  const fetchProfile = async () => {
    try {
      const response = await fetch("https://topins-chat-backend.onrender.com/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const profileData = await response.json();
      // console.log(profileData)
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };
 fetchProfile()

  return ( 
    <div
    style={{
      fontFamily: 'Roboto, sans-serif',
      fontWeight: '500',
  }}
      className='bg-[white] h-[100vh]'>
      <div className='text-white bg-[#263A5C] text-center p-[60px]'>
        <Link to='/dashboard'>
          <div className='inline-block max-content float-left'>
        <img src={back} alt="" />
          </div>
        </Link>
          <h2 className='text-[30px] p-[10px] mr-[25px]'>Profile</h2>
        </div>
      <div className=' mt-[-50px]'>
        {avatar && !isClosed && (
          <div className='av__upload'>
            <div className="sideNav">
            <div className="closeIcon"><GrClose  className='closeIcon__icon ' /></div>
                <div className='w-[10rem] bg-blue-50'>
                  <img src={URL.createObjectURL(avatar)}  alt="Selected" />
                  {!isUploading && <button >Update</button>}
                  {isUploading && <button>Updating Display pic...</button>}
                </div>
            </div>
          </div>
        )}
        <div>
          <img className='w-[6rem] m-auto md:w-[7rem] ' src={pic === null ? avatar1 : pic }   alt='Profile pic' />
          {/* <img className='w-[6rem] m-auto md:w-[7rem] ' src={user?.avatar} alt="" /> */}
          <div className=' w-[5rem] hidden m-auto'>
            <input
              type="file" 
              accept="image/png,/image/jpeg,/image/jpg" 
            />
            <label htmlFor="upload">{ <TbCameraPlus className="cam" />}</label> 
          </div>
        </div>
        <div className='bg-white text-white  p-[20px]'> 
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className=' text-[#263A5C]'>Profile Name: </span>{user?.name}</p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Number:</span> {user?.number}</p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Email:</span> {user?.email} </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Gender:</span> {user?.gender==='M'? 'Male':'Female'} </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Weight:</span> Not added </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Height:</span> Not added </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Medical Conditions:</span> Not added </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Allergies:</span> Not added </p>
          <p className='w-4/5 bg-[#E2E2E2] rounded-md p-[10px] text-[#818181] m-auto mt-[10px]'><span className='text-[#263A5C]' >Age:</span> {user?.age} </p>
          <Link to='/'>
            <div className='w-4/5 m-auto'>
            {!isPending && <button className='bg-[#263238] text-white my-5 py-2 rounded-md flex text-center justify-center items-center p-[20px] md:ml-[75%] w-[7rem] ml-auto '   > <img src={logoutbtn} className='bg-[#263238] m-auto ' alt="" /></button>}
            {isPending && <button disabled>Logging Out...</button>}
            </div>
          </Link>
        </div>
      </div>
    </div> 
  );
}
 
export default ProfilePage;