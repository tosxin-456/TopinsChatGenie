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
    return <div style={{ fontFamily: "Roboto, sans-serif", fontWeight: "300" }}>
        <div className="bg-[#F9F9F9]">
          <nav className=" flex justify-between gap-4 items-center py-3 mx-[10%] sm:mx-[5%] ">
            {/* <img src={Logodark} alt="" /> */}
            <h1 className="text:[#263A5C]" style={{ fontFamily: "Clash Display, sans-serif", fontSize: "20px", fontWeight: 500 }}>
              TopinsChatGenie
            </h1>
            <div className="sm:min-w-[25%] flex gap-6 items-center">
              <Link className=" border-[#263A5C] border rounded-[5px] hover:bg-gradient-to-r from-blue-600 to-blue-900 hover:text-white  px-4 md:py-[3px] md:ml-auto sm:mx-1" to="/signup">
                Register
              </Link>
              <Link className=" border-[#263A5C] hover:bg-gradient-to-r from-blue-600 to-blue-900 hover:text-white border rounded-[5px] px-7 md:py-1 " to="signin">
                Login
              </Link>
            </div>
          </nav>
        </div>
        <div className="md:flex w-ful items-center sm:py-10  mx-[10%] sm:mx-[5%] pt-[2rem]">
          <div className="md:w-[50%] items-center">
            <img src={homepage} alt="" />
            <p className="my-7 text-[#263A5C] ">
              TopinsChatGenie: Your Student's Study Buddy. Get instant help,
              connect with classmates, and stay organized. Ask questions,
              share notes, and find study groups. Level up your learning
              with TopinsChatGenie. Download now and ace your exams!
            </p>
          </div>
          <img src={coder} />
        </div>
        <div className="md:flex shadow-xl  bg-[#EDF7FF] mx-[10%] sm:mx-[5%] justify-between items-center my-[6rem] rounded-[3rem]">
          <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 500 }} className="text-center  items-center sm:bg-white  sm:w-[50%] sm:rounded-b-[2rem] sm:m-auto sm:pt-[1.5rem]  md:bg-white text-[2rem] font-bold text-[#263A5C] md:pt-[3rem]  md:ml-5 md:w-[50%] md:h-[10rem] md:rounded-l-[3rem]">
            About us
          </h1>
          <p className="py-[4rem] px-10 md:px-[10rem] md:text-start sm:text-center text-[#263A5C]">
            TopinsChatGenie is your ultimate study companion. It's designed
            to make learning more efficient and enjoyable. As an AI-powered
            chat app, it offers instant help, personalized guidance, and a
            supportive community. You can ask questions, connect with
            classmates, stay organized, and access learning resources. Our
            goal is to empower students to achieve their academic goals.
            TopinsChatGenie is your personal tutor, study group, and
            organizer all in one.
          </p>
        </div>
        <div className="mx-[10%] sm:mx-[5%] text-center md:text-left">
          <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-center  text-[2rem] font-bold text-[#263A5C] mb-[1rem]">
            Our services
          </h1>
          <div className="md:flex justify-between items-center bg-[#FFF5FF] rounded-[3rem] px-[4rem] rounded-r-[3rem] md:rounded-l-none md:py-none py-5 shadow-xl">
            <div>
              <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-[20px] font-bold pb-5 ">
                Revolutionizing Student <br /> Learning: TopinsChatGenie
              </h1>
              <p className="md:w-[60%] text-[#263A5C] ">
                TopinsChatGenie offers a variety of services to help
                students succeed academically. Students can get instant
                answers to their questions, find study buddies, receive
                personalized guidance, stay organized, and access learning
                resources.
              </p>
            </div>
            <img className="md:pt-5 text-center mx-auto pt-3" src={predator} width="300" alt="" />
          </div>
        </div>
        <div className="mx-[10%] sm:mx-[5%] bg-[#F5F8FF] my-20 md:flex px-[2rem] py-[2rem] md:text-left text-center justify-center items-center md:rounded-r-none rounded-[3rem] shadow-xl">
          <img className="mx-auto" src={rafiki} alt="" />
          <div className="md:px-[10rem]">
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-[20px] font-bold">
              Join Us
            </h1>
            <p className="mt-5 text-[#263A5C] ">
              Ready to level up your learning game? Join TopinsChatGenie and
              experience the future of education. With our AI-powered chat
              app, you'll have access to instant help, personalized
              guidance, and a supportive community. Download the app now and
              start your journey to academic success.
            </p>
          </div>
        </div>

        <div className="md:flex justify-between items-center bg-[#FFF5FF] rounded-[3rem] px-[4rem] rounded-r-[3rem] md:rounded-l-none md:py-none py-5 shadow-xl mx-[10%] sm:mx-[5%]">
          <div>
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-[20px] font-bold pb-5 ">
              Non-IT <br /> enterprises
            </h1>
            <p className="md:w-[60%] text-[#263A5C] ">
              TopinsChatGenie is more than just a student chat app. We're a
              dynamic platform that empowers businesses to connect,
              collaborate, and innovate. Our cutting-edge technology and
              commitment to excellence make us the ideal partner for your
              enterprise.
            </p>
          </div>
          <img className="md:pt-5 text-center mx-auto pt-3" src={predator} width="300" alt="" />
        </div>

        <div>
          <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-center font-bold text-[#002B9A] mt-[3rem] text-3xl ">
            Services Maps
          </h1>
          <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-2xl font-bold pb-2">
              FAQs
            </h1>
            <ul className="md:w-[50%]">
              <h2 className="text-xl pt-2">
                Explore common queries and solutions about TopinsChatGenie:
              </h2>
              <li>-Trouble shooting tips for technical issues</li>
              <li>-Guidance on app functionalities and navigation.</li>
              <li>-Information on account setup and management.</li>
              <li>- Clarifications on data security measures.</li>
              <li>- Contact details for further assistance.</li>
            </ul>
          </div>
          <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-2xl font-bold pb-2">
              Features
            </h1>
            <ul className="md:w-[50%]">
              <h2 className="text-xl pt-2">
                Discover how TopinsChatGenie simplifies education:
              </h2>
              <li>- Instant messaging</li>
              <li>- Private messaging</li>
              <li>- Security features</li>
              <li>- Solve basic and complex equations. </li>
              <li>- Intuitive interface for user-friendly experience.</li>
            </ul>
          </div>

          <div className="md:flex text-center md:text-left items-center justify-between mx-[10%] sm:mx-[5%] my-[2rem] bg-[#F9F9F9] px-[4rem] py-[3rem]">
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-[#002B9A] text-2xl font-bold pb-2">
              Privacy Policy
            </h1>
            <ul className="md:w-[50%]">
              <h2 className="text-xl pt-2">
                Learn about TopinsChatGenie's commitment to user privacy:
              </h2>
              <li>- Explanation of data collection and usage practices.</li>
              <li>- Measures taken to safeguard sensitive information.</li>
              <li>- User control options for managing data sharing.</li>
              <li>- Compliance with relevant privacy regulations.</li>
              <li>- Contact information for privacy inquiries.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#EFF7FF] mt-[2rem] flex justify-between items-center py-20">
          <img className="mt-[-25rem] hidden md:block " src={contact1} alt="" />
          <div className="md:w-[50%] mx-auto">
            <h1 style={{ fontFamily: "Clash Display, sans-serif", fontWeight: 700 }} className="text-center text-2xl font-bold  mt-[-3rem] pb-5">
              Contact us
            </h1>
            <form className="text-center">
              <input className="my-3 w-full py-3 px-10 rounded-md outline-none" placeholder="Full Name" type="text" /> <br />
              <input className="my-3 w-full py-3 px-10 rounded-md outline-none" type="text" placeholder="Emaill Addres" /> <br />
              <input className="my-3 w-full py-3 px-10 rounded-md outline-none" type="text" placeholder="Phone Number" /> <br />
              <textarea className="my-3 w-full px-10 rounded-md py-[3rem] outline-none" placeholder="Have anything to say?" />
              <button className="bg-gradient-to-r from-blue-600 to-blue-900  px-16 mt-[2rem] py-1 text-white rounded-md">
                Send
              </button>
            </form>
          </div>
          <img className=" hidden md:block mb-[-25rem]" src={contact2} alt="" />
        </div>

        <footer className="bg-[#263A5C] h-[5rem] text-white flex justify-around items-center">
          <h1
            style={{
              fontFamily: "Clash Display, sans-serif",
              fontSize: "20px",
              fontWeight: 500
            }}
          >
            TopinsChatGenie
          </h1>
          <p className="w-fit text-end">
            TopinsChatGenie.2024@ All Rights Reserved
          </p>
        </footer>
      </div>;
}