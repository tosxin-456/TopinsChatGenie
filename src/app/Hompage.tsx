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
import contact1 from "../images/Group 647.svg"
import contact2 from "../images/Group 648.svg";
import logo from "../images/senexCare.svg"


export default function Home() {
    return (<div>
        <div className="bg-[#F9F9F9]">
            <nav className=" flex justify-between items-center py-3 mx-[10%] sm:mx-[5%] ">
                <img src={Logodark} alt="" />
                <div className="sm:min-w-[25%] flex justify-around items-center">
                    <Link className=" border-[#FFC1DC] border rounded-[2rem] px-4 md:py-2 sm:mx-1" to="/signup">Register</Link>
                    <Link className=" border-[#FFC1DC] border rounded-[2rem] px-4 md:py-2 " to="signin">Login</Link>
                </div>
            </nav>
        </div>
        <div className="md:flex w-ful items-center sm:py-10  mx-[10%] sm:mx-[5%] pt-[2rem]">
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
                    <p className="md:w-[60%] text-[#263A5C] " >Welcome to SenexCare, where we revolutionize elderly healthcare. Our user-friendly app simplifies medication management, appointment scheduling, and family communication, empowering seniors to take control of their health. Join us in creating a brighter future for aging populations.</p>
                </div>
                <img className="md:pt-5 text-center mx-auto pt-3" src={predator} width="300" alt="" />
            </div>
        </div>
        <div className="mx-[10%] sm:mx-[5%] bg-[#F5F8FF] my-20 md:flex px-[2rem] py-[2rem] md:text-left text-center justify-center items-center md:rounded-r-none rounded-[8rem] shadow-xl">
            <img className="mx-auto" src={rafiki} alt="" />
            <div className="md:px-[10rem]" >
                <h1 className="text-[#002B9A] font-bold">Join Us</h1>
                <p className="mt-5 text-[#263A5C] " >join us in revolutionizing elderly care. Experience convenience and peace of mind with senexCare. Sign up today for a healthier tomorrow.</p>
            </div>
        </div>

        <div className="md:flex justify-between items-center bg-[#FFF5FF] rounded-[8rem] px-[4rem] rounded-r-[8rem] md:rounded-l-none md:py-none py-5 shadow-xl mx-[10%] sm:mx-[5%]">
            <div>
                <h1 className="text-[#002B9A] font-bold pb-5 ">Non-IT <br /> enterprises</h1>
                <p className="md:w-[60%] text-[#263A5C] " >senexCare: Simplifying elderly healthcare with easy medication tracking, appointment reminders, and family connectivity.</p>
            </div>
            <img className="md:pt-5 text-center mx-auto pt-3" src={predator} width="300" alt="" />

        </div>

        <div>
            <h1 className="text-center font-bold text-[#002B9A] mt-[3rem] text-3xl " >Services Maps</h1>
            <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
                <h1 className="text-[#002B9A] text-2xl font-bold pb-2">FAQs</h1>
                <ul className="md:w-[50%]">
                    <h2 className="text-xl pt-2" >Explore common queries and solutions about senexCare:</h2>
                    <li>-Trouble shooting tips for technical issues</li>
                    <li>-Guidance on app functionalities and navigation.</li>
                    <li>-Information on account setup and management.</li>
                    <li>- Clarifications on data security measures.</li>
                    <li>- Contact details for further assistance.</li>
                </ul>
            </div>
            <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
                <h1 className="text-[#002B9A] text-2xl font-bold pb-2">Features</h1>
                <ul className="md:w-[50%]">
                    <h2 className="text-xl pt-2" >Discover how senexCare simplifies elderly healthcare:</h2>
                    <li>- Medication management for tracking doses and schedules.</li>
                    <li>- Appointment reminders to ensure timely visits.</li>
                    <li>- Health monitoring tools for vital signs tracking.</li>
                    <li>- Family connectivity to keep loved ones informed. </li>
                    <li>- Intuitive interface for user-friendly experience.</li>
                </ul>
            </div>

            <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
                <h1 className="text-[#002B9A] text-2xl font-bold pb-2">Privacy Policy</h1>
                <ul className="md:w-[50%]">
                    <h2 className="text-xl pt-2" >Learn about senexCare's commitment to user privacy:</h2>
                    <li>- Explanation of data collection and usage practices.</li>
                    <li>- Measures taken to safeguard sensitive information.</li>
                    <li>- User control options for managing data sharing.</li>
                    <li>- Compliance with relevant privacy regulations.</li>
                    <li>- Contact information for privacy inquiries.</li>
                </ul>
            </div>
        </div>

        <div className="bg-[#EFF7FF] sm:mx-[5%] my-[2rem] flex justify-between items-center py-20">
            <img className="mt-[-25rem] hidden md:block " src={contact1} alt="" />
            <div className="md:w-[50%] mx-auto">
                <h1 className="text-center text-2xl font-bold  mt-[-3rem] pb-5" >Contact us</h1>
                <form className="text-center">
                    <input className="my-3 w-full py-3 px-10" placeholder="Full Name" type="text" /> <br />
                    <input className="my-3 w-full py-3 px-10" type="text" placeholder="Emaill Addres" /> <br />
                    <input className="my-3 w-full py-3 px-10" type="text" placeholder="Phone Number" /> <br />
                    <textarea className="my-3 w-full px-10 py-[5rem]" placeholder="Have anything to say?">

                    </textarea>
                    <button className="bg-[#002B9A] px-16 mt-[2rem] py-1 text-white rounded-md">Send</button>
                </form>
            </div>
            <img className=" hidden md:block mb-[-25rem]" src={contact2} alt="" />

        </div>

        <footer className="bg-[#263A5C] mx-[10%] sm:mx-[5%] h-[3rem] text-white flex justify-around items-center">
            <img src={logo} alt="" />
            <p className="w-[50%]">senexCare.2014@ All Rights Reserved</p>
        </footer>
    </div>

    )

}