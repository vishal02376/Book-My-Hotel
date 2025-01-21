import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Home/Home';
import HomeHotel from './Components/HomeHotel/HomeHotel';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Define all routes
let Allrouters = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/hotel',
    element: <HomeHotel />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={Allrouters} />
  </React.StrictMode>
);

reportWebVitals();
