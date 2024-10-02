// TrainingMessages.tsx
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../styles/TrainingMessages.css';
import { Trophy, Compass, Users, Swords, List } from 'lucide-react';

interface TrainingMessage {
  id: string;
  text: string;
  classification: string;
  createdAt: string;
}

const GET_TRAINING_MESSAGES = gql`
  query GetTrainingMessages {
    trainingMessages {
      id
      text
      classification
      createdAt
    }
  }
`;

const classifications = [
  { name: 'Achiever', Icon: Trophy },
  { name: 'Explorer', Icon: Compass },
  { name: 'Socializer', Icon: Users },
  { name: 'Killer', Icon: Swords }
];

function TrainingMessages() {
  const { loading, error, data } = useQuery<{ trainingMessages: TrainingMessage[] }>(GET_TRAINING_MESSAGES);
  const [filter, setFilter] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL error:", error);
    return <p>Error: {error.message}</p>;
  }

  const filteredMessages = filter
    ? data?.trainingMessages.filter(message => message.classification === filter)
    : data?.trainingMessages;

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
        {filteredMessages?.map((message) => (
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