import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Route,
  Routes,
  createHashRouter,
  HashRouter,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import ImprintPage from './components/pages/ImprintPage';
import MyCommandPalette from './components/palette/MainCommandPalette';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import StatsPage from './components/pages/Stats';
import IntroPage from './components/pages/IntroPage';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <HashRouter>
        <Header />
        <MyCommandPalette />
        <ToastContainer />
        <main>
          <Routes>
            <Route exact path='/' Component={MainPage} />
            <Route exact path='/stats' Component={StatsPage} />
            <Route exact path='/imprint' Component={ImprintPage} />
            <Route exact path='/intro' Component={IntroPage} />
          </Routes>
        </main>
        <Footer />
      </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
