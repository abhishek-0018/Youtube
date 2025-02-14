import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App.jsx'
import Header from './Header.jsx'
import Landingpage from "./landingPage.jsx";

const AppLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: [<AppLayout />],
    children: [
      {
        path: "/",
        element: (
          <>
          <Landingpage/>
          </>
        ),
      },
    ],
  },
]);

const r = ReactDOM.createRoot(document.getElementById("root"));
r.render(<RouterProvider router={appRouter} />);
