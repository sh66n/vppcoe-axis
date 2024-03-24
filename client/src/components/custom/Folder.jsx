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
import { Button } from "@/components/ui/button";

function Folder({ folder }) {
    return (
        <>
            <Card style={{ backgroundColor: "pink" }}>
                <CardHeader>
                    <CardTitle>
                        <a
                            href={`http://localhost:5173/home/u/1/folders/${folder._id}`}
                        >
                            {folder.name}
                        </a>
                    </CardTitle>
                    Year {folder.year}
                    <CardDescription>{folder._id}</CardDescription>
                </CardHeader>

                <Button variant="ghost">Edit</Button>
                <Button variant="ghost">Delete</Button>
            </Card>
        </>
    );
}

export default Folder;
