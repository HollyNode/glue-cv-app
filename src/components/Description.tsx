import React, { useEffect, useRef } from 'react';
import '../styles/description.css';
import icon1 from '../images/icon-1.png';
import icon2 from '../images/icon-2.png';
import icon3 from '../images/icon-3.png';
import icon4 from '../images/icon-4.png';
import icon5 from '../images/icon-5.png';
import icon6 from '../images/icon-6.png';
import mbIcon from '../images/mb-icon.png';
import { gsap } from 'gsap';

const Description: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const header = headerRef.current;
    const text = textRef.current;
    const icons = iconsRef.current;

    if (!card || !header || !text || !icons) {
      console.error("One or more elements not found");
      return;
    }

    gsap.set([card, header, text, icons], { opacity: 0, y: 20 });

    gsap.to([card, header, text, icons], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="description-container">
      <div ref={cardRef} className="description-card">
        <div className="left-column">
          <h2 ref={headerRef}>Here is a little project</h2>
          <p ref={textRef}>
            I built to demonstrate the specific technologies and skills
            you are requesting for the front-end developer position.
          </p>
        </div>
        <div ref={iconsRef} className="right-column">
          <div className="icon-circle">
            <img src={icon2} alt="React" className="tech-icon icon-top" />
            <img src={icon3} alt="TypeScript" className="tech-icon icon-right" />
            <img src={icon4} alt="GraphQL" className="tech-icon icon-bottom-right" />
            <img src={icon5} alt="API" className="tech-icon icon-bottom-left" />
            <img src={mbIcon} alt="MB Icon" className="mb-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;