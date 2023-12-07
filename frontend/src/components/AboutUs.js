import React, { useState } from 'react';
import './Home.css';
import cactusImage from '../dummy/cactus.jpg';
import calcImage from '../dummy/calc.jpg';
import lampImage from '../dummy/lamp.webp';
import switchImage from '../dummy/nintendo.jpg'
import beanImage from '../dummy/beanbag.jpg'
import padImage from '../dummy/ipad.jpg'
import { useNavigate } from "react-router-dom";


const ListingModal = ({ listing, onClose }) => {
  if (!listing) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{listing[0]}</h2>
        <p>Price: ${listing[2]}</p>
        <p>Description: {listing[1]}</p>
        <p>Contact: {listing[3]}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const imageMap = {
  cactusImage: cactusImage,
  calcImage: calcImage,
  lampImage: lampImage,
  switchImage: switchImage,
  beanImage: beanImage,
  padImage: padImage,
};

function AboutUs() {

  const [showCategories, setShowCategories] = useState(false);
  const categories = ['Books', 'Electronics', 'Apparel', 'Furniture', 'Toys'];
  const navigate = useNavigate();
  const devInfo = [['Barry', 'CS student at Carleton'], ['Hannah', 'Another CS student at Carleton'], ['Sophie','Yet another CS student at Carleton'], ['Zoey','And another CS student at Carleton']];
  //const devInfo = ['CS student at Carleton', 'Another CS student at Carleton', 'Yet another CS student at Carleton', 'And another CS student at Carleton'];

  const handleNavToNewListing = () => {
    navigate('/new-listing'); // Replace '/signup' with your actual sign-up route
  };

  const handleNavigateToAboutUs = () => {
    navigate('/about-us'); // Replace '/signup' with your actual sign-up route
  };

  return (
    <div className="home-container">
      <header className="header">
        <div className="nav-logo">CarlMart</div>

        {/* Categories Dropdown */}
        <div className="categories">
          <button onClick={() => setShowCategories(!showCategories)}>
            <div className="hamburger-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            Categories
          </button>
          {showCategories && (
            <div className="dropdown-content">
              {categories.map((category, index) => (
                <div key={index} onClick={() => console.log(category)}>{category}</div>
              ))}
            </div>
          )}
        </div>
      
        <input type="text" placeholder="Search..." className="search-bar" />
        <div className="nav-buttons">
          <button className="nav-item" onClick={handleNavToNewListing}>
            <span role="img" aria-label="add">➕</span> New Listing
          </button>
          <button className="nav-item" onClick={() => console.log('Sign In clicked')}>
            <span role="img" aria-label="person">👤</span> Sign In
          </button>
        </div>
      </header>

      <section className="about-us">
        <h2>About Us</h2>
        <div className="about-us-grid">
            {(devInfo.map((unit, i) => (
                <div key={i} className="devInfo-card">
                <div className="devInfo-details">
                    <h3 className="devInfo-name">{unit[0]}: {unit[1]}</h3>
                </div>
                </div>
            )))}

        </div>
      </section>
      
      
      <footer className="footer">
        <div className="about-us"><button className="about-us-link" onClick={handleNavigateToAboutUs}>About Us</button></div>
        <p>© {new Date().getFullYear()} CarlMart, Inc. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default AboutUs;
