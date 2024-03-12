import profile from '../images/profilepic2.svg'
import info from '../images/information.svg'
import send from '../images/sendMessage.svg'
import ai from '../images/carbon_watsonx-ai.svg'
import notifyIcon from '../images/ri_notification-4-line.svg'
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react'

export default function Notification() {
  const history = useNavigate();
  interface Chat {
    question: string;
    response: string;

  }
  
  const [chat, setChat] = useState<Chat[]>([]);
  const tosinToken = localStorage.getItem("token");
  // console.log(tosinToken);
  const token = JSON.parse(tosinToken as string); // type assertion
  const [question ,setQuestion] = useState('')
  

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await fetch("https://senexcare.onrender.com/user/allChat", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const chatData = await response.json();
        // console.log(chatData)
        setChat(chatData)
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchChat();
  }, [token]);

  const constructFormData = () => {
    return {
      question: question,
    };
  };
  const handleSubmit = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.preventDefault();
    const formData = constructFormData();
    console.log(formData);
    try {
      const response = await fetch('https://senexcare.onrender.com/user/chat', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
        const data = await response.json();
        // Update the state with the new question
        setChat([...chat, data]); // Assuming `data` contains the newly added question
      } else {
        const data = await response.json();
        console.error('Failed to submit form data:', data);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  

  return (
    <div
      style={{
        fontFamily: 'Roboto, sans-serif',
        fontWeight: '400',
      }}
    >
      <header className='hidden md:block'>
        <nav className="topHeader flex justify-between items-center my-10">
          <h1 className='text-2xl text-[#263A5C] font-bold'>Chat</h1>
          <div className="flex items-center gap-4">
            <img
              onClick={() => history("../notification")}
              src={notifyIcon}
              alt="Bell Icon"
            />
            <span
              onClick={() => history("../profile")} 
              className="rounded-full text-white px-3 py-1 text-xl bg-[#6C8571] cursor-pointer"
            >T</span>
          </div>
        </nav>
      </header>
      <div className='w-full sm:w-[90%] m-auto my-12 p-[10px] max-w-[60rem] rounded-lg border-[1px] border-[solid] border-[#E1E2FF] '>
  <div className='flex border-b-[1px] border-b-[solid] border-b-[#E1E2FF] '>
    <div className='w-fit mt-[5px]'>
      <img src={ai} alt="" />
    </div>
    <div>
      <p className='text-[20px] ml-[5px] font-bold'>Al</p>
      <p className='text-[18px] font-bold'>#7286376</p>
    </div>
    <div className='ml-[auto] w-[3%] items-center'>
      <img src={info} alt="" className='w-full mt-[50%] mb-[50%]' />
    </div>
  </div>
  <div style={{ margin: 'auto', height: '67vh', overflowX: 'auto' }}>
  {chat.map((chat, index) => (
    <div key={index}>
    <div className='w-[60%] flex ml-auto '>
    <div className='ml-[auto] w-[80%] bg-red'>
    <div className='bg-[#263A5C] text-[white]  mt-[10px] rounded-lg p-[12px] '>
      <p className='text-start'>{chat.question}</p>
    </div>
    <p className='text-end w-fit m-auto mr-[1px] text-[#333333]'>8pm</p>
  </div>
  <img src={profile} alt="" className='m-[auto]  mr-[10px] w-[30px] h-[30px]' />
   </div>
      <div className='w-[85%] flex mr-auto'>
        <img src={ai} alt="" className='m-[10px]' />
        <div>
          <div className='bg-white text-[#263A5C] ml-auto mt-[20px] border-[#333333] border-[1px] border-[solid] rounded-lg p-[12px] '>
            <p>{chat.response}</p>
          </div>
          <p className='text-end w-fit mr-auto ml-[3px] text-[#333333]'>8pm</p>
        </div>
      </div>
    </div>
  ))}
</div>



  <div className='bg-white flex w-[80%] m-auto p-[4px] mb-[10px] mt-[10px] border-[solid] border-[1px] rounded-md border-[black] '>
    <input type="text"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    className='outline-none w-[100%]' />
    <img src={send} alt="" className='hover:cursor-pointer' onClick={(e) => handleSubmit(e)} />
  </div>
</div>

    </div>
  )
}