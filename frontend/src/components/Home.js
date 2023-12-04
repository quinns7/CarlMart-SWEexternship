import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import cactusImage from '../dummy/cactus.jpg';
import calcImage from '../dummy/calc.jpg';
import lampImage from '../dummy/lamp.webp';
import switchImage from '../dummy/nintendo.jpg'
import beanImage from '../dummy/beanbag.jpg'
import padImage from '../dummy/ipad.jpg'

const ListingModal = ({ listing, onClose }) => {
  if (!listing) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{listing.title}</h2>
        <p>Price: ${listing.price}</p>
        <p>Description: {listing.description}</p>
        <p>Contact: {listing.contact}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

function Home() {
  // Static dummy data for listings
  const dummyListings = [
    { id: 1, title: 'Calc textbook', price: 50, description: 'Used textbook', contact: 'laz', image: calcImage },
    { id: 2, title: 'Lamp', price: 10, description: 'Used lamp', contact: 'quinns', image: lampImage },
    { id: 3, title: 'Cactus', price: 5, description: 'Cute little cactus', contact: 'moranh', image: cactusImage },
    { id: 4, title: 'Nintendo Switch', price: 45, description: 'Used nintendo switch', contact: 'nwikeb', image: switchImage },
    { id: 5, title: 'Beanbag chair', price: 30, description: 'Used black bean bag chair', contact: 'laz', image: beanImage },
    { id: 6, title: 'Ipad', price: 800, description: 'Used ipad', contact: 'laz', image: padImage },
  ];

  const [showCategories, setShowCategories] = useState(false);
  const categories = ['Books', 'Electronics', 'Apparel', 'Furniture', 'Toys'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

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
          <button className="nav-item" onClick={() => console.log('New Listing clicked')}>
            <span role="img" aria-label="add">+</span> New Listing
          </button>
          <Link to ="/login">
            <button className="nav-item" onClick={() => console.log('Sign In clicked')}> <span role="img" aria-label="person">👤</span> </button>
          </Link>
        </div>
      </header>

      <section className="new-listings">
        <h2>New Listings</h2>
        <div className="new-listings-grid">
          {dummyListings.map((listing) => (
            <div key={listing.id} className="listing-card" onClick={() => openModal(listing)}>
              <img src={listing.image} alt={listing.title} className="listing-image" />
              <div className="listing-details">
                <h3 className="listing-title">{listing.title}</h3>
                <p className="listing-price">${listing.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {isModalOpen && <ListingModal listing={selectedListing} onClose={closeModal} />}

      <footer className="footer">
        <p>© {new Date().getFullYear()} CarlMart, Inc. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default Home;
