import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import NewMaterialRoute from "./routes/NewMaterialRoute.jsx";
import HomeRoute from "./routes/HomeRoute.jsx";
import HomeDashboardRoute from "./routes/HomeDashboardRoute.jsx";
import FolderContentRoute from "./routes/FolderContentRoute.jsx";
import NewFolderRoute from "./routes/NewFolderRoute.jsx";
import MaterialContentRoute from "./routes/MaterialContentRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/home",
        element: <HomeRoute />,
    },
    {
        path: "/home/u/:year",
        element: <HomeDashboardRoute />,
    },
    {
        path: "/home/u/:year/folders/new",
        element: <NewFolderRoute />,
    },
    {
        path: "/home/u/:year/folders/:id",
        element: <FolderContentRoute />,
    },
    {
        path: "/home/u/:year/materials/:id",
        element: <MaterialContentRoute />,
    },
    {
        path: "/home/u/:year/materials/new",
        element: <NewMaterialRoute />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
