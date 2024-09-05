import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Onboard from "./components/Onboard";
import { HashLoader } from "react-spinners";

export default function SignUp() {
  const [name, setFirstName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // For error messages
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // Used to navigate to other routes

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error state

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
      console.log(data);

      if (response.ok) {
        // Registration successful, redirect to sign-in page
        console.log("Registration success");
        navigate("/signin"); // Redirect to the sign-in page
        console.log(response);
      } else {
        // Show error message returned from the server
        console.log(response);
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <main className="flex items-center justify-center px-8 py-10 sm:px-15 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-fit lg:max-w-3xl border-[#B1B5B9] border-[1px] rounded-[6px] p-[40px]">
            <div className="w-full">
              <h1
                style={{ fontFamily: "Clash Display, sans-serif" }}
                className="text-2xl font-bold text-[#263A5C] sm:text-3xl md:text-4xl text-center"
              >
                Sign Up
              </h1>

              {/* Error message */}

              <form onSubmit={handleSubmit} className="mt-8">
                {/* Name */}
                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                  <input
                    value={name}
                    onChange={e => setFirstName(e.target.value)}
                    type="text"
                    placeholder="Enter your Name"
                    className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm"
                    required
                  />
                </div>
                {isLoading &&
                  <div className="flex z-10 h-full bg-slate-100 opacity-85 w-full absolute items-center justify-center">
                    <HashLoader color="#263A5C" />
                  </div>}

                {/* Age and Gender */}
                <div className="flex justify-between w-[20rem] m-auto">
                  <div className="w-[9rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-sm shadow-sm">
                    <input
                      type="number"
                      placeholder="Age"
                      value={age}
                      onChange={e => setAge(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-[9rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-sm shadow-sm">
                    <select
                      value={gender}
                      onChange={e => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="Rather not say">Rather Not Say</option>
                    </select>
                  </div>
                </div>

                {/* Email */}
                <div className="col-span-6 flex justify-center m-[20px]">
                  <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-lg shadow-sm"
                    required
                  />
                </div>

                {/* Password */}
                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                  <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your Password"
                    className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                  <input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    type="text"
                    placeholder="Enter your phone number"
                    className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] p-3 text-xl shadow-sm"
                    required
                  />
                </div>

                {/* Terms of Service */}
                <div className="col-span-6 flex items-center">
                  <input type="checkbox" required />
                  <p className="text-sm text-gray-500 ml-[10px]">
                    I agree to the healthcare{" "}
                    <span className="text-[#407CE2]">Terms of Service</span> and{" "}
                    <span className="text-[#407CE2]">Privacy Policy</span>
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-[20rem] rounded-[20px] flex justify-center bg-[#263A5C] text-white m-auto mt-[30px]"
                  disabled={isLoading}
                >
                  <h2 className="m-3 font-semibold">
                    {isLoading ? "Signing Up..." : "Sign Up"}
                  </h2>
                </button>
              </form>
              {error &&
                <div
                  style={{
                    fontFamily: "Clash Display, sans-serif",
                    fontWeight: "500"
                  }}
                  className="text-red-500 text-center mt-4"
                >
                  {error}
                </div>}
              {/* Sign In Link */}
              <div className="flex justify-center mt-[20px]">
                <p className="text-lg text-[#221F1F]">
                  Already have an account?{" "}
                  <Link className="text-[#407CE2]" to="/signin">
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
    </section>
  );
}
