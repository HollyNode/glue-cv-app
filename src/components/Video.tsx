import React, { useEffect, useRef } from 'react';
import '../styles/video.css';
import icon1 from '../images/icon-1.png';
import icon2 from '../images/icon-2.png';
import icon3 from '../images/icon-3.png';
import icon4 from '../images/icon-4.png';
import icon5 from '../images/icon-5.png';
import icon6 from '../images/icon-6.png';
import mbIcon from '../images/mb-icon.png';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { src: icon3, alt: 'React', className: 'icon-react' },
  { src: icon2, alt: 'Tailwind', className: 'icon-tailwind' },
  { src: icon6, alt: 'API', className: 'icon-api' },
  { src: icon5, alt: 'GraphQL', className: 'icon-graphql' },
  { src: icon1, alt: 'AI', className: 'icon-ai' },
  { src: icon6, alt: 'API', className: 'icon-api' },
  { src: icon4, alt: 'Typescript', className: 'icon-typescript' },
];

const Video: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const iconsRef = useRef<(HTMLImageElement | null)[]>([]);
  const newImageRef = useRef<HTMLImageElement>(null);
  const newHeaderRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const header = headerRef.current;
    const iconElements = iconsRef.current.filter((el): el is HTMLImageElement => el !== null);
    const newImage = newImageRef.current;
    const newHeader = newHeaderRef.current;
  
    if (!container || !header || !newImage || !newHeader) {
      console.error("One or more elements not found");
      return;
    }
  
    gsap.set([header, newImage, newHeader], { opacity: 0 });
    gsap.set(newImage, { scale: 0.5 });
    gsap.set(iconElements, { opacity: 0 });
  
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=400%",
        scrub: 1,
        pin: true,
      },
    });
  
    tl.to(header, { opacity: 1, duration: 0.5 })
      .to(iconElements, {
        opacity: 1,
        stagger: () => 0.1 + Math.random() * 0.5,  // Random stagger for fade-in
        duration: 0.3,
        scale: 1,
      }, "-=0.2")
      .to(header, { opacity: 0, duration: 0.5 }, "+=1")
      .to(iconElements, {
        x: () => window.innerWidth / 2 - parseFloat(getComputedStyle(iconElements[0]).left),
        y: () => window.innerHeight / 2 - parseFloat(getComputedStyle(iconElements[0]).top),
        opacity: 0,
        scale: 0.1,
        stagger: 0.05,
        duration: 1,
      }, "-=0.25")
      .to(newImage, { opacity: 1, scale: 1, duration: 0.5 }, "-=0.5")
      .to(newHeader, { opacity: 1, duration: 0.5 });
  
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="video-container">
      <h1 ref={headerRef} className="video-header">
        Looking for a front-end dev?
      </h1>
      <div className="icons-container">
        {icons.map((icon, index) => (
          <img
            key={icon.alt}
            ref={(el) => iconsRef.current[index] = el}
            src={icon.src}
            alt={icon.alt}
            className={`icon ${icon.className}`}
          />
        ))}
      </div>
      <img
        ref={newImageRef}
        src={mbIcon}
        alt="MB Icon"
        className="mb-icon-video"
      />
      <h2 ref={newHeaderRef} className="new-header">
        I am here to provide, skill, experience and gusto w/ the 🧴glue crew.
      </h2>
    </div>
  );
};

export default Video;