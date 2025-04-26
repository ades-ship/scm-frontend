import React from 'react'
import { DeleteIcon, Edit2Icon, Expand, HeartIcon, InboxIcon, PhoneCallIcon } from 'lucide-react';
import { Link } from "react-router-dom"
import axios from 'axios';
import { BASE_URL } from '../config/api';

const GridView = ({ contacts, getContacts }) => {


    const handleFavorite = async (contactDTO) => {
        // axios.put("http://localhost:8080/api/contact/update/" + contactDTO.id, { favorite: !contactDTO.favorite }).then(res => getContacts()).catch(err => console.log(err))

        // on render api call
       await axios.put(`${BASE_URL}/contact/update/` + contactDTO.id, { favorite: !contactDTO.favorite }).then(res => getContacts()).catch(err => console.log(err))
    }
    const handleDelete = async (contactId) => {
        // axios.delete("http://localhost:8080/api/contact/delete/" + contactId).then(res => getContacts()).catch(err => console.log(err))

        // ON render api call;
      await  axios.delete(`${BASE_URL}/contact/delete/`+ contactId).then(res => getContacts()).catch(err => console.log(err))
    }


    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                {
                    contacts.map(contact => (
                        <div key={contact.id} className='p-5 flex flex-col gap-7 bg-neutral-100'>
                            <div className='flex justify-center items-center'>
                                {
                                    contact.image ?
                                        <img className='w-24 h-24 rounded-full object-cover ' src={contact.image} alt="profile_img" />
                                        : <img className='w-24 h-24 rounded-full object-cover ' src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="profile_img" />
                                }
                            </div>
                            <div className='flex justify-center  flex-col gap-3'>
                                <div className='font-medium text-lg'>{contact.name}</div>
                                <div className='flex items-center gap-3 text-start'><InboxIcon/>{contact.email}</div>
                                <div className='flex items-center gap-3 text-start'><PhoneCallIcon/>{contact.phone}</div>
                            </div>
                            {/* action buttons */}
                            <div className='flex justify-center items-center gap-3'>
                                {
                                    contact.favorite ?
                                        <button onClick={() => handleFavorite(contact)} className='text-pink-600'><HeartIcon /></button>
                                        : <button onClick={() => handleFavorite(contact)}><HeartIcon /></button>
                                }
                                <Link to="/add-contact" state={contact}><Edit2Icon /></Link>
                                <Link to="/profile" state={contact}><Expand /></Link>
                                <button onClick={() => handleDelete(contact.id)} ><DeleteIcon /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default GridView
