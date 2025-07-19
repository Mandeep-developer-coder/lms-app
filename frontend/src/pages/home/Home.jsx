import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";


import HomeImage from '../../assets/homeImage.png';
import Ball from "../../assets/ball.png";

import mcaIcon from '../../assets/eContent/mca.png';
import mbaIcon from '../../assets/eContent/mba.png';
import bbaIcon from '../../assets/eContent/bba.png';
import bcaIcon from '../../assets/eContent/bca.png';

import "./home.css";

export const Home = () => {
  const imageRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
      setTimeout(() => imageRef.current.classList.add("animate"), 100);
    }
    if (heroRef.current) {
      setTimeout(() => heroRef.current.classList.add("animate"), 200);
    }
  }, []);

  const departments = [
    { to: "/departments/mca", icon: mcaIcon, short: "MCA", full: "Master of Computer Applications" },
    { to: "/departments/mba", icon: mbaIcon, short: "MBA", full: "Master of Business Administration" },
    { to: "/departments/bba", icon: bbaIcon, short: "BBA", full: "Bachelor of Business Administration" },
    { to: "/departments/bca", icon: bcaIcon, short: "BCA", full: "Bachelor of Computer Applications" },
  ];

  return (
    <div className="home-wrapper">
      <img className="home-ball" src={Ball} alt="Ball" />

      <div className="home-top-part">
        <img ref={imageRef} className="home-image" src={HomeImage} alt='Home Image' />
        <section ref={heroRef} className="home-hero">
          <h1>Welcome to</h1>
          <h2>MAIMT Library</h2>
          <p>Your academic resources, just one click away.</p>
          <div className="hero-buttons">
            <Link to="/books">📚 Books</Link>
            <Link to="/contact-us">💌 Contact Us</Link>
          </div>
        </section>
      </div>

      <section className="home-departments">
        <h3>Our Departments</h3>
        <div className="home-dept-grid">
          {departments.map((dept, index) => (
            <div className="dept-card-wrapper" key={index}>
              <Link to={dept.to} className="dept-card">
                <div className="dept-card-image-wrapper">
                  <div className="dept-card-image-inner">
                    <img src={dept.icon} alt={dept.short} />
                  </div>
                </div>
                <span>{dept.short}</span>
                <div className="full-form">{dept.full}</div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};