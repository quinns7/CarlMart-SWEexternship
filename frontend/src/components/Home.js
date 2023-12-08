import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import Select from "react-select";
import { useNavigate } from "react-router-dom";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const ListingModal = ({ listing, onClose }) => {
  if (!listing) return null;

    // Handle outside click
    const handleOutsideClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

  return (
    <div className="modal-backdrop" onClick={handleOutsideClick}>
      <div className="modal">
        <button className="modal-close-button" onClick={onClose}>X</button>
        <div className="modal-content">
          <div className="modal-image-container">
            {/* Assuming listing[4] is the image URL */}
            <img src={`https://res.cloudinary.com/dpsysttyv/image/upload/w_200,h_100,c_fill,q_100/${listing[4]}.jpg`} alt={listing[0]} className="listing-image" />
          </div>
          <div className="modal-text">
            {/* Assuming listing[0] is the title */}
            <h2>{listing[0]}</h2>
            {/* Assuming listing[2] is the price */}
            <p>Price: ${listing[2]}</p>
            {/* Assuming listing[1] is the description */}
            <p>Description: {listing[1]}</p>
            {/* Assuming listing[3] is the contact */}
            <p>Contact: {listing[3]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


function Home() {

  const [showCategories, setShowCategories] = useState(false);
  const categories = [{value: 'books', label: 'Books'}, {value: 'electronics', label: 'Electronics'}, {value: 'apparel', label: 'Apparel'}, {value: 'furniture', label:'Furniture'}, {value: 'toys', label: 'Toys'}];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const navigate = useNavigate();
  const [sort, setSort] = useState('');
  const [data, setData] = useState([{}])

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
    navigate('/new-listing'); 
  };

  const handleNavigateToAboutUs = () => {
    navigate('/about-us');
  };

  const handleSubmit = async () => {

    // Sort the listings
    console.log(sort)
    const sortResponse = await fetch('/sort', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        sort: sort,
      }),
    });

    if (!sortResponse.ok) {
      throw new Error('Error sorting listings');
    }
    const sortData = await sortResponse.json();

    // Reload the home page with the sorted listings
    const homeResponse = await fetch('/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        sort: sortData['sort'],
      }),
    });

    if (!homeResponse.ok) {
      throw new Error('Error fetching home page data');
    }

    // Handle the response as needed
    const homeData = await homeResponse.json();
    setData(homeData);
    console.log('Home Page Response:', homeData);
  };

  useEffect(() => {
    // This useEffect will run whenever the 'sort' state changes
    console.log('Updated sort:', sort);
    if (sort !== '') {
      handleSubmit();
    }
  }, [sort]);

  return (
    <div className="home-container">
      <header className="header">
        <Link to ="/"> 
          <div className="nav-logo">CarlMart</div>
        </Link>

        <input type="text" placeholder="Search..." className="search-bar" />

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
      
        <div className="nav-buttons">
          <button className="nav-item" onClick={handleNavToNewListing}>
            <span role="img" aria-label="add">➕</span> New Listing
          </button>

          <Link to ="/login">
            <button className="nav-item" onClick={() => console.log('Sign In clicked')}> <span role="img" aria-label="person">👤</span> Sign In </button>
          </Link>

        </div>
      </header>

      <section className="new-listings">
        <div className="listings-header">
          <h2>New Listings</h2>
          <div className="sort-dropdown">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="">Sort Results</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="date-asc">Date Posted: Oldest to Newest</option>
              <option value="date-desc">Date Posted: Newest to Oldest</option>
            </select>
          </div>
        </div>

        <div className="new-listings-grid">
          {typeof data.home === 'undefined' ? (
            <p>Loading...</p>
          ) : (
            data.home.map((unit, i) => (
              <div key={i} className="listing-card" onClick={() => openModal(unit)}>
                <img src={`https://res.cloudinary.com/dpsysttyv/image/upload/w_200,h_100,c_fill,q_100/${unit[4]}.jpg`} alt={unit[0]} className="listing-image" />
                <div className="listing-details">
                  <h3 className="listing-title">{unit[0]}</h3>
                  <p className="listing-price">${unit[2]}</p>
                </div>
              </div>
            ))
          )}
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
