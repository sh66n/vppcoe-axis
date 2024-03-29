import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FoldersList from "@/components/custom/FoldersList";
import MaterialsList from "@/components/custom/MaterialsList";
import NewFolderForm from "@/components/custom/NewFolderForm";

const BASE_URL = "http://localhost:3000/api";

function FolderContentRoute() {
    const { id } = useParams();
    const [children, setChildren] = useState([]);
    const [hasChildren, setHasChildren] = useState(false);
    const [materials, setMaterials] = useState([]);

    useEffect(() => {
        const getChildren = async () => {
            const res = await axios.get(`${BASE_URL}/folders/${id}`);
            setHasChildren(res.data.hasChildren);
            if (res.data.hasChildren) {
                const { childFolders } = res.data;
                setChildren(childFolders);
            }
        };
        getChildren();
    }, [children]);

    useEffect(() => {
        const getMaterial = async () => {
            const res = await axios.post(`${BASE_URL}/folder`, {
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

    const updateChildren = (newFolder) => {
        setChildren([...children, newFolder]);
    };

    return (
        <>
            <div style={{ height: "100vh", width: "100vw" }}>
                {hasChildren ? (
                    <div>
                        <FoldersList folders={children} />
                        <NewFolderForm updateChildren={updateChildren} />
                    </div>
                ) : (
                    <div>
                        <h1>No folders here! Add some?</h1>
                        <NewFolderForm updateChildren={updateChildren} />
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
