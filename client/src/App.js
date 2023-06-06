import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

const App = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    // Event listener for receiving messages
    socket.on('message', (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('message', message); // Send the message to the server
    setMessage(''); // Clear the input field
  };

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <p>Received message: {receivedMessage}</p>
    </div>
  );
};

export default App;
