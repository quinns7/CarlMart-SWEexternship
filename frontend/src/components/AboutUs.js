import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Home.css';
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const aboutUsStyle = {
  paddingLeft: '50px', // Indentation from the left
  paddingRight: '50px', // Indentation from the right
};

function AboutUs() {
  const [showCategories, setShowCategories] = useState(false);
  const categories = [{value: 'books', label: 'Books'}, {value: 'electronics', label: 'Electronics'}, {value: 'apparel', label: 'Apparel'}, {value: 'furniture', label:'Furniture'}, {value: 'toys', label: 'Toys'}];
  const navigate = useNavigate();
  const devInfo = [['Barry Nwike', 'Barinamene "Barry" Nwike is a junior CS major/Creative Writing minor at Carleton College.   When he\'s not programming, he likes taking long walks, cooking, and writing.'], ['Hannah Moran', 'Hannah is a senior Computer Science major, Digital Arts and Humanities minor at Carleton College. She is a member of the Carleton and Chamber Choirs and Carleton\'s Hack4Impact club. In her free time, she enjoys running and warm coffee.'], ['Sophie Quinn','Sophie is a member of the class of \’25, majoring in Computer Science, and minoring in History and German. She is involved with the Nova (ultimate frisbee team), JCO (student dance group), and FKK (german club).'], ['Zoey La','Hi there! My name is Zoey — I’m currently a junior at Carleton, majoring in CS and minoring in Math! In my free time, I play Fortnite. And I also (attempt to) code, I guess.']];
  //const devInfo = ['CS student at Carleton', 'Another CS student at Carleton', 'Yet another CS student at Carleton', 'And another CS student at Carleton'];

  const handleNavToNewListing = () => {
    navigate('/new-listing');
  };

  const handleNavigateToAboutUs = () => {
    navigate('/about-us'); 
  };

  // const handleNavigateToHome = () => {
  //   navigate('/');
  // };

  return (
    <div className="home-container">
      <header className="header">
        <Link to ="/"> 
          <div className="nav-logo">CarlMart</div>
        </Link>
        
        <input type="text" placeholder="Search..." className="search-bar" />

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
    
        <div className="nav-buttons">
          <button className="nav-item" onClick={handleNavToNewListing}>
            <span role="img" aria-label="add">➕</span> New Listing
          </button>

          <Link to ="/login">
            <button className="nav-item" onClick={() => console.log('Sign In clicked')}> <span role="img" aria-label="person">👤</span> Sign In </button>
          </Link>

        </div>
      </header>

      <section className="about-us" style={aboutUsStyle}>
        <h2 style={{ marginLeft: '-20px', marginRight: '-20px', fontWeight: 'bold', fontSize: '30px' }}>About Us</h2> 
        <h2 style={{ marginLeft: '-20px', marginRight: '-20px', fontSize: '20px' }}>Welcome to CarlMart, a collaborative effort by a talented team of developers, mentored by Carleton alumni Ethan Cassel-Mace over two weeks. Our structured web application simplifies the buying and selling of new or used items on campus, creating a convenient and community-driven marketplace for students. The following students developed CarlMart during the Winter 2023 SWE Externship program.</h2> 
        <div className="about-us-grid">
          {devInfo.map((info, i) => (
            <div key={i} className="devInfo-card">
              <h3 className="devInfo-name">{info[0]}</h3>
              <p>{info[1]}</p>
            </div>
          ))}
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