import { InboxIcon, PhoneCall, UserPen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BASE_URL } from '../config/api'
import axios from 'axios'
const Profile = () => {
  const location = useLocation();
  const [profile,setProfile]=useState([]);
  const userId=JSON.parse(localStorage.getItem("userDTO"))?.userId;
  console.log(profile)
  useEffect(()=>{
     axios.get(`${BASE_URL}/user/${userId}`).then(res=>{
        console.log("user profile")
         console.log(res.data);
   setProfile(res.data);
   console.log("aboutttttttt-------",res.data.about)
        // console.log("state daata",profile)
     }).catch(err =>console.log(err))
      
  },[userId])


  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='bg-neutral-100 p-10'>
        <div className='flex flex-col items-center'>
{
  location?.state?.image ? 
  <img className='w-24 h-24 rounded-full object-cover ' src={location.state.image} alt="profile_img" />
  : <img className='w-24 h-24 rounded-full object-cover ' src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="profile_img" />
}


          <h5 className='font-semibold mt-5'>{profile.username}</h5>
        </div>
        {/* contact info */}
        
        <div className='flex flex-col items-start my-5 gap-3'>
          <h6 className='font-medium'>Contact Information</h6>
            <div className='flex items-center gap-3'><PhoneCall/>{profile?.phoneNumber}</div>
            <div className='flex items-center gap-3'><InboxIcon/>{profile?.email}</div>
            <div className='flex items-center gap-3'><UserPen/>{profile?.about}</div>
        </div>
        {/* address info */}
        <div className='flex flex-col items-start my-5 gap-3'>
          <h6 className='font-medium'>Address</h6>
          <div>{profile.address}</div>
        </div>
        {/* action buttons */}
        <div className='flex justify-center items-start my-5 gap-3'>
          <Link to={`tel:+91${profile.phoneNumber}`} className='bg-black text-white px-5 py-2 flex gap-3 items-center'><PhoneCall/>Call</Link>
          <Link to={`mailto:${profile.email}`} className='bg-black text-white px-5 py-2 flex gap-3 items-center'><InboxIcon/>Email</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
