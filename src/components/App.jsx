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
import StatsPage from './pages/StatsPage';
import IntroPage from './pages/IntroPage';
import SettingsPage from './pages/SettingsPage';
import BooksPage from './pages/BooksPage';
import { FancyCursor, Theme } from '../helper/settingsObjects';
import { settings } from '../helper/gameSignals';
import { createGlobalStyle } from 'styled-components'

import FancyCursorElement from './FancyCursor';
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
          highlight: '#aa32dc',
          tetrominos: {
            I: "#50e3e6",
            J: "#245fdf",
            L: "#dfad24",
            O: "#dfad24",
            S: "#30d338",
            T: "#843dc6",
            Z: "#e34e4e",
            error: "#ff4754",
            fill: true
          }
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
          highlight: '#2ea043',
          tetrominos: {
            I: "#50e3e6",
            J: "#245fdf",
            L: "#dfad24",
            O: "#dfad24",
            S: "#30d338",
            T: "#843dc6",
            Z: "#e34e4e",
            error: "#ff4754",
            fill: true
          }
        },
        fonts: {
          primary: 'Consolas, monaco, monospace',
          secondary: 'Pixel, Arial, sans-serif',
        },
        screens: {
          mobile: '700px',
        }
      })
    case Theme.Drakula:
      return ({
        colors: {
          background: '#282a36',
          primary: '#6272a4',
          secondary: '#454864',
          tertiary: '#171a25',
          highlight: '#bd93f9',
          tetrominos: {
            I: "#8be9fd",
            J: "#ffb86c",
            L: "#ff79c6",
            O: "#bd93f9",
            S: "#f1fa8c",
            T: "#ff79c6",
            Z: "#8be9fd",
            error: "#f8f8f2",
            fill: false
          }
        },
        fonts: {
          primary: 'Consolas, monaco, monospace',
          secondary: 'Pixel, Arial, sans-serif',
        },
        screens: {
          mobile: '700px',
        }
      })
      case Theme.Catppuccin:
        return ({
          colors: {
            background: '#242839',
            primary: '#cad3f5',
            secondary: '#454864',
            tertiary: '#2e344b',
            highlight: '#a6da95',
            tetrominos: {
              I: "#ed8796",
              J: "#f5a97f",
              L: "#eed49f",
              O: "#a6da95",
              S: "#7dc4e4",
              T: "#c6a0f6",
              Z: "#ed8796",
              error: "#d0d9fb",
              fill: false
            }
          },
          fonts: {
            primary: 'Consolas, monaco, monospace',
            secondary: 'Pixel, Arial, sans-serif',
          },
          screens: {
            mobile: '700px',
          }
        })
        case Theme.Vaporwave:
          return ({
            colors: {
              background: '#0a0c37',
              primary: '#ff61c6',
              secondary: '#375971',
              tertiary: '#171a25',
              highlight: '#ff9900',
              tetrominos: {
                I: "#5cecff",
                J: "#375971",
                L: "#ff9900",
                O: "#f4ff61",
                S: "#f1fa8c",
                T: "#ff79c6",
                Z: "#8be9fd",
                error: "#f8f8f2",
                fill: false
              }
            },
            fonts: {
              primary: 'Consolas, monaco, monospace',
              secondary: 'Pixel, Arial, sans-serif',
            },
            screens: {
              mobile: '700px',
            }
        })
      case Theme['Tokio Night']:
        return ({
          colors: {
            background: '#1a1b26',
            primary: '#a9b1d6',
            secondary: '#414868',
            tertiary: '#414868',
            highlight: '#7dcfff',
            tetrominos: {
              I: "#ff9e64",
              J: "#9ece6a",
              L: "#73daca",
              O: "#7aa2f7",
              S: "#bb9af7",
              T: "#7dcfff",
              Z: "#c0caf5",
              error: "#f7768e",
              fill: false
            }
          },
          fonts: {
            primary: 'Consolas, monaco, monospace',
            secondary: 'Pixel, Arial, sans-serif',
          },
          screens: {
            mobile: '700px',
          }
      })
      case Theme['Cotton Candy']:
      return ({
        colors: {
          background: '#ede9e4',
          primary: '#a3cff7',
          secondary: '#f5d5ef',
          tertiary: '#a3cff7',
          highlight: '#f5d5ef',
          tetrominos: {
            I: "#756AB6",
            J: "#AC87C5",
            L: "#E0AED0",
            O: "#433d69",
            S: "#756AB6",
            T: "#AC87C5",
            Z: "#E0AED0",
            error: "#F6D6DD",
            fill: true
          }
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
  if(window.location.href.includes("?token=")){
    const [url, token] = window.location.href.split("?token=");
    window.localStorage.setItem("token", token);
    window.location.href = url;
  }
}, [window.location.href])

    return (
        <HashRouter>
        <ThemeProvider theme={{...getTheme(settings.value[Theme._Key])}}>
          <GlobalStyle fancyCursor={settings.value[FancyCursor._Key] ? true : false}/>
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
                <Route exact path='/books' Component={BooksPage } />
              </Routes>
            </main>
            {/* <Footer /> */}
            {settings.value[FancyCursor._Key] === true && <FancyCursorElement />}
          </StyledApp>
        </ThemeProvider>
      </HashRouter>
    );
}

const GlobalStyle = createGlobalStyle`
  * {
     ${props => props.fancyCursor && 'cursor: none !important;'}
  }
`

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