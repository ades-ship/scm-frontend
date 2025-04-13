import axios from 'axios'
import { Contact2Icon, HeartIcon } from 'lucide-react';
import React, { useEffect } from 'react'

const Home = () => {
  const [contacts, setContacts] = React.useState([]);
  const [favCount, setFavCount] = React.useState(0)

  useEffect(()=>{
    axios.get("http://localhost:8080/api/contact/users/"+JSON.parse(localStorage.getItem("userDTO"))?.userId).then(res=>{
      setContacts(res.data)
      const favorites = res.data.filter(contact=>contact.favorite == true)
      setFavCount(favorites.length)
    })
  }, [])

  return (
    <div className='p-20'>
      <div className='flex items-center gap-5'>
          <div className='bg-neutral-100 flex flex-col gap-3 p-5'>
              <div className='flex justify-center'>
                <Contact2Icon width={30} height={30}/>
              </div>
              <div className='text-3xl font-bold'>{contacts.length} Contacts</div>
              <div className='text-sm'>You have these contacts stored in your cloud</div>
          </div>
          <div className='bg-neutral-100 flex flex-col gap-3 p-5'>
              <div className='flex justify-center'>
                <HeartIcon width={30} height={30}/>
              </div>
              <div className='text-3xl font-bold'>{favCount} Favorites</div>
              <div className='text-sm'>You have these contacts stored in your cloud</div>
          </div>
         
      </div>
    </div>
  )
}

export default Home
