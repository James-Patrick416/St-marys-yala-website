import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaNewspaper,
  FaEnvelope,
  FaBars, 
  FaTimes 
} from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check screen size and set initial state
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open on desktop, closed on mobile by default
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className={`sidebar-toggle ${isOpen ? 'open' : ''}`}
        onClick={toggleSidebar}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>ST MARYS YALA</h2>
          <div className="divider" />
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/" onClick={closeSidebar}>
                <FaHome className="icon" />
                <span>Home</span>
              </Link>
            </li>
            <li className={location.pathname === '/news' ? 'active' : ''}>
              <Link to="/news" onClick={closeSidebar}>
                <FaNewspaper className="icon" />
                <span>News</span>
              </Link>
            </li>
            <li className={location.pathname === '/contacts' ? 'active' : ''}>
              <Link to="/contacts" onClick={closeSidebar}>
                <FaEnvelope className="icon" />
                <span>Contacts</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="divider" />
          <p>© {new Date().getFullYear()} ST MARYS YALA</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;