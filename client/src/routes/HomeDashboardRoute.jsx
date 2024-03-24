import React, { useState, useEffect } from "react";
import FoldersList from "@/components/custom/FoldersList";
import { Button } from "react-day-picker";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

function HomeDashboardRoute() {
    const [folders, setFolders] = useState();
    useEffect(() => {
        async function getData() {
            const allFolders = await axios.get(`${BASE_URL}/folders`);
            setFolders(allFolders.data);
        }
        getData();
    }, []);

    return (
        <div>
            <FoldersList folders={folders} />
        </div>
    );
}

export default HomeDashboardRoute;
