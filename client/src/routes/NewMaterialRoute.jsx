import React from "react";

function NewMaterialRoute() {
    return (
        <form
            action="http://localhost:3000/files"
            method="POST"
            encType="multipart/form-data"
        >
            <input type="file" name="avatar" />
            <button>Submit</button>
        </form>
    );
}

export default NewMaterialRoute;
