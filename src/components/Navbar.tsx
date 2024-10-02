import React, { useState } from 'react';
import '../styles/Navbar.css';
import mbIcon from '../images/mb-icon.png';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaGlobe, FaLinkedin, FaGithub } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <nav className="navbar">
      <div className="relative">
        {/* Bio Button */}
        <div
          className={`bio-button ${isHovered ? 'bio-expanded' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Avatar and Bio Text */}
          <div className="bio-avatar-container">
            <img src={mbIcon} alt="Avatar" className="bio-avatar" />
            <span className={`bio-text ${isHovered ? '' : 'bio-text-hidden'}`}>BIO | Matt Bauwens</span>
          </div>

          {/* Expanded Content */}
          {isHovered && (
            <div className="bio-expanded-content">
              <a
                href="https://www.envynothingbuild.com"
                className="bio-link animated-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGlobe className="link-icon" /> Professional Site
              </a>
              <a
                href="https://www.linkedin.com/in/matt-bauwens-a0572b1b/"
                className="bio-link animated-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="link-icon" /> LinkedIn
              </a>
              <a
                href="https://github.com/HollyNode?tab=repositories"
                className="bio-link animated-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="link-icon" /> GitHub
              </a>

              {/* Contact and Copy Email */}
              <div className="contact">
                <CopyToClipboard text="matt@envynothingbuild.com" onCopy={handleCopy}>
                  <button className={`copy-button ${isCopied ? 'copied' : ''}`}>
                    {isCopied ? 'Copied!' : 'Copy Email'}
                  </button>
                </CopyToClipboard>
                {isCopied && <span className="graffiti-effect">Matt's email copied!</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
