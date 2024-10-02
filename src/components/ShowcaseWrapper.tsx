import React from 'react';
import Showcase from './Showcase';

const ShowcaseWrapper: React.FC = () => {
  return (
    <div className="showcase-wrapper">
      <div className="content-before" style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Scroll down to see the Showcase component</h1>
      </div>
      <Showcase />
      <div className="content-after" style={{ height: '100vh', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>You've scrolled past the Showcase component</h1>
      </div>
    </div>
  );
};

export default ShowcaseWrapper;