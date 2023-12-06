import React, { useState } from 'react';
import { Link } from 'react-router-dom'
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

  // Handle outside click
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const NewListingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="modal-content">
            <h2>New Listing</h2>
            <form>
              {/* Form fields for new listing */}
              <input type="text" placeholder="Title" />
              <input type="number" placeholder="Price" />
              <textarea placeholder="Description"></textarea>
              <input type="text" placeholder="Contact Info" />
            </form>
            <button onClick={onClose}>Close</button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    );
  };  

  return (
    <div className="modal-backdrop" onClick={handleOutsideClick}>
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

function Home() {

  const [showCategories, setShowCategories] = useState(false);
  const categories = ['Books', 'Electronics', 'Apparel', 'Furniture', 'Toys'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);

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

  const NewListingModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-backdrop" onClick={onClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  
  const openNewListingModal = () => setIsNewListingModalOpen(true);
  const closeNewListingModal = () => setIsNewListingModalOpen(false);

  return (
    <div className="home-container">
      <header className="header">
        <Link to ="/"> 
          <div className="nav-logo">CarlMart</div>
        </Link>
        
        <input type="text" placeholder="Search..." className="search-bar" />

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
    
        <div className="nav-buttons">
        <button className="nav-item" onClick={openNewListingModal}>
          <span role="img" aria-label="add">+</span> New Listing
        </button>
        {isNewListingModalOpen && <NewListingModal 
          isOpen={isNewListingModalOpen} onClose={closeNewListingModal} />}

          <Link to ="/login">
            <button className="nav-item" onClick={() => console.log('Sign In clicked')}> <span role="img" aria-label="person">👤</span> </button>
          </Link>
        </div>
      </header>

      <section className="new-listings">
        <h2>New Listings</h2>
        <div className="new-listings-grid">
          
          {(typeof data.home === 'undefined') ? (
            <p>Loading...</p>
          ) : (data.home.map((unit, i) => (
            <div key={i} className="listing-card" onClick={() => openModal(unit)}>
              <img src={imageMap[unit[4]]} alt={unit[0]} className="listing-image" />
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
        <p> {new Date().getFullYear()} CarlMart, Inc. <br /> All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Home;
