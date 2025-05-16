import React, { useState, useEffect } from 'react';
import '../styles/Header.css';

const Header = () => {
  const [activeLink, setActiveLink] = useState('home');

  // Update active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'portfolio', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for header height

      // Find the current section based on scroll position
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(section);
            return;
          }
        }
      }

      // Default to home if no section is active
      setActiveLink('home');
    };

    // Initial call to set the active link on page load
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle click on navigation links
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70, // Adjust for header height
        behavior: 'smooth'
      });
      setActiveLink(sectionId);
    }
  };

  return (
    <header className="header">
      <nav className="nav-container">
        <a 
          href="#home" 
          className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'home')}
        >
          Home
        </a>
        <a 
          href="#portfolio" 
          className={`nav-link ${activeLink === 'portfolio' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'portfolio')}
        >
          Portfolio
        </a>
        <a 
          href="#about" 
          className={`nav-link ${activeLink === 'about' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'about')}
        >
          About
        </a>
        <a 
          href="#contact" 
          className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, 'contact')}
        >
          Contact
        </a>
      </nav>
    </header>
  );
};

export default Header;
