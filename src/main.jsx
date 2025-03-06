import ReactDOM from "react-dom/client";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import App from './App.jsx'
import Landingpage from "./Landingpage.jsx";
import Header from "./Header.jsx";
import VideoUpload from "./videoUpload.jsx";
import SearchedUser from "./searchedUser.jsx";

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
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
          <Landingpage/>
          </>
        ),
      },
      {
        path: "/user",
        element: (
          <>
          <Header/>,<App/>
          </>
        ),
      },
      {
        path: "/videoUpload",
        element: (
          <>
          <VideoUpload/>
          </>
        ),
      },
      {
        path: "/searchedUser",
        element: (
          <>
          <Header/>,<SearchedUser/>
          </>
        ),
      },
    ],
  },
]);

const r = ReactDOM.createRoot(document.getElementById("root"));
r.render(<RouterProvider router={appRouter} />);
