import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

function NewMaterialForm({ destinationFolderId }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("destinationFolderId", destinationFolderId);
        formData.append("content", data.content[0]);
        try {
            const res = await axios.post(`${BASE_URL}/materials`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(res);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
            <input type="text" {...register("title")} />
            <input type="file" {...register("content")} />
            <button>Submit</button>
        </form>
    );
}

export default NewMaterialForm;
