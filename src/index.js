import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  Route,
  Routes,
  createHashRouter,
  HashRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import ImprintPage from './components/pages/ImprintPage';
import MyCommandPalette from './components/palette/MainCommandPalette';
import Header from './components/pages/Header';
import Footer from './components/pages/Footer';
import StatsPage from './components/pages/Stats';
import IntroPage from './components/pages/IntroPage';

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/vim-tutor",
    element: <MainPage />,
  },
  {
    path: "/stats",
    element: <StatsPage />,
  },
  {
    path: "/vim-tutor/stats",
    element: <StatsPage />,
  },
  {
    path: "/imprint",
    element: <ImprintPage />,
  },
  {
    path: "/vim-tutor/imprint",
    element: <ImprintPage />,
  },
  {
    path: "/intro",
    element: <IntroPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <HashRouter>
        <Header />
        <MyCommandPalette />
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
