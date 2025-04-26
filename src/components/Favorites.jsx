import React, { useEffect } from "react";
import axios from "axios";
import {
  DeleteIcon,
  Edit2Icon,
  Expand,
  Grid2X2Icon,
  HeartIcon,
  InboxIcon,
  PhoneCallIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import { BASE_URL } from "../config/api";

const Favorites = ({ favourite, setFavourite }) => {
  const [query, setQuery] = React.useState("");
  const [gridView, setGridView] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [filteredContacts, setFilteredContacts] = React.useState(favourite);
  const userId = JSON.parse(localStorage.getItem("userDTO")).userId;
  console.log(favourite, "22");

  const handleFavorite = async (contactDTO) => {
    const updatedContact = {
      ...contactDTO,
      favorite: !contactDTO.favorite,
    };

    await axios
      .put(`${BASE_URL}/contact/update/${contactDTO.id}`, {
        favorite: updatedContact.favorite,
      })
      .then((res) => {
        // update favourite list on frontend
        if (updatedContact.favorite) {
          // add to favourites
          setFavourite([...favourite, updatedContact]);
        } else {
          // remove from favourites
          setFavourite(favourite.filter((c) => c.id !== updatedContact.id));
        }

        getContacts();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = async (contactId) => {
    // axios
    //   .delete("http://localhost:8080/api/contact/delete/" + contactId)
    //   .then((res) => getContacts())
    //   .catch((err) => console.log(err));

    // on render delete contact api.

    await axios
      .delete(`${BASE_URL}/contact/delete/` + contactId)
      .then((res) => getContacts())
      .catch((err) => console.log(err));
  };

  const getContacts = () => {
    // axios
    //   .get(
    //     "http://localhost:8080/api/contact/users/" +
    //       JSON.parse(localStorage.getItem("userDTO")).userId
    //   )
    //   .then((res) => setContacts(res.data))
    //   .catch((err) => console.log(err));

    // on render url
    axios
      .get(`${BASE_URL}/contact/users/${userId}`)
      .then((res) => setContacts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getContacts();
  }, []);

  console.log("all contacts in fav are", contacts);


  const handleChange = async (value) => {
    setQuery(value);
    // await axios
    //   .get(
    //     `http://localhost:8080/api/contact/${
    //       JSON.parse(localStorage.getItem("userDTO")).userId
    //     }?query=${value}`
    //   )
    //   .then((res) => setFilteredContacts(res.data));

    await axios
      .get(
        `${BASE_URL}/contact/${
          JSON.parse(localStorage.getItem("userDTO")).userId
        }?query=${value}`
      )
      .then((res) => setFilteredContacts(res.data));
  };

  const removeUnwantedFields = (data) => {
    return data.map(({ id, userId, ...rest }) => rest); // Removes both 'id' and 'userId'
  };

  const handleExportData = () => {
    const filteredData = removeUnwantedFields(filteredContacts);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "FavouriteContacts");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "favouriteContacts.xlsx");
  };

  return (
    <div className="mt-10 px-[10vw]">
      {/* search bar */}
      <form className="flex items-center gap-2 relative">
        <input
          type="text"
          className="w-full border px-3 py-3 outline-none"
          placeholder="Search for contacts"
          onChange={(e) => handleChange(e.target.value)}
        />
        {/* showing filtered contacts */}
        {filteredContacts.length > 0 && query.length > 0 ? (
          <div className="absolute top-14 bg-neutral-200 text-black w-full shadow-md">
            <div className="lex flex-col gap-3">
              {filteredContacts.map((contact) => (
                <Link
                  to="/profile"
                  state={contact}
                  className="flex items-center justify-start gap-10 hover:bg-neutral-300 p-3"
                  key={contact.id}
                >
                  <div>
                    {contact.img ? (
                      <img src={favourite.img} alt="" />
                    ) : (
                      <img
                        className="w-12 h-12 rounded-full object-cover "
                        src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                        alt=""
                      />
                    )}
                  </div>
                  <div>
                    <h6 className="font-medium">{contact.name}</h6>
                  </div>
                  <div>
                    <span>{contact.phone}</span>
                  </div>
                  <div>
                    <span>{contact.email}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : filteredContacts.length <= 0 && query.length > 0 ? (
          <div className="absolute top-14 bg-neutral-200 w-full p-10 italic text-neutral-600">
            No results found
          </div>
        ) : null}
      </form>
      {/* side buttons */}
      <div className="flex justify-between my-10 items-center gap-2">
        <h5 className="font-semibold text-lg">Favourite Contacts</h5>
        <div className="flex items-center gap-2">
          <button
            className="bg-black text-white py-2 px-3"
            onClick={handleExportData}
          >
            Export
          </button>
          <button
            className="bg-neutral-200  py-2 px-3 flex items-center gap-2"
            onClick={() => setGridView(!gridView)}
          >
            View <Grid2X2Icon />
          </button>
        </div>
      </div>
      {/* see all the favourite contact in list view */}
      {contacts && 
        contacts.map(
          (contact) =>
            contact.favorite && (
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
            )
        )}
      

{/* grid view */}
      {gridView ? (
        contacts &&
        contacts.map(
          (contact) =>
            contact.favorite && (
              <div
                key={contact.id}
                className="p-5 flex flex-col gap-7 bg-neutral-100"
              >
                <div className="flex justify-center items-center">
                  {contact.image ? (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src={contact.image}
                      alt="profile_img"
                    />
                  ) : (
                    <img
                      className="w-24 h-24 rounded-full object-cover "
                      src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                      alt="profile_img"
                    />
                  )}
                </div>
                <div className="flex justify-center  flex-col gap-3">
                  <div className="font-medium text-lg">{contact.name}</div>
                  <div className="flex items-center gap-3 text-start">
                    <InboxIcon/>
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-3 text-start">
                    <PhoneCallIcon/>
                    {contact.phone}
                  </div>
                </div>
                {/* action buttons */}
                <div className="flex justify-center items-center gap-3">
                  {contact.favorite ? (
                    <button
                      onClick={() => handleFavorite(contact)}
                      className="text-pink-600"
                    >
                      <HeartIcon/>
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
            )
        )
      ): null
        
      
      }
    </div>
  );
};

export default Favorites;



