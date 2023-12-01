// Home.js
import React, { useState, useEffect } from 'react';
import '../styles/Home.css';

function Home() {
  const [newListings, setNewListings] = useState([]);

  useEffect(() => {
    async function fetchNewListings() {
      try {
        const response = fetch('/api/item'); // replace endpoint
        const data = response.json();
        setNewListings(data);
      } catch (error) {
        console.error('Error fetching new listings:', error);
      }
    }

    fetchNewListings();
  }, []);

  return (
    <div className="home-container">
      <section className="new-listings">
        <h2>New Listings</h2>
        <div className="listings-grid">
          {newListings.map((listing, index) => (
            <div key={index} className="listing-card">
              <h3>{listing.title}</h3>
              <p className="price">${listing.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

