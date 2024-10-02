import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

// Define your Apollo Client
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',  // Your GraphQL server URI
    cache: new InMemoryCache(),
  });

// Define the GraphQL query to fetch messages
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

function Messages() {
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Function to classify a message by making a POST request to the REST API
  const classifyMessage = async (messageId: string) => {
    try {
        const response = await fetch(`http://localhost:4000/api/classify-message/${messageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        if (response.ok) {
            alert(`Message classified as: ${result.classification}`);
            refetch(); // Refetch the messages after classification to get updated data
        } else {
            alert('Error classifying message');
        }
    } catch (error) {
        console.error('Error classifying message:', error);
    }
};


  return (
    <div>
      {data.messages.map((message: any) => (
        <div key={message.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h3>{message.text}</h3>
          <p>Classification: {message.classification}</p>
          <p>Date: {new Date(message.createdAt).toLocaleString()}</p>
          <button onClick={() => classifyMessage(message.id)}>Classify Message</button>
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <h1>Messages from MongoDB via GraphQL</h1>
          <Messages />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
