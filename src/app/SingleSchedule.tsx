import separator from '../images/Separator.svg';
import { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
const tosinToken = localStorage.getItem("token");
const token = JSON.parse(tosinToken as string); // type assertion

export default function SingleSched () {
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [_date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(type, category, title, _date, time);
    

    fetch('https://senexcare.onrender.com/user/scheduleNew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type, category, title, _date, time,
      }),
    }
    )
    .then(res => {
      res.json();
      if (res.ok) {
        console.log('succcess');
      } else {
        console.log('Wahala Wahala');
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Errrrrroooooorr', error);      
    });
  }

  return (
    <>
      <section>
        <div className="flex flex-col items-center">
          <p className="text-center font-pops font-medium"><span className="font-bold">1</span>Schedule Information</p>
          <img src={separator} alt="" />
        </div>
        <h1 className="text-[#263A5C] font-pops my-4 font-bold text-center" >Schedule an Appointment</h1>
        <form action="#" onSubmit={handleSubmit} className="flex flex-col my-4 font-pops">
          <label className="text-black" htmlFor="Type">Type</label>
          <input 
            placeholder="Type" 
            value={type}
            onChange={(e)=>setType(e.target.value)}
            className="border-gray-400 border-[1px] rounded w-3/4 mb-2 pt-1 pl-2" id="Type" type="text"
          />
          <label className="text-black" htmlFor="category">Category</label>
          <input 
            placeholder="Category" 
            className="border-gray-400 border-[1px] rounded w-3/4 mb-2 pt-1 pl-2" id="category" type="text" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <label className="text-black" htmlFor="title">Title</label>
          <input 
            placeholder="Title" 
            className="border-gray-400 border-[1px] rounded w-3/4 mb-2 pt-1 pl-2" id="title" type="text" 
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />
          <label className="text-black" htmlFor="date">Choose a Starting Date</label>
          <input 
            className="border-gray-400 border-[1px] rounded w-3/4 mb-2 pt-1 pl-2" id="date" 
            type="date" 
            value={_date}
            onChange={(e)=>setDate(e.target.value)}
          />
          <label className="text-black" htmlFor="time">Time</label>
          <input 
            placeholder="Time" 
            value={time}
            onChange={(e)=>setTime(e.target.value)}
            className="border-gray-400 border-[1px] rounded w-3/4 mb-2 pt-1 pl-2" id="time" type="time" 
          />
          <button type='submit' className="rounded self-center px-4 py-1 text-white font-pops my-4 bg-[#263A5C]">Finish</button>
        </form>
      </section>
    </>
  )
}