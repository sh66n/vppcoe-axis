import React, { useState, useEffect } from "react";
import FoldersList from "@/components/custom/FoldersList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";

const BASE_URL = "http://localhost:3000/api";

function HomeDashboardRoute() {
    const { year } = useParams();
    const [folders, setFolders] = useState();
    useEffect(() => {
        async function getData() {
            const response = await axios.post(`${BASE_URL}/folders`, {
                year,
                isNested: false,
            });
            setFolders(response.data.filteredFolders);
        }
        getData();
    }, [folders]);

    return (
        <>
            <FoldersList folders={folders} />
        </>
    );
}

export default HomeDashboardRoute;
