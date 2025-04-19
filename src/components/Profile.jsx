import { InboxIcon, PhoneCall, UserPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BASE_URL } from "../config/api";
import axios from "axios";
const Profile = () => {
  const location = useLocation();
  const [profile, setProfile] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userDTO"))?.userId;

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
        setProfile(res.data);
        console.log("aboutttttttt-------", res.data.about);
        // console.log("state daata",profile)
      })
      .catch((err) => console.log(err));
  }, [userId]);

  return (
    <>
      {userId ? (
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
                    to={`tel:+91${location?.state?.phoneNumber}`}
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
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-start h-screen">
          <h1 className="text-3xl">first login to access profile</h1>
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
