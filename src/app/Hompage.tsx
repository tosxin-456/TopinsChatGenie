import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Logodark from "../images/senexCare .dark.svg";
import coder from "../images/Group 646 (1).svg";
import predator from "../images/bro.svg";
import rafiki from "../images/rafiki.svg";
import homepage from "../images/Home Page.svg"
import btnarrow from "../images/Arrow 1.svg"
import Sidenav from "./components/Sidenav";
import { Link } from "react-router-dom";



export default function Home() {
    return (<div>
        <div className="bg-[#F9F9F9]">
            <nav className=" flex justify-between items-center py-3 mx-[10%] sm:mx-[5%]">
                <img src={Logodark} alt="" />
                <div className="sm:min-w-[25%] flex justify-around items-center">
                    <Link className=" border-[#FFC1DC] border rounded-[2rem] px-4 md:py-2 sm:mx-1" to="/signup">Register</Link>
                    <Link className=" border-[#FFC1DC] border rounded-[2rem] px-4 md:py-2 " to="signin">Login</Link>
                </div>
            </nav>
        </div>
        <div className="md:flex w-ful items-center sm:py-10  mx-[10%] sm:mx-[5%] sm:mt-9">
            <div className="md:w-[50%] items-center">
                <img src={homepage} alt="" />
                <p className="my-7 text-[#263A5C] ">Welcome to senexCare: Empowering Elderly Health Simplified. Discover our user-friendly app for medication management, appointment reminders, and family connectivity. Join us in revolutionizing elderly care. Sign up now for a healthier tomorrow.</p>
                <button className="flex bg-gradient-to-r from-blue-600 to-blue-900 justify-around items-center text-white rounded-xl py-1 px-3" > <p>Learn more</p> <img src={btnarrow} alt="" /> </button>
            </div>
            <img src={coder} />
        </div>
        <div className="md:flex shadow-xl  bg-[#EDF7FF] mx-[10%] sm:mx-[5%] justify-between items-center my-[6rem] rounded-[8rem]">
            <h1 className="text-center  items-center  md:bg-white text-[2rem] font-bold text-[#263A5C] pt-[3rem]  md:ml-5 md:w-[50%] md:h-[10rem] rounded-l-[8rem]">About us</h1>
             <p className="py-[4rem] px-10 md:px-[10rem] md:text-start sm:text-center text-[#263A5C]" >senexCare: Empowering elderly health through user-friendly app. Manage medications, appointments, health data effortlessly. Supportive, intuitive, and accessible.</p>
        </div>
        <div className="mx-[10%] sm:mx-[5%] text-center md:text-left">
            <h1 className="text-center  text-[2rem] font-bold text-[#263A5C] mb-[1rem]" >Our services</h1>
            <div className="md:flex justify-between items-center bg-[#FFF5FF] rounded-[8rem] px-[4rem] rounded-r-[8rem] md:rounded-l-none md:py-none py-5 shadow-xl">
                <div>
                    <h1 className="text-[#002B9A] font-bold pb-5 ">Transforming Elderly <br /> Care: SenexCare</h1>
                    <p className="md:w-[60%]" >Welcome to SenexCare, where we revolutionize elderly healthcare. Our user-friendly app simplifies medication management, appointment scheduling, and family communication, empowering seniors to take control of their health. Join us in creating a brighter future for aging populations.</p>
                </div>
                <img className="md:pt-5 text-center mx-auto pt-3" src={predator} width="300" alt="" />
            </div>
        </div>
        <div className="mx-[10%] sm:mx-[5%] bg-[#F5F8FF] my-20 flex px-[2rem] py-[2rem] justify-center items-center rounded-l-[8rem] shadow-xl">
            <img src={rafiki} alt="" />
            <div className="px-[10rem]" >
                <h1 className="text-[#002B9A] font-bold">Join Us</h1>
                <p className="mt-5 text-[#263A5C] " >join us in revolutionizing elderly care. Experience convenience and peace of mind with senexCare. Sign up today for a healthier tomorrow.</p>
            </div>
        </div>
    </div>
    )
    {/* <Navbar/>
            <Header/>  */}
    {/* <Sidenav/> */ }

}