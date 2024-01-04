import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import MainPage from './pages/MainPage';
import ImprintPage from './pages/ImprintPage';
import MyCommandPalette from './palette/MainCommandPalette';
import Header from './Header';
import Footer from './Footer';
import StatsPage from './pages/StatsPage';
import IntroPage from './pages/IntroPage';
import SettingsPage from './pages/SettingsPage';
import { Theme } from '../helper/settingsObjects';
import { settings, user } from '../helper/gameSignals';
import { jwtDecode } from 'jwt-decode';
export const getTheme = (theme) => {
  switch (theme) {
    default:
    case Theme.Paper:
      return ({
        colors: {
          background: '#eee',
          primary: '#444',
          secondary: '#b2b2b2',
          tertiary: '#ddd',
          highlight: 'rgb(170, 50, 220)',
        },
        fonts: {
          primary: 'Consolas, monaco, monospace',
          secondary: 'Pixel, Arial, sans-serif',
        },
        screens: {
          mobile: '700px',
        }
      })
    case Theme.Github:
      return ({
        colors: {
          background: '#111',
          primary: '#eee',
          secondary: '#444',
          tertiary: '#191919',
          highlight: '#791717',
        },
        fonts: {
          primary: 'Consolas, monaco, monospace',
          secondary: 'Pixel, Arial, sans-serif',
        },
        screens: {
          mobile: '700px',
        }
      })
  }
}

const App = () => {
    useEffect(() => {
  if(window.location.href.includes("token=")){
    const token = window.location.href.split("token=")[1];
    window.localStorage.setItem("token", token);
    //Get user from jwt token
    const newUser = jwtDecode(token);
    user.value = newUser;
    //Remove token from url
    window.history.replaceState({}, document.title, "/");
  }
}, [window.location.pathname])

    return (
        <HashRouter>
        <ThemeProvider theme={{...getTheme(settings.value[Theme._Key])}}>
          <StyledApp>
            <Header />
            <MyCommandPalette />
            <ToastContainer />
            <main>
              <Routes>
                <Route exact path='/' Component={MainPage} />
                <Route exact path='/stats' Component={StatsPage} />
                <Route exact path='/imprint' Component={ImprintPage} />
                <Route exact path='/intro' Component={IntroPage} />
                <Route exact path='/settings' Component={SettingsPage} />
              </Routes>
            </main>
            {/* <Footer /> */}
          </StyledApp>
        </ThemeProvider>
      </HashRouter>
    );
}

const StyledApp = styled.div`
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.primary};
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1rem;
  line-height: 1.5;
  text-align: left;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  width: 100%;
  height: 100%;

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  a{
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
  }
`;

export default App;