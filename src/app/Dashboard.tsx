import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import {jwtDecode} from "jwt-decode"; // Removed curly braces from jwtDecode import
import soundWhite from "../images/charm--sound-up-white-color.svg";
import soundBlack from "../images/charm--sound-up-black-color.svg";
import copyWhite from "../images/radix-icons--copy-white.svg";
import copyBlack from "../images/radix-icons--copy-black.svg";
import micWhite from "../images/ic--outline-mic-white.svg";
import micBlack from "../images/ic--outline-mic-black.svg";
import sendWhite from "../images/ic--sharp-send-white.svg";
import sendBlack from "../images/ic--sharp-send-black.svg";
import ai from "../images/icon-white-background.svg";
import aiDark from "../images/icon-black-background.svg";
import stopWhite from "../images/ic--round-stop-white.svg";
import stopBlack from "../images/ic--round-stop-black.svg";
import tickIcon from "../images/charm--tick.svg";
import { useTheme } from "./useTheme";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "katex/dist/katex.min.css"; 
interface Chat {
  question: string;
  response: string;
  createdAt: string;
}

interface DecodedToken {
  name?: string;
}

export default function Settings() {
  const navigate = useNavigate(); // Updated "history" to "navigate" for react-router v6+
  const { isDarkMode, toggleTheme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false); // State to control if speech is active
  const [isSpeakingIndex, setIsSpeakingIndex] = useState<number | null>(null); // Track the index of the speaking chat
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null); // To keep track of the current speech
  const [isListening, setIsListening] = useState(false);

  let pendingQuestion: { question: string } | null = null;

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  // Fetch pending question from localStorage
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
  const decodedToken = jwtDecode(token) as DecodedToken;
  const firstLetter = decodedToken.name?.slice(0, 1) || "";

  // Fetch chat history
  const fetchChat = async () => {
    try {
      const response = await fetch(
        "https://topins-chat-backend.onrender.com/user/allChat",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
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
  const handleSubmit = async (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
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
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
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
      handleSubmit(e as unknown as React.MouseEvent<HTMLImageElement, MouseEvent>);
      setQuestion("");
    }
  };

  // Markdown custom components
  const components: Partial<import("react-markdown").Components> = {
    ol: ({ children }) => <ol className="list-decimal pl-[20px]">{children}</ol>,
    ul: ({ children }) => <ul className="list-disc pl-[20px]">{children}</ul>,
    li: ({ children }) => <li className="mb-[5px]">{children}</li>,
  };


  
const startSpeechRecognition = (): void => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      // Handle the result of the speech recognition
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript); // Update the input with recognized speech
      };

      // Handle recognition errors
      recognition.onerror = (event: Event) => {
        console.error('Speech Recognition Error:', event);
      };

      // Start speech recognition
      recognition.start();
    } else {
      alert('Speech Recognition API is not supported in this browser.');
    }
  };


const handleCopy = (text: string, index: number) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      setCopiedIndex(index); // Mark the copied item
      setTimeout(() => {
        setCopiedIndex(null); // Reset after 3 seconds
      }, 1000); // 3 seconds delay
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
};

const handleSpeak = (text: string, index: number) => {
  setIsSpeakingIndex(index); // Set the current chat as speaking
  // Speech synthesis logic here
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.onend = () => {
    setIsSpeakingIndex(null); // Reset when the speech ends
  };
  speechSynthesis.speak(utterance);
};

const handleStop = () => {
  speechSynthesis.cancel(); // Stop speaking
  setIsSpeakingIndex(null); // Reset the speaking state
};

const renderedChats = useMemo(() => {
  return chat.map((chatItem, index) => (
    <div key={index}>
      {/* User chat */}
      <div className="w-[70%] flex ml-auto self-end">
        <div className="ml-auto w-[fit]">
          <div
            className={`w-fit ml-auto mr-[10px] mt-[10px] rounded-lg p-[12px] ${
              isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-[#F7F9FB] text-[black]"
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
          alt="AI Icon"
          className={`m-[10px] w-[30px] h-[30px] ${
            isDarkMode ? "bg-black border-white" : "bg-white border-[#1C1C1C]"
          }`}
        />
        <div>
          <div
            className={`w-[100%] mr-auto mt-[20px] p-[10px] ${
              isDarkMode ? "text-white" : "text-[#191919]"
            }`}
          >
            {chatItem.response ? (
              chatItem.response.includes("$$") ? (
                <MathJaxContext>
                  <MathJax dynamic>
                    {chatItem.response.split("$$").map((part, index) =>
                      index % 2 === 1 ? (
                        <MathJax key={index} dynamic>{`$$${part}$$`}</MathJax>
                      ) : (
                        <span key={index}>
                          {/* Manually handle the bold sections */}
                          {part.split("\n").map((line, idx) =>
                            line.startsWith("**") && line.endsWith("**") ? (
                              <p key={idx} className="font-bold">
                                {line.slice(2, -2)}
                              </p>
                            ) : (
                              <p key={idx}>{line}</p>
                            )
                          )}
                        </span>
                      )
                    )}
                  </MathJax>
                </MathJaxContext>
              ) : (
                <ReactMarkdown
                  components={components}
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {chatItem.response}
                </ReactMarkdown>
              )
            ) : null}
          </div>

          <div className="flex gap-3">
            <img
              className="hover:cursor-pointer"
              src={
                isSpeakingIndex === index
                  ? isDarkMode
                    ? stopWhite
                    : stopBlack
                  : isDarkMode
                  ? soundWhite
                  : soundBlack
              }
              alt="Sound Icon"
              onClick={() =>
                isSpeakingIndex === index
                  ? handleStop()
                  : handleSpeak(chatItem.response, index)
              }
            />

            <img
              className="hover:cursor-pointer"
              src={copiedIndex === index ? tickIcon : isDarkMode ? copyWhite : copyBlack}
              alt="Copy Icon"
              onClick={() => handleCopy(chatItem.response, index)}
            />
          </div>
        </div>
      </div>
    </div>
  ));
}, [chat, isDarkMode, isSpeakingIndex, copiedIndex]); // Dependencies




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
      <div className="w-full sm:w-[100%] m-auto mt-[70px] md:mt-[10px] my-12 p-[10px] max-w-[60rem]">
        <div style={{ margin: "auto", height: "85vh", overflowX: "auto" }}>
        {renderedChats}
        </div>


        {/* Input Section */}
        <div
          className={`bottom-0 left-0 right-0 flex w-full p-4 ${
            isDarkMode ? "bg-[#212121] border-t" : "bg-white border-t"
          }`}
        >
          <div
            className={`flex w-full max-w-[60rem] m-auto p-1 rounded-xl border ${
              isDarkMode ? "bg-[#212121] border-[#333]" : "bg-white border-black"
            }`}
          >
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`outline-none flex-1 p-1 rounded-l-xl ${
                isDarkMode ? "bg-[#212121] text-white placeholder:text-gray-400" : "bg-white text-black placeholder:text-gray-500"
              }`}
              placeholder="Type your question here..."
            />
        {question.trim().length === 0 ? (
      <img
        src={isDarkMode ? micWhite : micBlack}
        alt="Mic"
        className="ml-2 hover:cursor-pointer h-7 w-7"
        onClick={startSpeechRecognition}
      />
    ) : (
      <img
        src={isDarkMode ? sendWhite : sendBlack}
        alt="Send"
        className="ml-2 hover:cursor-pointer h-7 w-7"
        onClick={handleSubmit}
      />
    )}
  </div>
        </div>
      </div>
    </div>
  );
}
