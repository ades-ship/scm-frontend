import React from "react";
import { CloudFog, DeleteIcon, Edit2Icon, Expand, HeartIcon } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
const ListView = ({ contacts, getContacts,favourite,setFavourite }) => {
  const handleFavorite = (contactDTO) => {
  const obj={
    name:contactDTO.name,
    email:contactDTO.email,
    phone:contactDTO.phone,
  }

    // axios
    //   .put("http://localhost:8080/api/contact/update/" + contactDTO.id, {
    //     favorite: !contactDTO.favorite,
    //   })
    //   .then((res) => {
    //         // setFavourite(obj);
    //     getContacts();
    //   })
    //   .catch((err) => console.log(err));

// on render
axios
      .put(`${BASE_URL}/contact/update/${contactDTO.id}`, {
        favorite: !contactDTO.favorite,
      })
      .then((res) => {
            // setFavourite(obj);
        getContacts();
      })
      .catch((err) => console.log(err));

  };
  const handleDelete = (contactId) => {
    // axios
    //   .delete("http://localhost:8080/api/contact/delete/" + contactId)
    //   .then((res) => getContacts())
    //   .catch((err) => console.log(err));


      axios
      .delete(`{${BASE_URL}/contact/delete}/`+contactId)
      .then((res) => getContacts())
      .catch((err) => console.log(err));
  };
   console.log("favourite are",favourite);
  return (
    <div>
      {/* show contact list */}
      {contacts ? (
        <div className="">
          <div className="flex justify-between items-center gap-2">
            <h6 className="bg-neutral-100 p-2 font-medium w-full">
              User Image
            </h6>
            <h6 className="bg-neutral-100 p-2 font-medium w-full">Name</h6>
            <h6 className="bg-neutral-100 p-2 font-medium w-full">Email</h6>
            <h6 className="bg-neutral-100 p-2 font-medium w-full">Phone</h6>
            <h6 className="bg-neutral-100 p-2 font-medium w-full">Actions</h6>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex justify-between items-center hover:bg-neutral-100 p-2 transition-all duration-500"
              >
                <img
                  className="w-12 h-12 rounded-full object-cover "
                  src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt=""
                />
                <span>{contact.name}</span>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
                <div className="flex items-center gap-3">
                  {contact.favorite ? (
                    <button
                      onClick={() => handleFavorite(contact)}
                      className="text-pink-600"
                    >
                      <HeartIcon />
                    </button>
                  ) : (
                    <button onClick={() => handleFavorite(contact)}>
                      <HeartIcon />
                    </button>
                  )}
                  <Link to="/add-contact" state={contact}>
                    <Edit2Icon />
                  </Link>
                  <Link to="/profile" state={contact}>
                    <Expand />
                  </Link>
                  <button onClick={() => handleDelete(contact.id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>To see contacts, first add contact!</div>
      )}
    </div>
  );
};

export default ListView;
