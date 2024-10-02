import React, { useState } from 'react';
import '../styles/footer.css';

const Footer: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('matt@envynothingbuild.com');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="footer-container">
      <h2 className="footer-header">Thank you for your consideration!</h2>
      
      <div className="button-wrapper">
        <button className="tiny-button" onClick={handleCopyEmail}>
          {isCopied ? 'Copied!' : 'Contact'}
        </button>
      </div>
      
      <div className="footer-credit">🛠️ by Matt Bauwens, 2024</div>
    </div>
  );
};

export default Footer;
