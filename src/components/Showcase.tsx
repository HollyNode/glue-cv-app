import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import '../styles/Showcase.css';

import icon1 from '../images/rect-1.png';
import icon2 from '../images/rect-2.png';
import icon3 from '../images/rect-3.png';
import icon4 from '../images/rect-4.png';
import icon5 from '../images/rect-5.png';
import marioAvatar from '../images/mario-avatar.png';
import peachAvatar from '../images/peach-avatar.png';
import achiever from '../images/achiever.png';
import killer from '../images/killer.png';
import social from '../images/social.png';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Showcase: React.FC = () => {
  const componentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const rectangleRef = useRef<HTMLDivElement>(null);
  const coinsRef = useRef<(HTMLImageElement | null)[]>([]);
  const achievementsRef = useRef<(HTMLImageElement | null)[]>([]);
  const textRef = useRef<HTMLSpanElement>(null);
  const threadsRef = useRef<HTMLDivElement>(null);
  const chartsRef = useRef<HTMLDivElement>(null);
  const bonusBoxRef = useRef<HTMLDivElement>(null);
  const bonusContentRef = useRef<HTMLDivElement>(null);

  const [isSticky, setIsSticky] = useState(false);

  const headerTexts = [
    "Multiverse scenario for Glue: what if there was a taxonomy that tracked user behavior associated to Bartle Gamer types?",
    "Then Glue could create a whole new level of means to better track incentives, ways to contribute, improve, projects, relationships, company morale",
    "Browse the filtered threads that atomize achievement"
  ];

  useEffect(() => {
    const component = componentRef.current;
    const header = headerRef.current;
    const rectangle = rectangleRef.current;
    const coins = coinsRef.current.filter((coin): coin is HTMLImageElement => coin !== null);
    const achievements = achievementsRef.current.filter((achievement): achievement is HTMLImageElement => achievement !== null);
    const text = textRef.current;
    const threads = threadsRef.current;
    const charts = chartsRef.current;
    const bonusBox = bonusBoxRef.current;
    const bonusContent = bonusContentRef.current;

    if (!component || !header || !rectangle || !text || !threads || !charts || !bonusBox || !bonusContent) return;

    gsap.set([header, rectangle, ...coins, ...achievements, text, threads, charts, bonusBox, bonusContent.children], { autoAlpha: 0 });

    const scrollTrigger = ScrollTrigger.create({
      trigger: component,
      start: 'top top',
      end: '+=500%',
      pin: true,
      
      markers: true,
      onUpdate: (self) => {
        setIsSticky(self.isActive);
      },
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: component,
        start: 'top top',
        end: '+=500%',
        scrub: 0.5,
        markers: true,
      },
    });
    
    // Header text transitions
    tl.to(header, { autoAlpha: 1, duration: 0.5, text: headerTexts[0] })
      .to(header, { autoAlpha: 0, duration: 0.5 }, "+=1")
      .to(header, { autoAlpha: 1, duration: 0.5, text: headerTexts[1] })
      .to(header, { autoAlpha: 0, duration: 0.5 }, "+=1")
      .to(header, { autoAlpha: 1, duration: 0.5, text: headerTexts[2] })

      // Rest of the animations
      .to(rectangle, { autoAlpha: 1, duration: 0.5 }, "-=0.5")
      .to(text, { 
        text: "The Game is afoot",
        duration: 1,
        autoAlpha: 1,
        zIndex: 20,
        position: 'relative'
      })
      .to(coins, { 
        autoAlpha: 1, 
        y: '130px',
        stagger: 0.2,
        duration: 0.5,
        ease: "power1.inOut"
      })
      .to(rectangle, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 }, "+=0.5")
      .to(text, { 
        text: "Achievements, Unlocked",
        duration: 1,
        autoAlpha: 1,
        zIndex: 19,
        position: 'relative'
      })
      .to(achievements, { autoAlpha: 1, stagger: 0.2, duration: 1 })
      .to(threads, { autoAlpha: 1, height: 'auto', duration: 1 })
      .to(charts, { autoAlpha: 1, height: 'auto', duration: 1 })

      tl.to(charts, { autoAlpha: 1, height: 'auto', duration: 1 })
      .to({}, { duration: 0.5 }) 
      .to(bonusBox, { autoAlpha: 1, duration: 0.5 })
      .to(bonusContent.children, { 
        autoAlpha: 1, 
        y: 0, 
        stagger: 0.2, 
        duration: 0.5,
        ease: "power2.out"
      })
      .to(bonusBox, { 
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)', 
        duration: 0.5 
      }, "-=0.5");

    return () => {
      scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  const achievementImages = [icon1, icon2, icon3, icon4, icon5];
  const coinImages = [social, killer, achiever];
  
  return (
    <div ref={componentRef} className={`showcase ${isSticky ? 'sticky' : ''}`}>
      <div className="sticky-indicator">{isSticky ? 'Sticky' : 'Not Sticky'}</div>
      <div className="showcase-content">
        <div className="showcase-text">
          <h2 ref={headerRef} className="showcase-header"></h2>
        </div>
        <div className="showcase-visual">
          <div ref={rectangleRef} className="showcase-rectangle">
            <span ref={textRef}></span>
            <div className="achievement-icons">
              {achievementImages.map((image, index) => (
                <img 
                  key={index}
                  ref={(el) => achievementsRef.current[index] = el}
                  src={image}
                  alt={`Achievement ${index + 1}`}
                  className="achievement-icon"
                />
              ))}
            </div>
          </div>
          {coinImages.map((image, index) => (
            <img 
              key={index}
              ref={(el) => coinsRef.current[index] = el}
              src={image}
              alt={`Coin ${index + 1}`}
              className="coin-image"
              style={{
                left: `${(index * 33) + 17}%`,
                transform: 'translateX(-50%)',
              }}
            />
          ))}
          <div ref={threadsRef} className="threads">
            <div className="thread">
              <img src={marioAvatar} alt="Mario" />
              <p>It's me! Just complete 1-1 but the whole sprint felt like a 404. Is anyone else noticing this? Found it best to avoid Koopas as much as possible and focus only on Goombas.</p>
            </div>
            <div className="thread">
              <img src={peachAvatar} alt="Peach" />
              <p>I found that Goombas are but a force multiplier to success. Is speed running the same as a sprint? I found an exploit near the end of the sprint that allowed me to power up. Try it out.</p>
            </div>
          </div>
          <div ref={chartsRef} className="charts">
            <div className="chart">Chart 1</div>
            <div className="chart">Chart 2</div>
            <div className="chart">Chart 3</div>
          </div>
          <div className="bonus-box-container">
        <div ref={bonusBoxRef} className="bonus-box">
          <div ref={bonusContentRef} className="bonus-content">
            <h3><span className="bonus-text">BONUS</span> BACKEND DEV</h3>
            <p>APOLLO / GRAPHQL</p>
            <p>APIs</p>
            <p>MongoDB</p>
          </div>
        </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase;