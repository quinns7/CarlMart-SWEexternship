import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import './NewListing.css'; 
import Axios from 'axios';

function NewListing() {
  const [showCategories, setShowCategories] = useState(false);
  const categories = ['Books', 'Electronics', 'Apparel', 'Furniture', 'Toys'];
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate();
  const api_key = "641958582168523"

  const handleSubmit = async (event) => {
    event.preventDefault();

    const signatureResponse = await fetch("/get-signature");
    const signatureData = await signatureResponse.json();
    console.log("Signature Response:", signatureData);
  
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "jqajmneh");
    data.append("api_key", api_key);
    data.append("signature", signatureData.signature);
    data.append("timestamp", signatureData.timestamp);
    const cloudinaryResponse = await Axios.post("https://api.cloudinary.com/v1_1/dpsysttyv/auto/upload", data, {
      onUploadProgress: function (e) {
        console.log(e.loaded / e.total)
      }
    })
    const cloudinaryData = cloudinaryResponse.data;
    console.log(cloudinaryData)
  
    const photoData = {
      public_id: cloudinaryData.public_id,
      version: cloudinaryData.version,
      signature: cloudinaryData.signature
    }
    try {
      // Send a POST request to your Flask backend using fetch
      const response = await fetch('/new-listing', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          title: title,
          description: description,
          price: price,
          image: photoData
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Handle the response as needed
      const responseData = await response.json();
      console.log('Backend Response:', responseData);
      navigate('/home');

      // Redirect or perform any other actions based on the response
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };

  const handleNavToNewListing = () => {
    navigate('/new-listing'); // Replace '/signup' with your actual sign-up route
  };

  return (
    <div className="listing-container">
      <header className="header">
      <Link to ="/" style={{ textDecoration: 'none' }}><div className="nav-logo">CarlMart</div></Link>

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
            <span role="img" aria-label="person">👤</span> Profile
          </button>
        </div>
      </header>

      <section className="create-new-listing">
        <h2>New Listing</h2>
        <div className="new-listing">
          <form onSubmit={handleSubmit} class="listings-form">
            <label>
              Title:
              <input 
                type="text" 
                placeholder="ex: Black Desk Lamp" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
            <label>
              Image:
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files[0])
                }}
              />
            </label>
            <label>
              Description:
              <input 
                id= "description"
                type="text" 
                placeholder="ex: small black desk lamp in good condition. 5 foot cord" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                placeholder="ex: 25"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <button type="submit" id="postButton">Post Listing</button>
          </form>
          

        </div>
      </section>
      

      <footer className="footer">
        <p>© {new Date().getFullYear()} CarlMart, Inc. All rights reserved.</p>
      </footer>
      
    </div>
  );
}

export default NewListing;
