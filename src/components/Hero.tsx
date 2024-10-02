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
          src="https://www.loom.com/embed/8698ba7f0c5b4a5eb6922fc9ca8d9e76?sid=66dc3b86-1a12-448d-9c82-62c95ecd4127"
          frameBorder="0"
          allowFullScreen
          title="Loom video player"
        ></iframe>
      </div>
    </div>
  );
};

export default Hero;
