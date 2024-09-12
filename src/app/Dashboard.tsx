import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { jwtDecode } from "jwt-decode";
import info from "../images/information.svg";
import send from "../images/sendMessage.svg";
import ai from "../images/icon-white-background.svg";
import aiDark from "../images/icon-black-background.svg";
import share from "../images/Share.svg";
import profile from "../images/profilepic2.svg";
import { useTheme } from "./useTheme";

interface Chat {
  question: string;
  response: string;
  createdAt: string;
}

interface DecodedToken {
  name?: string;
}

export default function Settings() {
  const history = useNavigate();
  const isLoadingRef = useRef<HTMLDivElement>(null);
const { isDarkMode, toggleTheme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let pendingQuestion: { question: string } | null = null;



  // Pending question handling
  const pendingQuestionJSON = localStorage.getItem("pendingQuestion");
  if (pendingQuestionJSON) {
    try {
      pendingQuestion = JSON.parse(pendingQuestionJSON);
    } catch (error) {
      console.error("Error parsing pending question JSON:", error);
    }
  }

  // Token and user details
  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string);
  const decodedToken = jwtDecode(token) as { [key: string]: string };
const firstLetter = decodedToken.name?.slice(0, 1) || '';



  // Fetch Chat
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

  useEffect(() => {
    if (token) {
      fetchChat();
    }
  }, [token]);

  // Handle form submission
  const handleSubmit = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.preventDefault();
    const formData = { question };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(
        e as unknown as React.MouseEvent<HTMLImageElement, MouseEvent>
      );
      setQuestion("");
    }
  };

  // Markdown custom components
  const components: Partial<import("react-markdown").Components> = {
    ol: ({ children }) => (
      <ol className="list-decimal pl-[20px]">{children}</ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-[20px]">{children}</ul>
    ),
    li: ({ children }) => <li className="mb-[5px]">{children}</li>
  };

  return (
   <div
  style={{
    fontFamily: "Roboto, sans-serif",
    fontWeight: "400",
    backgroundColor: isDarkMode ? "#000000" : "#FFFFFF", // Dark and light background
    color: isDarkMode ? "#FFFFFF" : "#000000", // Text color
    minHeight: "100vh", // Ensure the background covers the entire viewport height
  }}
>
      <header className="hidden md:block">
        <nav className="topHeader flex justify-end items-center my-10">
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

      <div className="w-full sm:w-[100%] m-auto mt-[10px] my-12 p-[10px] max-w-[60rem]">
     <div style={{ margin: "auto", height: "70vh", overflowX: "auto" }}>
  {chat.map((chatItem, index) => (
    <div key={index}>
      {/* User chat */}
      <div className="w-[70%] flex ml-auto self-end">
        <div className="ml-auto w-[fit]">
          <div
            className={`w-fit ml-auto mr-[10px] mt-[10px] rounded-lg p-[12px] ${
              isDarkMode
                ? "bg-[#1C1C1C] text-white"
                : "bg-[#F7F9FB] text-[black]"
            }`}
          >
            <p className="text-start">{chatItem.question}</p>
          </div>
        </div>
      </div>

      {/* AI chat */}
      <div className="w-[85%] flex mr-auto items-start">
       <img
      src={isDarkMode ? aiDark : ai}
      alt=""
      className={`m-[10px] w-[30px] h-[30px] ${
        isDarkMode ? 'bg-black border-white' : 'bg-white border-[#1C1C1C]'
      }`}
    />
        <div>
          <div
            className={`w-[100%] mr-auto mt-[20px] p-[10px]  ${
              isDarkMode
                ? " text-white "
                : " text-[#191919] "
            }`}
          >
            {chatItem.response && chatItem.response.includes("1.") ? (
              <ReactMarkdown components={components}>
                {chatItem.response}
              </ReactMarkdown>
            ) : (
              <ReactMarkdown>{chatItem.response}</ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>


        {/* Input Section */}
  <div
      className={`flex w-[90%] m-auto p-[4px] mb-[10px] mt-[10px] rounded-xl border-solid border-[1px] ${
        isDarkMode ? 'bg-[#212121] border-[#333]' : 'bg-white border-black'
      }`}
    >
      <input
        type="text"
        onKeyDown={handleKeyDown}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className={`outline-none w-[100%] p-[4px] ${
          isDarkMode ? 'bg-[#212121] text-white placeholder:text-gray-400' : 'bg-white text-black placeholder:text-gray-500'
        }`}
        placeholder="Type your question here..."
      />
      <img
        src={send}
        alt="Send"
        className="hover:cursor-pointer"
        onClick={handleSubmit}
      />
    </div>
      </div>
    </div>
  );
}
