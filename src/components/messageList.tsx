// src/components/MessageList.tsx

import React from 'react';
import { gql, useQuery } from '@apollo/client';

// GraphQL query to get messages
const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      text
      classification
      createdAt
    }
  }
`;

const MessageList = () => {
  const { loading, error, data } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="message-list">
      <h2>Classified Messages</h2>
      {data.messages.map((message: any) => (
        <div key={message.id} className="message-item">
          <h3>{message.text}</h3>
          <p><strong>Classification:</strong> {message.classification}</p>
          <p><strong>Date:</strong> {new Date(message.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
