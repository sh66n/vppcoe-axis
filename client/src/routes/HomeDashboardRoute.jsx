import React, { useState, useEffect } from "react";
import FoldersList from "@/components/custom/FoldersList";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewFolderForm from "@/components/custom/NewFolderForm";

const BASE_URL = "http://localhost:3000/api";

function HomeDashboardRoute() {
    const { year } = useParams();
    const [folders, setFolders] = useState();
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${BASE_URL}/folders`, {
                params: {
                    year: year,
                    isNested: false,
                },
            });
            setFolders(response.data.filteredFolders);
        }
        getData();
    }, [folders]);

    return (
        <>
            <FoldersList folders={folders} />
            <NewFolderForm />
        </>
    );
}

export default HomeDashboardRoute;
