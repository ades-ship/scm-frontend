import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BASE_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
const AddContact = () => {
  const location = useLocation();
  const navigate=useNavigate();
  const [user,setUser]=useState({});
  const [name, setName] = React.useState(location?.state?.name || "");
  const [email, setEmail] = React.useState(location?.state?.email || "");
  const [phone, setPhone] = React.useState(location.state?.phone || "");
  const [address, setAddress] = React.useState(location?.state?.address || "");
  const [company, setCompany] = React.useState(location?.state?.company || "");

  const userId=JSON.parse(localStorage.getItem("userDTO")).userId;
  const [contactType, setContactType] = React.useState(
    location?.state?.contactType || "PERSONAL"
  );
  const [contactAdded, setContactAdded] = React.useState(false);
  const [contactUpdated, setContactUpdated] = React.useState(false);

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem("userDTO")));
  },[]);
  // console.log("user state",user)

  useEffect(() => {
    setTimeout(() => {
      setContactAdded(false);
      setContactUpdated(false);
    }, 10000);
  }, [contactAdded, contactUpdated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactDTO = {
      name,
      email,
      phone,
      address,
      company,
      contactType,
    };
    // if (location?.state?.id) {
    //   // if there is data then update data
    //   axios
    //     .put(
    //       "http://localhost:8080/api/contact/update/" + location.state.id,
    //       contactDTO
    //     )
    //     .then((res) => {
    //       if (res.data.userId) setContactUpdated(true);
    //       else setContactUpdated(false);
    //     })
    //     .catch((err) => console.log(err));
    // } 
    

    // on render  api url
    if (location?.state?.id) {
      // if there is data then update data
      console.log("update contact");
     await axios.put(`${BASE_URL}/contact/update/` + location?.state?.id,
          contactDTO
        ).then((res) => {
          if (res.data.userId) setContactUpdated(true);

          else setContactUpdated(false);
          navigate("/view-contacts");
        })
        .catch((err) => console.log(err));

    }
    
    else {
      // else submit new data

      // axios.post("http://localhost:8080/api/contact/register/" + JSON.parse(localStorage.getItem("userDTO")).userId, contactDTO).then(res=>{
      //   if(res.data.userId)setContactAdded(true)
      //     else setContactAdded(false)
      // }).catch(err=>console.log(err))

      // on render api  url to register 
     await axios
        .post(`${BASE_URL}/contact/register/${user.userId}`, contactDTO)
        .then((res) => {
        
          if (res.data) {

            setContactAdded(true);
            setName("");
              setAddress("");
              setEmail("");
              setPhone("");
              setCompany("");
          } 
          else setContactAdded(false);
          navigate('/view-contacts');
        })
        .catch((err) => console.log(err));
    }
    
  };
  return (
    <div className="flex justify-center items-center">
      <div>
        {location?.state?.id ? (
          <div>
            <h1 className="text-xl font-bold text-start">Update Contact</h1>
            <p>Start updating your favorite contact to save on cloud</p>
          </div>
        ) : (
          <div>
            <h1 className="text-xl font-bold text-start">New Contact</h1>
            <p>Start adding your favorite contact to save on cloud</p>
          </div>
        )}
        {contactAdded && (
          <p className="bg-green-800 p-3 text-white">
            Contact added succesfully!
          </p>
        )}
        {contactUpdated && (
          <p className="bg-green-800 p-3 text-white">
            Contact updated succesfully!
          </p>
        )}
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-5">
            <label htmlFor="">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label htmlFor="">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <div className="flex flex-col items-start mb-5">
            <label htmlFor="">Company</label>
            <input
              type="text"
              placeholder="Enter company"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="px-3 py-2 outline-none border w-full"
            />
          </div>
          <div className="flex flex-col items-start mb-5">
            <label htmlFor="">Contact Type</label>
            <select
              name="contactType"
              id=""
              onChange={(e) => setContactType(e.target.value)}
              value={contactType}
              className="w-full p-3 border outline-none"
            >
              <option value="PERSONAL" defaultValue>
                Personal
              </option>
              <option value="WORK">Work</option>
              <option value="BUSINESS">Business</option>
              <option value="OTHER">Other</option>
            </select>
          </div>
          {location?.state?.id ? (
            <button className="bg-black text-white px-5 py-3">
              Update Contact
            </button>
          ) : (
            <button className="bg-black text-white px-5 py-3">
              Add Contact
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddContact;
