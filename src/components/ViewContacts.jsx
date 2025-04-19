import React, { useEffect } from "react";
import axios from "axios";
import { Grid2X2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import ListView from "./ListView";
import GridView from "./GridView";
import * as XLSX from "xlsx";
import { BASE_URL } from "../config/api";

const ViewContacts = ({favourite, setFavourite}) => {
  const [query, setQuery] = React.useState("");
  const [gridView, setGridView] = React.useState(false);
  const [contacts, setContacts] = React.useState([]);
  const [filteredContacts, setFilteredContacts] = React.useState([]);
const userId=JSON.parse(localStorage.getItem("userDTO")).userId;
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

  const handleChange = (value) => {
    setQuery(value);
    axios
      .get(
        `http://localhost:8080/api/contact/${
          JSON.parse(localStorage.getItem("userDTO")).userId
        }?query=${value}`
      )
      .then((res) => setFilteredContacts(res.data));
  };

  const removeUnwantedFields = (data) => {
    return data.map(({ id, userId, ...rest }) => rest); // Removes both 'id' and 'userId'
  };

  const handleExportData = () => {
    const filteredData = removeUnwantedFields(contacts);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert the data to a worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Contacts");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "contacts.xlsx");
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
                      <img src={contact.img} alt="" />
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
        <h5 className="font-semibold text-lg">Saved Contacts</h5>
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
      {gridView ? (
        <GridView contacts={contacts} getContacts={getContacts} />
      ) : (
        <ListView contacts={contacts} getContacts={getContacts} favourite={favourite}
        setFavourite={setFavourite}
         />
      )}
    </div>
  );
};

export default ViewContacts;
