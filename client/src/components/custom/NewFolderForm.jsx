import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const BASE_URL = "http://localhost:3000/api";

function NewFolderForm({ updateChildren }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const { year } = useParams();
    const { id } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        reset();
        setDialogOpen(false);

        data.year = year;
        if (id) {
            data.isNested = true;
            data.parentId = id;
        } else {
            data.isNested = false;
        }

        const res = await axios.post(`${BASE_URL}/folders`, data);
        updateChildren(res.data);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };
    const closeDialog = (e) => {
        e.preventDefault();
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>
                <Button variant="ghost" onClick={openDialog}>
                    New +
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add new folder</DialogTitle>
                    <DialogDescription>
                        Mention the details for your folder here.
                    </DialogDescription>
                </DialogHeader>
                <form>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                {...register("name")}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit(onSubmit)}>
                            Create
                        </Button>
                        <Button onClick={closeDialog}>Cancel</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default NewFolderForm;
