import { InboxIcon, PhoneCall, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
const Profile = () => {
  const navigate=useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userDTO"))?.userId;
  const [updateProfile, setUpdateProfile] = useState(false);
  const [success, setSuccess] = useState(false);
  const [username, setUserName] = React.useState(location?.state?.name || "");
  const [email, setEmail] = React.useState(location?.state?.email || "");
  const [phoneNumber, setPhoneNumber] = React.useState(
    location.state?.phone || ""
  );
  const [about, setAbout] = useState(location?.state?.about || "");
  const [address, setAddress] = React.useState(location?.state?.address || "");
  useEffect(() => {
    // axios
    //   .get("http://localhost:8080/api/user/" + userId)
    //   .then((res) => {
    //     console.log("user profile");
    //     console.log(res.data);
    //     setProfile(res.data);
    //     console.log("aboutttttttt-------", res.data.about);
    //     // console.log("state daata",profile)
    //   })
    //   .catch((err) => console.log(err));

    // on render url
    axios
      .get(`${BASE_URL}/user/${userId}`)
      .then((res) => {
        console.log("user profile");
        console.log(res.data);
        setUserName(res.data.username);
        setAbout(res.data.about);
        setEmail(res.data.email);
        setAddress(res.data.address);
        setPhoneNumber(res.data.phoneNumber);
        setProfile(res.data);
        console.log("aboutttttttt-------", res.data.about);
        // console.log("state daata",profile)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
  }, [success]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username,
      email,
      phoneNumber,
      address,
      about
    };
    axios.put(`${BASE_URL}/update/user/${userId}`, user).then((res) => {
      console.log("update profile data", res.data);
      setProfile(res.data);
      setSuccess(true);
      setUserName("");
      setEmail("");
      setAddress("");
      setPhoneNumber("");
      setAbout("");
      
    });
    setUpdateProfile(false);
    console.log("update profile successfully");
  };

  return (
    <>
      {!updateProfile ? (
        <>
          {location?.state ? (
            <div className="flex justify-center items-center mt-10">
              <div className="bg-neutral-100 p-10">
                <div className="flex flex-col items-center">
                  {location?.state?.image ? (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src={location?.state?.profile}
                      alt="profile_img"
                    />
                  ) : (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="profile_img"
                    />
                  )}

                  <h5 className="font-semibold mt-5">
                    {location?.state?.name}
                  </h5>
                </div>
                {/* contact info */}

                <div className="flex flex-col items-start my-5 gap-3">
                  <h6 className="font-medium">Contact Information</h6>
                  <div className="flex items-center gap-3">
                    <PhoneCall />
                    {location?.state?.phone}
                  </div>
                  <div className="flex items-center gap-3">
                    <InboxIcon />
                    {location?.state?.email}
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <UserPen />
                    {location?.state?.about}
                  </div> */}
                </div>
                {/* address info */}
                <div className="flex flex-col items-start my-5 gap-3">
                  <h6 className="font-medium">Address</h6>
                  <div>{location?.state?.address}</div>
                </div>
                {/* action buttons */}
                <div className="flex justify-center items-start my-5 gap-3">
                  <Link
                    to={`tel:+91${location?.state?.phone}`}
                    className="bg-black text-white px-5 py-2 flex gap-3 items-center"
                  >
                    <PhoneCall />
                    Call
                  </Link>
                  <Link
                    to={`mailto:${location?.state?.email}`}
                    className="bg-black text-white px-5 py-2 flex gap-3 items-center"
                  >
                    <InboxIcon />
                    Email
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-10">
              <div className="bg-neutral-100 p-10">
                <div className="flex flex-col items-center">
                  {profile?.profilePic ? (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src={profile?.profilePic}
                      alt="profile_img"
                    />
                  ) : (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="profile_img"
                    />
                  )}

                  <h5 className="font-semibold mt-5">{profile.username}</h5>
                </div>
                {/* contact info */}

                <div className="flex flex-col items-start my-5 gap-3">
                  <h6 className="font-medium">Contact Information</h6>
                  <div className="flex items-center gap-3">
                    <PhoneCall />
                    {profile?.phoneNumber}
                  </div>
                  <div className="flex items-center gap-3">
                    <InboxIcon />
                    {profile?.email}
                  </div>
                  <div className="flex items-center gap-3">
                    <UserPen />
                    {profile?.about}
                  </div>
                </div>
                {/* address info */}
                <div className="flex flex-col items-start my-5 gap-3">
                  <h6 className="font-medium">Address</h6>
                  <div>{profile.address}</div>
                </div>
                {/* action buttons */}
                <div className="flex justify-center items-start my-5 gap-3">
                  <Link
                    to={`tel:+91${profile.phoneNumber}`}
                    className="bg-black text-white px-5 py-2 flex gap-3 items-center"
                  >
                    <PhoneCall />
                    Call
                  </Link>
                  <Link
                    to={`mailto:${profile.email}`}
                    className="bg-black text-white px-5 py-2 flex gap-3 items-center"
                  >
                    <InboxIcon />
                    Email
                  </Link>
                  <button
                    onClick={() => {
                      setUpdateProfile(!updateProfile);
                     
                    }}
                    className="bg-black text-white px-5 py-2 flex gap-3 items-center"
                  >
                    Update profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <div>
            {location?.state?.id ? (
              <div>
                <h1 className="text-xl font-bold text-start">Update Profile</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-xl font-bold text-start">Update Profile</h1>
              </div>
            )}
            {success && (
              <p className="bg-green-800 p-3 text-white">
                Profile updated successfully!
              </p>
            )}

            <form className="mt-10" onSubmit={handleSubmit}>
              <div className="flex flex-col items-start mb-5">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  name="username"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="px-3 py-2 outline-none border w-full"
                />
              </div>
              <div className="flex flex-col items-start mb-5">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  placeholder="Enter email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 outline-none border w-full"
                />
              </div>
              <div className="flex flex-col items-start mb-5">
                <label htmlFor="">PhoneNumber</label>
                <input
                  type="text"
                  placeholder="Enter phone number"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="px-3 py-2 outline-none border w-full"
                />
              </div>
              <div className="flex flex-col items-start mb-5">
                <label htmlFor="">About</label>
                <input
                  type="text"
                  placeholder="write something about yourself....."
                  name="about"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="px-3 py-2 outline-none border w-full"
                />
              </div>

              <div className="flex flex-col items-start mb-5">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="px-3 py-2 outline-none border w-full"
                />
              </div>

              {location?.state?.id ? (
                <button className="bg-black text-white px-5 py-3">
                  Update profile
                </button>
              ) : (
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-black text-white px-5 py-3"
                >
                  Update Profile
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

// // chatgpt
// import { InboxIcon, PhoneCall, UserPen } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { BASE_URL } from "../config/api";
// import axios from "axios";

// const Profile = () => {
//   const location = useLocation();
//   const [profile, setProfile] = useState({});
//   const userId = JSON.parse(localStorage.getItem("userDTO"))?.userId;

//   // 🧠 Determine if it's a contact being passed via state
//   const isContact = location?.state?.email && location?.state?.phone;
//   console.log("profile ",isContact);
//   useEffect(() => {
//     // If viewing contact, just use state
//     if (isContact) {
//       setProfile(location.state);
//     } else if (userId) {
//       // If it's user profile, fetch from API
//       axios
//         .get(`https://scm-latest-ws4h.onrender.com/api/user/${userId}`)
//         .then((res) => {
//           console.log("User profile fetched:", res.data);
//           setProfile(res.data);
//         })
//         .catch((err) => console.log("Profile error:", err));
//     }
//   }, [userId, location.state, isContact]);

//   return (
//     <>
//       {profile ? (
//         <div className="flex justify-center items-center mt-10">
//           <div className="bg-neutral-100 p-10 rounded-2xl shadow-lg max-w-xl w-full">
//             <div className="flex flex-col items-center">
//               <img
//                 className="w-24 h-24 rounded-full object-cover"
//                 src={
//                   profile?.image ||
//                   "https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
//                 }
//                 alt="profile_img"
//               />

//               <h5 className="font-semibold mt-5">{profile?.username || profile?.name}</h5>
//             </div>

//             {/* Contact Info */}
//             <div className="flex flex-col items-start my-5 gap-3">
//               <h6 className="font-medium">Contact Information</h6>
//               {profile?.phoneNumber || profile?.phone ? (
//                 <div className="flex items-center gap-3">
//                   <PhoneCall />
//                   {profile.phoneNumber || profile.phone}
//                 </div>
//               ) : null}
//               {profile?.email && (
//                 <div className="flex items-center gap-3">
//                   <InboxIcon />
//                   {profile.email}
//                 </div>
//               )}
//               {profile?.about && (
//                 <div className="flex items-center gap-3">
//                   <UserPen />
//                   {profile.about}
//                 </div>
//               )}
//             </div>

//             {/* Address */}
//             {profile?.address && (
//               <div className="flex flex-col items-start my-5 gap-3">
//                 <h6 className="font-medium">Address</h6>
//                 <div>{profile.address}</div>
//               </div>
//             )}

//             {/* Action Buttons */}
//             <div className="flex justify-center items-start my-5 gap-3">
//               {(profile.phoneNumber || profile.phone) && (
//                 <Link
//                   to={`tel:+91${profile.phoneNumber || profile.phone}`}
//                   className="bg-black text-white px-5 py-2 flex gap-3 items-center rounded-lg"
//                 >
//                   <PhoneCall />
//                   Call
//                 </Link>
//               )}
//               {profile.email && (
//                 <Link
//                   to={`mailto:${profile.email}`}
//                   className="bg-black text-white px-5 py-2 flex gap-3 items-center rounded-lg"
//                 >
//                   <InboxIcon />
//                   Email
//                 </Link>
//               )}
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-screen">
//           <div>First login to access profile</div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Profile;
