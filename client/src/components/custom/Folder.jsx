/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

function Folder({ folder }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();

    useEffect(() => {
        if (folder) {
            setValue("name", folder.name);
            setValue("year", folder.year);
        }
    }, []);

    const handleClick = async (id) => {
        const res = await axios.delete(`${BASE_URL}/folders/${id}`);
        console.log(res.data.deletedFolder);
    };

    const onSubmit = async (data) => {
        setDialogOpen(false);
        const res = await axios.patch(
            `${BASE_URL}/folders/${folder._id}`,
            data
        );
        console.log(res.data);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

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

                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger>
                        <Button variant="ghost" onClick={openDialog}>
                            Edit
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Folder</DialogTitle>
                            <DialogDescription>
                                Enter the modifications you would like to make
                                to this folder here.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="year"
                                        className="text-right"
                                    >
                                        Year
                                    </Label>
                                    <Input
                                        id="year"
                                        className="col-span-3"
                                        {...register("year")}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <Button
                    variant="ghost"
                    onClick={() => {
                        handleClick(folder._id);
                    }}
                >
                    Delete
                </Button>
            </Card>
        </>
    );
}

export default Folder;
