import { InboxIcon, PhoneCall, PhoneCallIcon } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Profile = () => {
  const location = useLocation();
  return (
    <div className='flex justify-center items-center mt-10'>
      <div className='bg-neutral-100 p-10'>
        <div className='flex flex-col items-center'>
{
  location?.state?.image ? 
  <img className='w-24 h-24 rounded-full object-cover ' src={location.state.image} alt="profile_img" />
  : <img className='w-24 h-24 rounded-full object-cover ' src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="profile_img" />
}

          <h5 className='font-semibold mt-5'>{location?.state?.name ? location?.state?.name : "John Doe"}</h5>
        </div>
        {/* contact info */}
        <div className='flex flex-col items-start my-5 gap-3'>
          <h6 className='font-medium'>Contact Information</h6>
            <div className='flex items-center gap-3'><PhoneCall/>{location?.state?.phone ? location?.state?.phone : "9876543210"}</div>
          <div className='flex items-center gap-3'><InboxIcon/>{location?.state?.email ? location?.state?.email : "johndoe@gmail.com"}</div>
        </div>
        {/* address info */}
        <div className='flex flex-col items-start my-5 gap-3'>
          <h6 className='font-medium'>Address</h6>
          <div>{location?.state?.address ? location?.state?.address : "7th Main Rd, Chinnapahali, Bangalore"}</div>
        </div>
        {/* action buttons */}
        <div className='flex justify-center items-start my-5 gap-3'>
          <Link to={`tel:+91${location?.state?.phone}`} className='bg-black text-white px-5 py-2 flex gap-3 items-center'><PhoneCall/>Call</Link>
          <Link to={`mailto:${location?.state?.email}`} className='bg-black text-white px-5 py-2 flex gap-3 items-center'><InboxIcon/>Email</Link>
        </div>
      </div>
    </div>
  )
}

export default Profile
