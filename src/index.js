import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";


ReactDOM.createRoot(document.getElementById("root"))?.render(
  <React.StrictMode>
    <Auth0Provider
      domain="tetris-tutor.eu.auth0.com"
      clientId="Rcmo4ppyH0QaFxw3wqMAQaeM12MBkcIj"
      cacheLocation='localstorage'
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
