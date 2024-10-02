import React from 'react';
import glue from '../images/glue-logo.png';
import calamityImage from '../images/calamity-image.png'; 
import '../styles/hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container">
      <img src={glue} alt="Glue Logo" className="glue-logo" />
      <h1 className="hero-greeting">Greetings</h1>
      <h2 className="hero-cv">Matt's CV has entered the chat.</h2>
      <h3 className="hero-description">
        Do glue themselves in sociable grief | Like true, inseparable, faithful loves | Sticking together in{' '}
        <span className="highlight-calamity">
          calamity
          <span className="tooltip">
            William Shakespeare: King John, Act 3, scene 4 
            <img src={calamityImage} alt="Calamity" className="calamity-image" />
          </span>
        </span>.
      </h3>
      
      {/* Loom video iframe */}
      <div className="video-player">
        <iframe
          src="https://www.loom.com/embed/3e1c85795ebb4f2cb4d6a345d31c328a?sid=ad168928-e46f-4dca-9a56-33b99e3a53bd"
          frameBorder="0"
          allowFullScreen
          title="Loom video player"
        ></iframe>
      </div>
    </div>
  );
};

export default Hero;
