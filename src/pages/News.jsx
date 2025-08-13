import { useState, useEffect } from 'react';

// Background images (ensure these paths are correct)
import bg1 from '../assets/image0.jpg';
import bg2 from '../assets/image2.jpg';
import bg3 from '../assets/image3.jpg';
import bg4 from '../assets/image4.jpg';

// Define article type for better type safety


const News = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Background images array
  const backgrounds = [bg1, bg2, bg3, bg4];

  // News data - update this array to change news content
  const newsArticles = [
    {
      id: 1,
      title: "Annual Science Fair 2023",
      date: "October 15, 2023",
      content: "Our students showcased innovative projects at the annual science fair, with three projects qualifying for the national competition."
    },
    {
      id: 2,
      title: "New Computer Lab Installation",
      date: "September 5, 2023",
      content: "The school has completed installation of a state-of-the-art computer lab with 30 new workstations and interactive whiteboards."
    },
    {
      id: 3,
      title: "Sports Day Results",
      date: "July 20, 2023",
      content: "Congratulations to the Red House for winning this year's inter-house sports competition."
    }
  ];

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

  // Styles object
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      color: 'white',
      padding: isMobile ? '1rem' : '2rem',
      position: 'fixed',
      top: 0,
      left: '170px',
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
      maxWidth: '1000px',
      width: '90%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '10px',
      padding: isMobile ? '1rem' : '2rem',
      margin: '2rem auto',
      zIndex: 1,
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.8s ease-out',
    },
    title: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      marginBottom: '1.5rem',
      textAlign: 'center',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    article: {
      marginBottom: '2rem',
      paddingBottom: '1.5rem',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    },
    articleTitle: {
      fontSize: isMobile ? '1.3rem' : '1.6rem',
      marginBottom: '0.5rem',
      color: '#3a86ff',
    },
    articleDate: {
      fontSize: '0.9rem',
      color: '#aaa',
      marginBottom: '1rem',
    },
    articleContent: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      lineHeight: '1.6',
    },
    noArticles: {
      color: '#fff',
      textAlign: 'center',
      fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.container}>
      {/* Background slideshow */}
      {backgrounds.map((bg, index) => (
        <div 
          key={`bg-${index}`}
          style={{
            ...styles.backgroundSlide,
            backgroundImage: `url(${bg})`,
            opacity: index === currentBgIndex ? 1 : 0
          }}
        />
      ))}

      {/* News Content */}
      <div style={styles.content}>
        <h1 style={styles.title}>School News</h1>
        
        {newsArticles && newsArticles.length > 0 ? (
          newsArticles.map((article) => (
            <div key={`article-${article.id}`} style={styles.article}>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.articleDate}>{article.date}</p>
              <p style={styles.articleContent}>{article.content}</p>
            </div>
          ))
        ) : (
          <p style={styles.noArticles}>No news articles available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default News;