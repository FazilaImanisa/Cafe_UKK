import React from 'react';
import '../styles/tailwind.css';
import Logo from "../image/logo.png"
import { Link } from 'react-router-dom';

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Poppins:wght@200;400;600;700;900&display=swap';
document.head.appendChild(link);

export default function Home() {
  return (
    <div>
      <div className="bg-image">
        <div style={{ backgroundColor: "rgb(32, 39, 56)", width: "300px" }} className="absolute left-0 top-0 h-screen flex flex-col items-center">
          <div className="logo-image">
            <img src={Logo} alt="Cafe Logo" style={{ width: "200px", height: "200px"}}/>
          </div>
          <div className="option text-white text-xl">
            <ul>
              <li><Link to="/">HOME</Link></li>
              <li><Link to="/login">LOGIN</Link></li>
              <li>MENU</li>
              <li>GALLERY</li>
              <li>CONTACT</li>
            </ul>
          </div>
          <div className="order">
            <button style={{ backgroundColor: "rgb(167, 101, 79)"}} className="text-white py-3 px-7 font-bold rounded-full mt-8">ORDER NOW</button>
          </div>
        </div>
        <div style={{ backgroundColor: "rgb(167, 101, 79)", width: "600px", opacity:"80%" }} className="absolute right-0 top-0 h-screen flex items-center"></div>
        <div style={{ position: "absolute", marginLeft: "800px" }} className="text text-white text-start z-20">
          <div className="title text-2xl mb-4">WIKUSAMA CAFE</div>
          <div className="welcome text-8xl mb-8">Welcome to Our Cafe</div>
          <div className="desc text-xl mb-12 mr-20">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
          <div className="open-time flex flex-row items-center">
            <div className="open text-lg font-bold mr-4">WE ARE OPEN<br />7 DAYS A WEEK</div>
            <div className="time text-6xl ml-3">9AM - 12 AM</div>
          </div>
        </div>    
      </div>
    </div>
  );
}
