import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signin = () => {
  
  const navigate = useNavigate();

  const [username, setUserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors,setErrors]=React.useState({});
  const [serverError,setServerError]=React.useState("");

  const validateForm=()=>{

    const newErrors={};
    let isValid=true;
    if(!username) {
      newErrors.username="Username is required";
      // console.log(newErrors.username)
      isValid=false;
    }
    
     if(!password) {
      newErrors.password="Password is required";
      isValid=false;
    } 
    setErrors(newErrors);
    return isValid;
  }

  const handleSubmit = (e) => {

    e.preventDefault();
    // const userDTO = {username, password};
    // axios.post("http://localhost:8080/api/authenticate/user", userDTO).then(res=>{
    //   localStorage.setItem("userDTO", JSON.stringify(res.data))
    //   navigate("/")
    // })
    
    /* this is for on render url */
    const userDTO = {username, password};
    const result=validateForm();
   
    if(result) {
      
      axios.post("https://scm-latest-ws4h.onrender.com/api/authenticate/user", userDTO).then(res=>{
        localStorage.setItem("userDTO", JSON.stringify(res.data))
        navigate("/")
      }).catch(err=>{
        console.log("logined failed",err);
        setServerError("Invalid username or password")
      })
    }
    // console.log("error-------",errors); 
  }
  // console.log("erorr--------",errors);

  useState(()=>{
    console.log("first time")
    if(serverError){
      console.log("error timeout started");
      const timer=setTimeout(() => {
        setServerError("");
      }, 1000);

      return ()=>clearTimeout(timer);
    }
  },[serverError])

  return (
    <div className='flex justify-center items-center flex-col'>
     {
      serverError && (<div className='px-5 py-2 bg-red-500 gap-3 bordered mt-5'>{serverError}</div>)
    }
      <form className='flex flex-col gap-5  items-start mt-28 w-[30vw]' onSubmit={handleSubmit}>
        <h1 className='text-lg font-medium'>Hey 👋, welcome back</h1>
      <div className='flex flex-col items-start mt-5 w-full'>
          <label htmlFor="">Username or Email</label>
          <input type="text" placeholder='Your username or email' name="username"  value={username} onChange={(e)=>setUserName(e.target.value)} className='px-3 py-2 outline-none border w-full' />
          {
            errors.username && (<p className='bg-red-500 text-red mt-1 text-sm'>{errors.username}</p>)
          }
        </div>
      <div className='flex flex-col items-start w-full'>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='Password' name="username"  value={password} onChange={(e)=>setPassword(e.target.value)} className='px-3 py-2 outline-none border w-full' />
          {
            errors.password && (<p className='mt-1 text-sm text-red bg-red-500'>{errors.password}</p>)
          }
          <div className='flex items-center gap-1 text-sm mt-3'>
            New to platform? <Link to="/register" className='text-blue-700'>register</Link> yourself first
          </div>
        </div>
        <div className='flex justify-center items-center gap-3 w-full my-2'>
        <button className='bg-black px-5 py-3 text-white' type='submit'>Sign in</button>
        
       
        </div>
     
      </form>
      </div>
   
  )
}

export default Signin
