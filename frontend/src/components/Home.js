import React, { useState, useEffect } from 'react';
import './Home.css';
import Select from "react-select";
// import cactusImage from '../dummy/cactus.jpg';
// import calcImage from '../dummy/calc.jpg';
// import lampImage from '../dummy/lamp.webp';
// import switchImage from '../dummy/nintendo.jpg'
// import beanImage from '../dummy/beanbag.jpg'
// import padImage from '../dummy/ipad.jpg'
import { useNavigate } from "react-router-dom";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


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


// const imageMap = {
//   cactusImage: cactusImage,
//   calcImage: calcImage,
//   lampImage: lampImage,
//   switchImage: switchImage,
//   beanImage: beanImage,
//   padImage: padImage,
// };


function Home() {

  const [showCategories, setShowCategories] = useState(false);
  const categories = [{value: 'books', label: 'Books'}, {value: 'electronics', label: 'Electronics'}, {value: 'apparel', label: 'Apparel'}, {value: 'furniture', label:'Furniture'}, {value: 'toys', label: 'Toys'}];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/home").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, []);
  


  // Function to open the modal with the listing details
  const openModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedListing(null); // Also clear the selected listing
  };

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
          <Select 
          isMulti={true}
          options={categories}
          placeholder="Select Categories..." 
          onClick={() => setShowCategories(!showCategories)}>
            <div className="hamburger-icon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            Categories
          </Select>
          {showCategories && (
            <div className="dropdown-content">
              {categories.map((category, index) => (
                <div key={index} onClick={() => console.log(category)}>{category.label}</div>
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

      <section className="new-listings">
        <h2>New Listings</h2>
        <div className="new-listings-grid">
          
          {(typeof data.home === 'undefined') ? (
            <p>Loading...</p>
          ) : (data.home.map((unit, i) => (
            <div key={i} className="listing-card" onClick={() => openModal(unit)}>
              <img src={`https://res.cloudinary.com/dpsysttyv/image/upload/w_200,h_100,c_fill,q_100/${unit[4]}.jpg`} alt={unit[0]} className="listing-image" />
              <div className="listing-details">
                <h3 className="listing-title">{unit[0]}</h3>
                <p className="listing-price">${unit[2]}</p>
              </div>
            </div>
          )))} 

        </div>
      </section>
      
      {isModalOpen && <ListingModal listing={selectedListing} onClose={closeModal} />}

      <footer className="footer">
        <div className="about-us"><button className="about-us-link" onClick={handleNavigateToAboutUs}>About Us</button></div>
        <p>© {new Date().getFullYear()} CarlMart, Inc. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Home;
