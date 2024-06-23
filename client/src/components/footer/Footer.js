import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.column}>
          <h2>Contact Us</h2>
          <p><FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:DoNation@gmail.com" style={styles.link}>DoNation@gmail.com</a></p>
          <p><FontAwesomeIcon icon={faPhone} /> <a href="tel:0713202453" style={styles.link}>071-3202453</a></p>
        </div>
        <div style={styles.column}>
          <h2>About Us</h2>
          <p>Learn more about our mission and vision.</p>
          <h2>Privacy Policy</h2>
          <p>Read our privacy policy to understand how we protect your data.</p>
          <div style={styles.socialIcons}>
            <h2>Follow Us:</h2>
            <FontAwesomeIcon icon={faFacebook} style={styles.icon} />
            <FontAwesomeIcon icon={faTwitter} style={styles.icon} />
            <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '30px 0',
    marginTop: '50px',
    
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  column: {
    flex: 1,
    margin: '0 20px',
  },
  socialIcons: {
    marginTop: '20px',
  },
  icon: {
    marginRight: '15px',
    fontSize: '24px',
    cursor: 'pointer',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    marginLeft: '5px',
  },
};

export default Footer;
