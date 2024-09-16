import React, { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import {jwtDecode} from "jwt-decode"; // Corrected import
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
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeakingIndex, setIsSpeakingIndex] = useState<number | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isListening, setIsListening] = useState(false);

  let pendingQuestion: { question: string } | null = null;

  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  // Fetch pending question from localStorage
  useEffect(() => {
    const pendingQuestionJSON = localStorage.getItem("pendingQuestion");
    if (pendingQuestionJSON) {
      try {
        pendingQuestion = JSON.parse(pendingQuestionJSON);
      } catch (error) {
        console.error("Error parsing pending question JSON:", error);
      }
    }
  }, []);

  // Token and user details
  const tosinToken = localStorage.getItem("token");
  const token = JSON.parse(tosinToken as string); // type assertion
  const decodedToken = jwtDecode(token) as { [key: string]: string };
  const firstLetter = decodedToken?.name?.slice(0, 1) || "";

  // Fetch chat history
  const fetchChat = useCallback(async () => {
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
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchChat();
    }
  }, [token, fetchChat]);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.MouseEvent<HTMLImageElement, MouseEvent> | React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!question.trim()) return;

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
    },
    [question, token, fetchChat]
  );

  // Handle keydown event, allow enter for newline and shift+enter for submit
const handleKeyDown = useCallback(
  (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey) {
      // If Shift + Enter is pressed, allow a new line to be added
      return;
    } else if (e.key === "Enter" && !e.shiftKey) {
      // If only Enter is pressed, prevent default action (which would normally add a new line)
      e.preventDefault();
      // Call submit function
      handleSubmit(e as unknown as React.MouseEvent<HTMLImageElement, MouseEvent>);
    }
  },
  [handleSubmit]
);
 const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Dynamically adjust the height of the textarea when content changes
  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset height first to calculate the scroll height
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight to fit content
    }
  }, []);

  // Update textarea height when the question changes
  useEffect(() => {
    resizeTextarea();
  }, [question, resizeTextarea]);

  // Speech recognition
  const startSpeechRecognition = useCallback((): void => {
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion((prev) => `${prev} ${transcript}`); // Update input with recognized speech
      };

      recognition.onerror = (event: Event) => {
        console.error("Speech Recognition Error:", event);
      };

      recognition.start();
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  // Copy text to clipboard
  const handleCopy = useCallback((text: string, index: number) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedIndex(index);
        setTimeout(() => {
          setCopiedIndex(null);
        }, 1000);
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  }, []);

  // Speech synthesis
  const handleSpeak = useCallback((text: string, index: number) => {
    setIsSpeakingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeakingIndex(null);
    };
    speechSynthesis.speak(utterance);
  }, []);

  const handleStop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeakingIndex(null);
  }, []);

  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        fontWeight: "400",
        backgroundColor: isDarkMode ? "#000000" : "#FFFFFF",
        color: isDarkMode ? "#FFFFFF" : "#000000",
        minHeight: "100vh",
      }}
    >
      <div className="w-full sm:w-[100%] m-auto mt-[70px] md:mt-[10px] my-12 p-[10px] max-w-[60rem]">
        <div style={{ margin: "auto", height: "85vh", overflowX: "auto" }}>
          {chat.map((chatItem, index) => (
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
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
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
                        isSpeakingIndex === index ? handleStop() : handleSpeak(chatItem.response, index)
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
          ))}
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
   <form className="flex-1 flex" onSubmit={() => {}}>
        <textarea
          ref={textareaRef} // Attach the textarea to the ref
          rows={1}
          onKeyDown={handleKeyDown}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          // className={`outline-none flex-1 p-1 rounded-l-xl resize-none`}
           className={`flex w-full max-w-[60rem] m-auto p-1 rounded-xl border ${
              isDarkMode ? "bg-[#212121] border-[#333]" : "bg-white border-black"
            }`}
          placeholder="Type your question here..."
          style={{ overflow: "hidden" }} // No scrollbars
        />
  {question.trim().length === 0 ? (
    <img
      src={isDarkMode ? micWhite : micBlack}
      alt="Mic"
      className="ml-2 hover:cursor-pointer h-7 w-7"
      onClick={startSpeechRecognition}
    />
  ) : (
    <button type="submit">
      <img
        src={isDarkMode ? sendWhite : sendBlack}
        alt="Send"
        className="ml-2 hover:cursor-pointer h-7 w-7"
      />
    </button>
  )}
</form>

          </div>
        </div>
      </div>
    </div>
  );
}
