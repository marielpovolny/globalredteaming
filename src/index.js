import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css'; // Or './styles/global.css' if that's your global CSS file name
import App from './App'; // Assumes you have a main App component file (App.js or App.jsx)
// Remove the line above if HomePage IS your entire App for now

// If HomePage is your main component to render directly:
// import HomePage from './HomePage'; // Or './components/HomePage' if it's in a subfolder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
