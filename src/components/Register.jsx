import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUserName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const navigate  = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()

    const userDTO = {username, email, password}
    
    // this is for localhost tomcar server 8080.
    // axios.post("http://localhost:8080/api/register/user", userDTO).then(res=>{
    //   if(res.data.username && res.data.email){
    //     navigate("/signin")
    //   }
    // })

    // this is for on render url
    axios.post("https://scm-latest-ws4h.onrender.com/api/register/user", userDTO).then(res=>{
      if(res.data.username && res.data.email){
        navigate("/signin")
      }
    })
  }

  return (
    <div className='flex justify-center items-center'>
      <form className='flex flex-col gap-5  items-start mt-28 w-[30vw]' onSubmit={handleSubmit}>
        <h1 className='text-lg font-medium'>Register New User</h1>
      <div className='flex flex-col items-start mt-5 w-full'>
          <label htmlFor="">Username</label>
          <input type="text" placeholder='Enter your username' name="username"  value={username} onChange={(e)=>setUserName(e.target.value)} className='px-3 py-2 outline-none border w-full' />
        </div>
      <div className='flex flex-col items-start w-full'>
          <label htmlFor="">Email</label>
          <input type="text" placeholder='Enter your email' name="email"  value={email} onChange={(e)=>setEmail(e.target.value)} className='px-3 py-2 outline-none border w-full' />
        </div>
      <div className='flex flex-col items-start w-full'>
          <label htmlFor="">Password</label>
          <input type="password" placeholder='Password' name="username"  value={password} onChange={(e)=>setPassword(e.target.value)} className='px-3 py-2 outline-none border w-full' />
        </div>
        <div className='flex justify-center items-center w-full my-2'>
        <button className='bg-black px-5 py-3 text-white' type='submit'>Register</button>
        </div>
      </form>
    </div>
  )
}

export default Register
