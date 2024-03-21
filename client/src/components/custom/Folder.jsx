import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

function Folder() {
    const [folders, setFolders] = useState();
    useEffect(() => {
        async function getData() {
            const allFarmers = await axios.get(`${BASE_URL}/folders`);
            console.log(allFarmers.data);
            setFolders(allFarmers.data);
        }
        getData();
    }, []);
    return (
        <div>
            <h1>All folders</h1>
            {folders &&
                folders.map((folder) => {
                    return (
                        <Card key={folder._id}>
                            <CardHeader>
                                <CardTitle>{folder.name}</CardTitle>
                                <CardDescription>{folder._id}</CardDescription>
                            </CardHeader>
                        </Card>
                    );
                })}
        </div>
    );
}

export default Folder;
