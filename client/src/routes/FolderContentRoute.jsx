import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoldersList from "@/components/custom/FoldersList";
import MaterialsList from "@/components/custom/MaterialsList";
import NewFolderForm from "@/components/custom/NewFolderForm";

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
            if (currentFolder.childFolders.length > 0) {
                const seedNestedFolders = [];
                currentFolder.childFolders.forEach(async (folder) => {
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
    }, [nestedFolders]);

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
    }, [materials]);

    return (
        <>
            <div style={{ height: "100vh", width: "100vw" }}>
                {/* You are viewing {id} for {year}st year */}
                {nestedFolders && nestedFolders.length > 0 ? (
                    <>
                        <FoldersList folders={nestedFolders} />
                        <NewFolderForm />
                    </>
                ) : (
                    <div>
                        <h1>No folders here! Create some?</h1>
                        <NewFolderForm />
                    </div>
                )}
                {materials.length > 0 ? (
                    <MaterialsList materials={materials} />
                ) : (
                    <h1>No materials here! Upload some?</h1>
                )}
            </div>
            <NewFolderForm />
        </>
    );
}

export default FolderContentRoute;
