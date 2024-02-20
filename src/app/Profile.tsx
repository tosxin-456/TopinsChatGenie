import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar1 from '../images/profile.png';
import logoutbtn from '../images/logout-bold.png';
import { TbCameraPlus } from 'react-icons/tb';
import { GrClose } from "react-icons/gr";
import Sidenav from './components/Sidenav';
import { Link } from "react-router-dom";

const ProfilePage = () => {
//   const history = useNavigate();
  const [isClosed, setIsClosed] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [pic, setPic] = useState(null);
  
//   const patientData = localStorage.getItem('patient')
//   const patient = JSON.parse(patientData);
  
  // const handleFileChange = (event) => setAvatar(event.target.files[0]); 

  // useEffect( () => {
  //   setIsLoading(true);
  //   fetch(`https://hospital-management-backend.onrender.com/patient/${patient._id}/get-image`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPic(data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setIsLoading(false)
  //     });
  // }, []);

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

  return ( 
    <div className='bg-[white] h-[100vh]'>
         <div className='text-white bg-[#263A5C] text-center p-[60px]'>
          <h2 className='text-[30px] pt-[15px]'>Profile</h2>
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
          <img className='w-[7rem] m-auto ' src={pic === null ? avatar1 : pic }   alt='Profile pic' />
          <div className=' w-[5rem] hidden m-auto'>
            <input
              type="file" 
              accept="image/png,/image/jpeg,/image/jpg" 
            />
            <label htmlFor="upload">{ <TbCameraPlus className="cam" />}</label> 
          </div>
        </div>
        <div className='bg-white text-white  p-[20px]'>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className=' text-[#285430]'>Profile Name: </span>poppins</p>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className='text-[#285430]' >ID:</span> poppins</p>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className='text-[#285430]' >Email:</span> Poppins </p>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className='text-[#285430]' >Gender:</span> Poppins </p>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className='text-[#285430]' >Date of Birth:</span>poppins </p>
          <p className='w-3/4 bg-[#E2E2E2] rounded-md p-[7px] text-[#818181] m-auto mt-[10px]'><span className='text-[#285430]' >NHIS:</span> poppins </p>
          <Link to='/signin'>
          {!isPending && <button className='bg-[#263238] text-white my-5 py-2 rounded-md flex text-center justify-center items-center p-[10px] ml-auto mr-12'   > <img src={logoutbtn} className='bg-[#263238]m-auto' alt="" />Logout</button>}
          {isPending && <button disabled>Logging Out...</button>}
          </Link>
        </div>
      </div>
    </div> 
  );
}
 
export default ProfilePage;