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

function Material({ material }) {
    return (
        <Card style={{ backgroundColor: "blue" }}>
            <CardHeader>
                <CardTitle>
                    <a
                        href={`http://localhost:5173/home/u/1/materials/${material._id}`}
                    >
                        {material.title}
                    </a>
                </CardTitle>
                <CardDescription>{material._id}</CardDescription>
            </CardHeader>
        </Card>
    );
}

export default Material;
