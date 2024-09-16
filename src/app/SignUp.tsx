import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Onboard from "./components/Onboard";
import { HashLoader } from "react-spinners";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For eye icon

export default function SignUp() {
  const [name, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Updated regex to include all special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[A-Za-z\d\W\S]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters"
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "https://topins-chat-backend.onrender.com/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email,
            number: phone,
            gender,
            age,
            password
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/signin");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-4 py-10 sm:px-8 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-fit lg:max-w-3xl border-[#B1B5B9] border-[1px] rounded-[6px] p-[40px]">
            <div className="w-full">
              <h1 style={{ fontFamily: "Clash Display, sans-serif" }} className="text-2xl font-bold text-[#263A5C] sm:text-3xl md:text-4xl text-center">
                Sign Up
              </h1>

              <form onSubmit={handleSubmit} className="mt-8">
                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                  <input value={name} onChange={e => setFirstName(e.target.value)} type="text" placeholder="Enter your Name" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm outline-none " required />
                </div>

                {isLoading && <div className="flex z-10 h-full bg-slate-100 opacity-85 w-full absolute items-center justify-center">
                    <HashLoader color="#263A5C" />
                  </div>}

                <div className="flex justify-between w-[20rem] m-auto">
                  <div className=" w-[9rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-sm shadow-sm outline-none ">
                    <input className="outline-none w-[7rem] " type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
                  </div>
                  <div className=" border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-sm shadow-sm ">
                    <select className="outline-none" value={gender} onChange={e => setGender(e.target.value)} required>
                      <option className="outline-none" value="">
                        Select Gender
                      </option>
                      <option className="outline-none" value="M">
                        Male
                      </option>
                      <option className="outline-none" value="F">
                        Female
                      </option>
                      <option className="outline-none" value="Rather not say">
                        Rather Not Say
                      </option>
                    </select>
                  </div>
                </div>

                <div className="col-span-6 flex justify-center m-[20px]">
                  <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Enter your email" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-lg shadow-sm outline-none" required />
                </div>

                {/* Password with Eye Icon */}
                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px] relative">
                  <input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} placeholder="Enter your Password" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm outline-none" required />
                  <span className="absolute right-[40px] top-[50%]  transform -translate-y-[50%] cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash className="w-[40px]" /> : <FaEye className="w-[40px]" />}
                  </span>
                </div>

                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                  <input value={phone} onChange={e => setPhone(e.target.value)} type="text" placeholder="Enter your phone number" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm outline-none " required />
                </div>

                <div className="col-span-6 flex items-center">
                  <input type="checkbox" className="w-4 h-4 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-[#407CE2] cursor-pointer" required />
                  <p className="text-sm text-gray-500 ml-3">
                    I agree to the healthcare <span className="text-[#407CE2] cursor-pointer">
                      Terms of Service
                    </span> and <span className="text-[#407CE2] cursor-pointer">
                      Privacy Policy
                    </span>
                  </p>
                </div>

                <button type="submit" className="w-[20rem] rounded-[20px] flex justify-center bg-[#263A5C] text-white m-auto mt-[30px]" disabled={isLoading}>
                  <h2 className="m-3 font-semibold">
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </h2>
                </button>
              </form>

              {error && <div style={{ fontFamily: "Clash Display, sans-serif", fontWeight: "500" }} className="text-red-500 text-center mt-4">
                  {error}
                </div>}

              <div className="flex justify-center mt-[20px]">
                <p className="text-lg text-[#221F1F]">
                  Already have an account? <Link className="text-[#407CE2]" to="/signin">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        <aside className="lg:col-span-6 lg:h-full hidden lg:block h-[100vh] bg-[#263A5C]">
          <Onboard />
        </aside>
      </div>
    </section>;
}
