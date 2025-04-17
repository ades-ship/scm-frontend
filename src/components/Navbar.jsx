import { MenuIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [showMenuBar, setShowMenuBar] = React.useState(false);
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userDTO")));
  }, [showMenuBar]);
  console.log("user has been set",user)

  const handleSignOut = () => {
    const confirmSignOut=window.confirm("Are you sure to signout ?");
    if(confirmSignOut){

        localStorage.removeItem("userDTO");
        navigate("/signin");
    }
  };
  return (
    <div className="w-full relative">
      <div className="flex justify-between items-center">
        <Link to="/">
          <h1 className="text-lg font-semibold">SCM</h1>
        </Link>
        <button onClick={() => setShowMenuBar(!showMenuBar)}>
          <MenuIcon />
        </button>
      </div>
      {showMenuBar && (
        <div
          className="fixed right-0 bg-neutral-100 mx-5 rounded-md w-[220px] z-50"
          onClick={() => setShowMenuBar(false)}
        >
          <div className="flex flex-col">
            <div className="py-2 px-5 flex items-center gap-3 border-b shadow-sm">
              <div>
                {user?.profilePic ? (
                  <img
                    className="w-10 h-10 rounded-full object-cover "
                    src={user?.profilePic}
                    alt=""
                  />
                ) : (
                  <img
                    className="w-10 h-10 rounded-full object-cover "
                    src="https://images.pexels.com/photos/31321344/pexels-photo-31321344/free-photo-of-elegant-fashion-portrait-of-a-woman-in-studio.jpeg?auto=compress&cs=tinysrgb&w=1200"
                    alt=""
                  />
                )}
              </div>
              <div className="flex flex-col items-start">
                <div className="capitalize">{user?.name}</div>
                <div className="italic text-sm">{user?.email}</div>
              </div>
            </div>
            <Link
              className="hover:bg-neutral-200 py-2 text-left px-5"
              to="/add-contact"
            >
              Add Contact
            </Link>
            <Link
              className="hover:bg-neutral-200 py-2 text-left px-5"
              to="/view-contacts"
            >
              View Contacts
            </Link>
            <Link
              className="hover:bg-neutral-200 py-2 text-left px-5"
              to="/favorites"
            >
              Favorites
            </Link>
            <Link
              className="hover:bg-neutral-200 py-2 text-left px-5"
              to="/profile"
            >
              Profile
            </Link>
            {/* <Link className='hover:bg-red-200 py-2 text-left px-5' to="/signin">Signout</Link> */}
            <button
              onClick={handleSignOut}
              className="text-left hover:bg-neutral-200 py-2 px-5"
            >
              Signout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
