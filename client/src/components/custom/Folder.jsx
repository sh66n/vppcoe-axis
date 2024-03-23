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

function Folder({ folder }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{folder.name}</CardTitle>
                <CardDescription>{folder._id}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default Folder;
