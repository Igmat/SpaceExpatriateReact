import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { StartWindow } from "./components/StartWindow";
import { GamePage } from "./components/TestGamePage";
import { BrowserRouter } from 'react-router-dom';
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { 
        path: "/", 
      element: <StartWindow /> },
      {
        path: "/game",
        element: <GamePage />,
      },
     
     
    ],
  },
]);*/

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<StartWindow/>} />
        <Route path="game" element={<GamePage />} />
      </Route>
    </Routes>
      </BrowserRouter>
    {/* <RouterProvider router={router} />*/}
 
  </React.StrictMode>
);

reportWebVitals();
