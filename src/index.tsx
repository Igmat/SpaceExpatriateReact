import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Game } from "./Pages/Game";
import { LoadGame } from "./Pages/LoadGame";

const link = document.querySelector("base") as HTMLBaseElement;
const basenameLink = link.getAttribute("href") as string;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/game",
        element: <Game />,
        children: [{ path: ":gameId", element: <Game /> }],
      },
      {
        path:"/loadgame",
        element: <LoadGame />,
      }
    ],
  },
], {basename: basenameLink});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
