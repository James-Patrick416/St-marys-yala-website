import { useState, useEffect } from 'react';
import { FaWhatsapp, FaEnvelope, FaFacebook, FaTwitter } from 'react-icons/fa';

// Reuse the same background images from Home
import bg1 from '../assets/image0.jpg';
import bg2 from '../assets/image2.jpg';
import bg3 from '../assets/image3.jpg';
import bg4 from '../assets/image4.jpg';

const Contacts = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images array
  const backgrounds = [bg1, bg2, bg3, bg4];

  // Check screen size and trigger fade-in
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: isMobile ? '1rem' : '2rem',
      position: 'fixed',
      top: 0,
      left: '20px', // Adjust to match your sidebar width
      right: 0,
      bottom: 0,
      overflowY: 'auto',
    },
    backgroundSlide: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      opacity: 0,
      transition: 'opacity 1.5s ease-in-out',
      zIndex: 0,
    },
    content: {
      maxWidth: '800px',
      width: isMobile ? '90%' : 'calc(100% - 300px)',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      padding: isMobile ? '1.5rem' : '2.5rem',
      margin: '2rem auto',
      zIndex: 1,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out',
    },
    title: {
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginBottom: '2rem',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '1.5rem',
      fontSize: isMobile ? '1rem' : '1.2rem',
    },
    icon: {
      marginRight: '1rem',
      fontSize: '1.5rem',
      minWidth: '30px',
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '2rem',
      gap: '1.5rem',
    },
    socialIcon: {
      fontSize: '2rem',
      color: 'white',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      ':hover': {
        transform: 'scale(1.1)',
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Background slideshow */}
      {backgrounds.map((bg, index) => (
        <div 
          key={index}
          style={{
            ...styles.backgroundSlide,
            backgroundImage: `url(${bg})`,
            opacity: index === currentBgIndex ? 1 : 0
          }}
        />
      ))}

      {/* Contact Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Contact St. Mary's Yala</h1>
        
        <div style={styles.contactItem}>
          <FaWhatsapp style={styles.icon} />
          <span>+254 712 345 678</span>
        </div>
        
        <div style={styles.contactItem}>
          <FaEnvelope style={styles.icon} />
          <span>info@stmarysyala.ac.ke</span>
        </div>
        
        <div style={styles.socialIcons}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook style={styles.socialIcon} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter style={styles.socialIcon} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;