import logo from './logo.svg';
import './App.css';
import AddContact from './components/AddContact';
import ViewContacts from "./components/ViewContacts"
import Favorites from "./components/Favorites"
import Profile from "./components/Profile"
import Signin from "./components/Signin"
import {  Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <div className="App w-full p-5">
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/add-contact" element={<AddContact />}/>
      <Route path="/view-contacts" element={<ViewContacts />}/>
      <Route path="/favorites" element={<Favorites />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/signin" element={<Signin />}/>
      <Route path="register" element={<Register />}/>
    </Routes>
    </div>
  );
}

export default App;
