import React from 'react';
import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Hero from './components/Hero';
import Video from './components/Video';
import Logos from './components/Logos';
import Description from './components/Description';
import Showcase from './components/Showcase';
import Fin from './components/Fin';
import TrainingMessages from './components/TrainingMessages';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer';

// Create an Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />  {/* Add Navbar here */}
        <Hero />
        <Video />
        <Description />
        <Showcase />
        <TrainingMessages />
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
