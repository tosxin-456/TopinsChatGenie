import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { jwtDecode } from "jwt-decode";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import "katex/dist/katex.min.css";
import { Calendar, ChevronDown, ChevronUp, Copy, Mic, Send, Volume2, XCircle } from "lucide-react";
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
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [chat, setChat] = useState<Chat[]>([]);
  const [filteredChat, setFilteredChat] = useState<Chat[]>([]);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const isLoadingRef = useRef<HTMLDivElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [isSpeakingIndex, setIsSpeakingIndex] = useState<number | null>(null);
  const [currentUtterance, setCurrentUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isListening, setIsListening] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtTop, setIsAtTop] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  
  let pendingQuestion: { question: string } | null = null;
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Group chats by date
  const groupChatsByDate = (chats: Chat[]) => {
    const groupedChats: { [key: string]: Chat[] } = {};
    
    chats.forEach(chat => {
      const dateKey = formatDate(chat.createdAt);
      if (!groupedChats[dateKey]) {
        groupedChats[dateKey] = [];
      }
      groupedChats[dateKey].push(chat);
    });
    
    return groupedChats;
  };

  // Get available dates from chat history
  const availableDates = useMemo(() => {
    return Object.keys(groupChatsByDate(chat)).sort((a, b) => {
      return new Date(b).getTime() - new Date(a).getTime();
    });
  }, [chat]);

  // Effect to filter chats when date is selected
  useEffect(() => {
    if (selectedDate) {
      const filtered = chat.filter(chatItem => 
        formatDate(chatItem.createdAt) === selectedDate
      );
      setFilteredChat(filtered);
    } else {
      setFilteredChat(chat);
    }
  }, [selectedDate, chat]);

  // Handle date picker outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [datePickerRef]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsAtBottom(true);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setIsAtBottom(scrollHeight - scrollTop === clientHeight);
    }
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    setIsAtTop(true);
  };

  useEffect(() => {
    scrollToBottom();
  }, [filteredChat]);

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
      setFilteredChat(chatData); // Initialize filtered chats with all chats
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
  const handleSubmit = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
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
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!question.trim()) return;
      handleSubmit(e as unknown as React.MouseEvent<SVGElement, MouseEvent>);
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
      setIsListening(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event: Event) => {
        console.error('Speech Recognition Error:', event);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech Recognition API is not supported in this browser.');
    }
  };

  const handleCopy = (text: string, index: number) => {
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
  };

  const handleSpeak = (text: string, index: number) => {
    // Cancel any ongoing speech
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      if (isSpeakingIndex === index) {
        setIsSpeakingIndex(null);
        return;
      }
    }
    
    setIsSpeakingIndex(index);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      setIsSpeakingIndex(null);
    };
    speechSynthesis.speak(utterance);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsSpeakingIndex(null);
  };

  // Date display component
  const DateDisplay = () => {
    if (!selectedDate) return null;
    
    return (
      <div className={`flex items-center justify-center mb-4 py-2 px-4 rounded-lg ${
        isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-[#F7F9FB] text-black"
      }`}>
        <Calendar className="w-5 h-5 mr-2" />
        <span className="font-medium">{selectedDate}</span>
        <XCircle 
          className="w-5 h-5 ml-2 cursor-pointer opacity-70 hover:opacity-100" 
          onClick={() => setSelectedDate(null)}
        />
      </div>
    );
  };

  const renderChats = useMemo(() => {
    return filteredChat.map((chatItem, index) => (
      <div key={index}>
        {/* User chat */}
        <div className="w-full md:w-[80%] flex ml-auto self-end">
          <div className="ml-auto w-fit">
            <div
              className={`w-fit ml-auto mr-[10px] mt-[10px] rounded-lg p-[12px] ${
                isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-[#F7F9FB] text-black"
              }`}
            >
              <p className="text-start">{chatItem.question}</p>
            </div>
            <p className="text-end w-fit ml-auto mr-[15px] mt-1 text-xs opacity-60">
              {new Date(chatItem.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>

        {/* AI chat */}
        <div className="w-full md:w-[85%] flex mr-auto items-start">
          <div className={`flex justify-center items-center m-[10px] min-w-[30px] h-[30px] rounded-full ${
            isDarkMode ? "bg-black text-white" : "bg-[#6C8571] text-white"
          }`}>
            AI
          </div>
          <div className="w-full">
            <div
              className={`w-full mr-auto mt-[10px] p-[12px] rounded-lg ${
                isDarkMode ? "bg-[#0d0d0d] text-white" : "bg-[#EAEFF5] text-[#191919]"
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

            <div className="flex gap-3 mt-2 mb-4 ml-1">
              <button
                className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${
                  isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-200"
                }`}
                onClick={() =>
                  isSpeakingIndex === index
                    ? handleStop()
                    : handleSpeak(chatItem.response, index)
                }
              >
                {isSpeakingIndex === index ? (
                  <XCircle className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}`} />
                ) : (
                  <Volume2 className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}`} />
                )}
              </button>

              <button
                className={`p-2 rounded-full hover:bg-opacity-10 transition-colors ${
                  isDarkMode ? "hover:bg-gray-300" : "hover:bg-gray-200"
                }`}
                onClick={() => handleCopy(chatItem.response, index)}
              >
                {copiedIndex === index ? (
                  <div className="text-green-500 flex items-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                ) : (
                  <Copy className={`w-5 h-5 ${isDarkMode ? "text-white" : "text-black"}`} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [filteredChat, isDarkMode, isSpeakingIndex, copiedIndex]);

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
        {/* Date Filter Button */}
        <div className="flex justify-between items-center mb-4">
          <div className="relative" ref={datePickerRef}>
            <button
              onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              className={`flex items-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                isDarkMode 
                  ? "bg-[#1C1C1C] text-white hover:bg-[#252525]" 
                  : "bg-[#F0F0F0] text-black hover:bg-[#E5E5E5]"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Filter by Date</span>
              {isDatePickerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            
            {isDatePickerOpen && (
              <div 
                className={`absolute z-10 mt-1 w-64 rounded-md shadow-lg ${
                  isDarkMode ? "bg-[#1C1C1C] border border-[#333]" : "bg-white border border-gray-200"
                }`}
              >
                <div className="py-1 max-h-64 overflow-y-auto">
                  {availableDates.length > 0 ? (
                    availableDates.map((date) => (
                      <button
                        key={date}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          isDarkMode 
                            ? "text-white hover:bg-[#252525]" 
                            : "text-gray-700 hover:bg-gray-100"
                        } ${selectedDate === date ? (isDarkMode ? "bg-[#333]" : "bg-blue-50") : ""}`}
                        onClick={() => {
                          setSelectedDate(date);
                          setIsDatePickerOpen(false);
                        }}
                      >
                        {date}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-500">No chat history available</div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {selectedDate && (
            <button
              onClick={() => setSelectedDate(null)}
              className={`py-2 px-4 rounded-lg text-sm transition-colors ${
                isDarkMode 
                  ? "bg-[#1C1C1C] text-gray-300 hover:bg-[#252525]" 
                  : "bg-[#F0F0F0] text-gray-600 hover:bg-[#E5E5E5]"
              }`}
            >
              Show All Chats
            </button>
          )}
        </div>
        
        {/* Selected Date Display */}
        <DateDisplay />
        
        {/* Chat Container */}
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          style={{ margin: "auto", height: "70vh", overflowY: "auto" }}
          className={`rounded-lg ${isDarkMode ? "scrollbar-dark" : "scrollbar-light"}`}
        >
          {filteredChat.length === 0 && !isLoading && !pendingQuestion ? (
            <div className={`flex flex-col items-center justify-center h-full ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              <div className={`p-6 rounded-full mb-4 ${
                isDarkMode ? "bg-[#1C1C1C]" : "bg-[#F0F0F0]"
              }`}>
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.418 16.97 20 12 20C10.5 20 9.18 19.731 8 19.243L3 20L4.5 16.243C3.572 15.102 3 13.612 3 12C3 7.582 7.03 4 12 4C16.97 4 21 7.582 21 12Z" 
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {selectedDate ? (
                <p className="text-lg font-medium mb-2">No chats on {selectedDate}</p>
              ) : (
                <p className="text-lg font-medium mb-2">No chat history found</p>
              )}
              <p className="text-sm opacity-70">Start a conversation below</p>
            </div>
          ) : (
            <>
              {renderChats}
              
              {pendingQuestion && (
                <div className='w-full md:w-[80%] flex ml-auto self-end'>
                  <div className='ml-auto w-fit'>
                    <div className={`w-fit ml-auto mr-[10px] mt-[10px] rounded-lg p-[12px] ${
                      isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-[#F7F9FB] text-black"
                    }`}>
                      <p className='text-start'>{pendingQuestion.question}</p>
                    </div>
                    <p className='text-end w-fit ml-auto mr-[15px] mt-1 text-xs opacity-60'>
                      {new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit', 
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              )}
              
              {isLoading && 
                <div ref={isLoadingRef} className='flex w-fit m-[10px]'>
                  <div className={`flex justify-center items-center m-[10px] min-w-[30px] h-[30px] rounded-full ${
                    isDarkMode ? "bg-black text-white" : "bg-[#6C8571] text-white"
                  }`}>
                    AI
                  </div>
                  <SyncLoader color={isDarkMode ? "#FFFFFF" : "#263A5C"} className='m-[5px] mt-[20px]'/>
                </div>
              }
            </>
          )}
          
          <div ref={chatEndRef} />
        </div>
        
        {/* Scroll to bottom button */}
        {!isAtBottom && filteredChat.length > 0 && (
          <button
            onClick={scrollToBottom}
            className={`fixed bottom-24 right-8 p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${
              isDarkMode ? "bg-[#1C1C1C] text-white" : "bg-white text-black border border-gray-200"
            }`}
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        )}

        {/* Input Section */}
        <div
          className={`fixed bottom-0 left-0 right-0 flex w-full p-4 border-t ${
            isDarkMode ? "bg-black border-[#333]" : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`flex w-full max-w-[60rem] m-auto p-3 rounded-xl ${
              isDarkMode ? "bg-[#1C1C1C] border border-[#333]" : "bg-[#F7F9FB] border border-gray-200"
            }`}
          >
            <input
              type="text"
              onKeyDown={handleKeyDown}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className={`outline-none flex-1 p-2 rounded-l-xl ${
                isDarkMode ? "bg-[#1C1C1C] text-white placeholder:text-gray-400" : "bg-[#F7F9FB] text-black placeholder:text-gray-500"
              }`}
              placeholder="Type your question here..."
            />
            <button 
              className={`ml-2 p-2 rounded-full transition-colors ${
                isDarkMode 
                  ? "bg-[#212121] hover:bg-[#252525]" 
                  : "bg-[#EAEFF5] hover:bg-[#D9E2F0]"
              }`}
            >
              {isListening ? (
                <div className="flex items-center justify-center w-6 h-6">
                  <span className="animate-pulse text-red-500">●</span>
                </div>
              ) : question.trim().length === 0 ? (
                <Mic 
                  className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`}
                  onClick={startSpeechRecognition}
                />
              ) : (
                <Send 
                  className={`w-6 h-6 ${isDarkMode ? "text-white" : "text-black"}`}
                  onClick={handleSubmit}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}