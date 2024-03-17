import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import NewFileRoute from "./routes/NewFileRoute.jsx";
import FilesRoute from "./routes/FilesRoute.jsx";

const router = createBrowserRouter([
    {
        path: "/files",
        element: <FilesRoute />,
    },
    {
        path: "/files/new",
        element: <NewFileRoute />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
