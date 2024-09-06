import scheduleIcon from "../images/schedule.svg";
import activityIcon from "../images/activity.svg";
import emergencyIcon from "../images/emergencyHome.svg";
import notifyIcon from "../images/ri_notification-4-line.svg";
import chatIcon from "../images/chat.svg";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { SyncLoader } from "react-spinners";
import info from "../images/information.svg";
import send from "../images/sendMessage.svg";
import ai from "../images/carbon_watsonx-ai.svg";
import share from "../images/Share.svg";
import profile from "../images/profilepic2.svg";
import ReactMarkdown from "react-markdown";
import { jwtDecode } from "jwt-decode";

export default function Settings() {
  const history = useNavigate();
  const isLoadingRef = useRef<HTMLDivElement>(null);

  const pendingQuestionJSON = localStorage.getItem("pendingQuestion");
  let pendingQuestion: any;
  if (pendingQuestionJSON) {
    try {
      pendingQuestion = JSON.parse(pendingQuestionJSON);
    } catch (error) {
      console.error("Error parsing pending question JSON:", error);
    }
  }

  interface Chat {
    question: string;
    response: string;
    time: string;
  }

  const [chat, setChat] = useState<Chat[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string);
  const decodedToken = jwtDecode(token) as { [key: string]: string };
const firstLetter = decodedToken.name?.slice(0, 1) || '';


  const fetchChat = async () => {
    try {
      const response = await fetch(
        "https://topins-chat-backend.onrender.com/user/allChat",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );
      const chatData = await response.json();
      setChat(chatData);
    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  };

  useEffect(
    () => {
      fetchChat();
    },
    [token]
  );

  const constructFormData = () => {
    return { question: question };
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(
        (e as unknown) as React.MouseEvent<HTMLImageElement, MouseEvent>
      );
      setQuestion("");
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = constructFormData();

    localStorage.setItem("pendingQuestion", JSON.stringify(formData));
    setIsLoading(true);
    setQuestion("");

    try {
      const response = await fetch(
        "https://topins-chat-backend.onrender.com/user/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );
      if (response.ok) {
        setIsLoading(false);
        fetchChat();
        localStorage.removeItem("pendingQuestion");
      } else {
        setIsLoading(false);
        const data = await response.json();
        console.error("Failed to submit form data:", data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form data:", error);
    }
  };
  //  formatResponseWithLineBrea

  const formatResponseWithLineBreaks = (response: string) => {
    return response.replace(/(\d+)\s*\.\s*/g, "<br>$1. ");
  };
  return (
    <div>
      <div style={{ fontFamily: "Roboto, sans-serif", fontWeight: "400" }}>
        <header className="hidden md:block">
          <nav className="topHeader flex justify-between items-center my-10">
            <h1 className="text-2xl text-[#263A5C] font-bold">Chat</h1>
            <div className="flex items-center gap-4">
              <img src={share} alt="Bell Icon" className="w-[27px]" />
              <span
                onClick={() => history("../profile")}
                className="rounded-full text-white px-3 py-1 text-xl bg-[#6C8571] cursor-pointer"
              >
                {firstLetter}
              </span>
            </div>
          </nav>
        </header>
        <div className="w-full sm:w-[100%] m-auto mt-[10px] my-12 p-[10px] max-w-[60rem] rounded-lg border-[1px] border-[solid] border-[#E1E2FF]">
          <div className="flex border-b-[1px] border-b-[solid] border-b-[#E1E2FF]">
            <div className="w-fit mt-[5px]">
              <img src={ai} alt="" />
            </div>
            <div>
              <p className="text-[20px] ml-[5px] font-bold">TopinnsChatGenie</p>
              <p className="text-[18px] font-bold">#72u88q</p>
            </div>
            <div className="ml-[auto] w-[3%] items-center">
              <img src={info} alt="" className="w-full mt-[50%] mb-[50%]" />
            </div>
          </div>
          <div style={{ margin: "auto", height: "70vh", overflowX: "auto" }}>
            {chat.map((chat, index) =>
              <div key={index}>
                <div className="w-[70%] flex ml-auto self-end">
                  <div className="ml-auto w-[fit]">
                    <div className="bg-[#263A5C] w-fit ml-auto text-[white]  mt-[10px] rounded-lg p-[12px]">
                      <p className="text-start">
                        {chat.question}
                      </p>
                    </div>
                    <p className="text-end w-fit m-auto mr-[5px] text-[#333333]">
                      {chat.time}
                    </p>
                  </div>
                  <span
                onClick={() => history("../profile")}
                className="rounded-full text-white px- py-3 text-xl bg-[#6C8571] m-[2px] mt-[auto] mb-[auto]  ml-[5px] w-[50px] h-[50px] text-center cursor-pointer"
              >
                {firstLetter}
              </span>
                </div>
                <div className="w-[85%] flex mr-auto">
                  <img src={ai} alt="" className="m-[10px]" />
                  <div>
                    <div className="bg-white text-[#263A5C] w-fit mr-auto mt-[20px] border-[#333333] border-[1px] border-[solid] rounded-lg p-[10px]">
                      {chat.response && chat.response.includes("1.")
                        ? <div
                            dangerouslySetInnerHTML={{
                              __html: formatResponseWithLineBreaks(
                                chat.response
                              )
                            }}
                            className="list-decimal list-inside"
                          />
                        : <ReactMarkdown className="list-decimal list-inside">
                            {chat.response}
                          </ReactMarkdown>}
                    </div>
                    <p className="text-end w-fit mr-auto ml-[3px] text-[#333333]">
                      {chat.time}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {pendingQuestion &&
              <div className="w-[70%] flex ml-auto self-end">
                <div className="ml-auto w-[fit]">
                  <div className="bg-[#263A5C] text-[white]  mt-[10px] rounded-lg p-[12px]">
                    <p className="text-start">
                      {pendingQuestion.question}
                    </p>
                  </div>
                  <p className="text-end w-fit m-auto mr-[5px] text-[#333333]">
                    8pm
                  </p>
                </div>
                <img
                  src={profile}
                  alt=""
                  className="m-[2px] mt-[auto] mb-[auto]  ml-[5px] w-[30px] h-[30px]"
                />
              </div>}
            {isLoading &&
              <div ref={isLoadingRef} className="flex w-fit m-[10px]">
                <img src={ai} alt="" className="m-[3px]" />
                <SyncLoader color="#263A5C" className="m-[3px]" />
              </div>}
          </div>

          <div className="bg-white flex w-[80%] m-auto p-[4px] mb-[10px] mt-[10px] border-[solid] border-[1px] rounded-md border-[black]">
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className="outline-none w-[100%]"
            />
            <img
              src={send}
              alt=""
              className="hover:cursor-pointer"
              onClick={e => handleSubmit(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
