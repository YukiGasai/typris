import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import CommandPalette from 'react-command-palette';
import { commands } from './helper/commands';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainPage from './components/pages/MainPage';
import ImprintPage from './components/pages/ImprintPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/imprint",
    element: <ImprintPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <CommandPalette
        trigger={<></>}
        commands={commands}
        closeOnSelect={true}
        resetInputOnOpen={true}
        resetCommandsOnOpen={true}
        maxDisplayed={100}
        onRequestClose={document.getElementById('tetrisGameContainer')?.focus()}
        hotKeys={["command+shift+p","command+k", "esc"]}
      />
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
