import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

function NewFolderForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const res = await axios.post(`${BASE_URL}/folders`, data);
        console.log(res);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("name")} />
            <button>Submit</button>
        </form>
    );
}

export default NewFolderForm;
