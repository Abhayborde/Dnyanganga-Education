import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/Global.css';

// Dynamically create the root element
let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
}

// Initialize React
const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
