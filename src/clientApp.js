import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/routes/App.router';
//rendering in DOM
const router = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
render(router, document.getElementById('root'));
