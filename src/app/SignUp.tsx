import React, {useState, FormEvent} from "react"
import { Link } from "react-router-dom"
import Onboard from "./components/Onboard"
import google from '../images/google.png'

export default function SignUp(){                     
  const [name, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const [data, setData] = useState('');

  // const [showPassword, setShowPassword] = useState(false);
  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // }
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(name, age, gender, password, phone, email);
    
  
    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setData('Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('https://senexcare.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           name,
          email,
          number:phone,
           gender,
           age,
          password,
      }),
      });
      const data = await response.json()
      console.log(data)
    setData(data);
    if (response.ok) {
      console.log('success');
      
      setIsLoading(false);
    } else if(response.status === 401) {
      setData(data);
      setIsLoading(false);
    }else if (response.status === 404){
      setData(data);
      setIsLoading(false);
    }else{
      setData('Could not create account');
      setIsLoading(false);
    }
  }
    catch (error) {
      console.log("Topins' Error:", error);
      setIsLoading(false);
    }
  }

    return <section className="bg-white ">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12 ">
          <main className="flex items-center justify-center px-8 py-10 sm:px-15 lg:col-span-6 lg:px-16 lg:py-12 xl:col-span-6  ">
            <div className=" w-fit lg:max-w-3xl border-[#B1B5B9] border-[1px] rounded-[6px] p-[40px]">
              <div className="w-full ">
                <h1 style={{ fontFamily: "Clash Display, sans-serif" }} className=" text-2xl font-bold text-[#263A5C] sm:text-3xl md:text-4xl text-center">
                  Sign Up
                </h1>
                <form action="#" onSubmit={handleSubmit} className="mt-8 ">
                  <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                    <input value={name} onChange={e => setFirstName(e.target.value)} type="text" id="Name" placeholder="Enter your Name" name="Name" className="w-[20rem] bg-rgba-34-31-31-10 border-[#B1B5B9] border-[1px] rounded-[6px] outline-none  p-3  text-xl shadow-sm" />
                  </div>
                  <div className="flex justify-between w-[20rem] m-auto">
                    <div className="col-span-6 sm:col-span-3   border-[#B1B5B9] border-[1px] rounded-[6px] outline-none  p-3  text-sm shadow-s w-[9rem]">
                      <input type="number" className="outline-none w-full" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
                    </div>
                    <div className="col-span-6 sm:col-span-3   border-[#B1B5B9] border-[1px] rounded-[6px] outline-none  p-3  text-sm shadow-s w-[9rem]">
                      <select className="outline-none " id="dropdown" name="dropdown" value={gender} onChange={e => setGender(e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="M" className="text-[#B1B5B9] outline-none">
                          Male
                        </option>
                        <option value="F" className="text-[#B1B5B9] outline-none">
                          Female
                        </option>
                        <option value="Rather not say" className="text-[#B1B5B9] outline-none">
                          Rather Not Say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-6 flex justify-center m-[20px]">
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" id="Email" name="email" placeholder="Enter your email" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px]  p-3 outline-none  text-lg shadow-sm" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px] ">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" id="Password" placeholder="Enter your Password" name="password" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] outline-none  p-3  text-xl shadow-sm" />
                  </div>

                  <div className="col-span-6 sm:col-span-3 flex justify-center m-[20px]">
                    <input value={phone} onChange={e => setPhone(e.target.value)} type="text" id="phone" placeholder="Enter your phone number" name="password_confirmation" className="w-[20rem] border-[#B1B5B9] border-[1px] rounded-[6px] bg-rgba-34-31-31-40 p-3 outline-none text-xl shadow-sm" />
                  </div>
                  <div className="col-span-6 flex">
                    <input type="checkbox" name="" id="" />
                    <p className="text-sm text-gray-500 ml-[10px]">
                      I agree to the healthcare
                      <span className="text-[#407CE2]">
                        {" "}Terms of Service{" "}
                      </span>
                      and
                      <span className="text-[#407CE2]">
                        {" "}Privacy Policy
                      </span>
                    </p>
                  </div>
                <button type="submit" className="w-[20rem] rounded-[20px] flex text-center mt-[30px] bg-[#263A5C] border border-solid justify-center text-white m-auto">
                  <h2 className="m-3 font-semibold">Sign Up</h2>
                </button>
                </form>
                <div className=" w-full flex justify-center mt-[30px]" />
              </div>
              <div className="flex  justify-center mt-[20px] ">
                <p className="text-lg text-[#221F1F]">
                  Already have an account?
                  <Link className="text-[#407CE2]" to="/signin">
                    {" "}Sign In
                  </Link>
                </p>
              </div>
            </div>
          </main>
          <aside className="relative  lg:col-span-6 lg:h-full hidden lg:block h-[100vh] bg-[#263A5C]">
            {/* <div className=""> */}
            <Onboard />
            {/* </div> */}
          </aside>
        </div>
      </section>;
}