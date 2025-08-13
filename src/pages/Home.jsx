
import { useState, useEffect } from 'react';

// Import your background images (adjust paths as needed)
import bg1 from '../assets/image0.jpg';
import bg2 from '../assets/image2.jpg';
import bg3 from '../assets/image3.jpg';
import bg4 from '../assets/image4.jpg';

const Home = () => {
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
    
    // Trigger fade-in after component mounts
    setTimeout(() => setIsVisible(true), 100);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Background slideshow effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => 
        prevIndex === backgrounds.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [backgrounds.length]);

  const styles = {
    container: {
      minHeight: '100vh',
      background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: 0,
      margin: 0,
      position: 'fixed',
      top: 0,
      left: 250,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    },
    backgroundSlide: {
      position: 'absolute',
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
      padding: isMobile ? '1.5rem' : '2rem',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      margin: '20px',
      zIndex: 1,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out',
    },
    title: {
      fontSize: isMobile ? '2rem' : '3rem',
      marginBottom: '1rem',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s ease-out 0.2s'
    },
    paragraph: {
      fontSize: isMobile ? '1rem' : '1.2rem',
      lineHeight: '1.6',
      marginBottom: '1rem',
      textAlign: 'left',
      opacity: isVisible ? 1 : 0,
      transition: 'opacity 0.8s ease-out 0.4s'
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

      {/* Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Welcome to St. Mary's Yala</h1>
        
        <p style={styles.paragraph}>
          Established in 1965, St. Mary's Yala is a premier institution dedicated to 
          academic excellence and holistic development. Our mission is to nurture 
          young minds through quality education, moral guidance, and extracurricular 
          activities that shape well-rounded individuals.
        </p>
        
        <p style={{...styles.paragraph, transitionDelay: '0.6s'}}>
          With state-of-the-art facilities and a team of dedicated educators, we 
          provide a conducive learning environment that fosters creativity, critical 
          thinking, and character development. Our students consistently excel 
          academically while demonstrating strong leadership qualities.
        </p>
        
        <p style={{...styles.paragraph, transitionDelay: '0.8s'}}>
          We welcome you to explore our institution and discover how St. Mary's Yala 
          continues to be a beacon of quality education in the region, producing 
          graduates who make meaningful contributions to society.
        </p>
      </div>
    </div>
  );
};

export default Home;