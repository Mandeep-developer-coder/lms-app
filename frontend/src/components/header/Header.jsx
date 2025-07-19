import maimtLogo from '../../assets/maimtLogo.png';

import './header.css';

import { FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import {FaInstagram, FaFacebookF, FaLinkedinIn} from 'react-icons/fa';

export const Header = () => {
  return (
    <section className="header">

      <div className="bookmark-ribbon">
        <span className="bookmark-text">
          Follow Us :
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </span>
      </div>

      <img className="maimtLogo" src={maimtLogo} alt="Maimt Logo" />

      <h1 className='heading-line'>MAIMT</h1>
      <span className='heading-line-fullform'>Maharaja Agrasen Institute of <br />Management and Technology</span>

      <div className="contact-info">

        <div className="info-item">
          <FaPhoneAlt className="icon" />
          <span>9355455140</span>
        </div>

        <div className="info-item">
          <FaEnvelope className="icon" />
          <span>director@maimt.com</span>
        </div>

      </div>

    </section>
  );
};