import React, { useState } from 'react';
import { Trophy, Compass, Users, Swords, List } from 'lucide-react';
import trainingMessagesData from '../data/bartle-analyzer.trainingmessages.json';
import '../styles/TrainingMessages.css';

interface TrainingMessage {
  id: string;
  text: string;
  classification: string;
  createdAt: string;
}

// Explicitly type the imported JSON as an array of TrainingMessage
const trainingMessages: TrainingMessage[] = trainingMessagesData;

const classifications = [
  { name: 'Achiever', Icon: Trophy },
  { name: 'Explorer', Icon: Compass },
  { name: 'Socializer', Icon: Users },
  { name: 'Killer', Icon: Swords }
];

function TrainingMessages() {
  // Ensure filter is typed correctly
  const [filter, setFilter] = useState<string | null>(null);

  // Type inference will now work better with the explicitly typed trainingMessages
  const filteredMessages = filter
    ? trainingMessages.filter((message: TrainingMessage) => message.classification === filter)
    : trainingMessages;

  return (
    <div className="bartle-message-filter">
      <h2>Bartle Message Filter</h2>
      <div className="filter-buttons">
        {classifications.map(({ name, Icon }) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`filter-button ${name.toLowerCase()} ${filter === name ? 'active' : ''}`}
          >
            <Icon size={20} />
            {name}
          </button>
        ))}
        <button 
          onClick={() => setFilter(null)} 
          className={`filter-button all ${filter === null ? 'active' : ''}`}
        >
          <List size={20} />
          All
        </button>
      </div>
      <div className="message-grid">
        {filteredMessages?.map((message: TrainingMessage) => (
          <div key={message.id} className={`message-item ${message.classification.toLowerCase()}`}>
            <p className="message-text">{message.text}</p>
            <p className="message-classification">Classification: {message.classification}</p>
            <p className="message-date">Date: {new Date(parseInt(message.createdAt)).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingMessages;
