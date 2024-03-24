import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoldersList from "@/components/custom/FoldersList";
import MaterialsList from "@/components/custom/MaterialsList";
import NewMaterialForm from "@/components/custom/NewMaterialForm";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const BASE_URL = "http://localhost:3000";

function FolderContentRoute() {
    const { year, id } = useParams();
    const [nestedFolders, setNestedFolders] = useState([]);
    const [materials, setMaterials] = useState([]);
    useEffect(() => {
        const checkChildren = async () => {
            const res = await axios.post(`${BASE_URL}/api/folder`, {
                id,
            });
            const currentFolder = res.data;
            if (currentFolder.folders.length > 0) {
                const seedNestedFolders = [];
                currentFolder.folders.forEach(async (folder) => {
                    seedNestedFolders.push(folder);
                });
                setNestedFolders(seedNestedFolders);
            } else {
                setNestedFolders(null);
            }
        };
        checkChildren();
        // const getChildren = async () => {
        //     const childFolder = await axios.post(BASE_URL);
        // };
    }, [setNestedFolders]);

    useEffect(() => {
        const getMaterial = async () => {
            const res = await axios.post(`${BASE_URL}/api/folder`, {
                id,
            });
            const currentFolder = res.data;
            if (currentFolder.materials.length > 0) {
                const seedMaterial = [];
                currentFolder.materials.forEach(async (material) => {
                    seedMaterial.push(material);
                });
                setMaterials(seedMaterial);
            }
        };
        getMaterial();
    }, []);
    return (
        <div>
            {/* You are viewing {id} for {year}st year */}
            {nestedFolders && nestedFolders.length > 0 ? (
                <>
                    <FoldersList folders={nestedFolders} />
                </>
            ) : (
                <div>
                    <h1>No folders here! Create some?</h1>
                </div>
            )}
            {materials.length > 0 ? (
                <MaterialsList materials={materials} />
            ) : (
                <h1>No materials here! Upload some?</h1>
            )}
            {/* <Dialog>
                <ContextMenu>
                    <ContextMenuTrigger>
                        <div
                            style={{
                                width: "100vw",
                                height: "100vh",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "pink",
                            }}
                        >
                            hello
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>Profile</ContextMenuItem>
                        <ContextMenuItem>Billing</ContextMenuItem>
                        <ContextMenuItem>Team</ContextMenuItem>
                        <DialogTrigger asChild>
                            <ContextMenuItem>
                                <span>Open</span>
                            </ContextMenuItem>
                        </DialogTrigger>
                    </ContextMenuContent>
                </ContextMenu>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when
                            you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                value="Pedro Duarte"
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Username
                            </Label>
                            <Input
                                id="username"
                                value="@peduarte"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog> */}
        </div>
    );
}

export default FolderContentRoute;
