/* eslint-disable react/prop-types */
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useLocation } from "react-router-dom";

function Folder({ folder }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    <a
                        href={`http://localhost:5173/home/u/1/folders/${folder._id}`}
                    >
                        {folder.name}
                    </a>
                </CardTitle>
                <CardDescription>{folder._id}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default Folder;
