import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './app.css';
import '/src/styles/style.scss';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <App />
);