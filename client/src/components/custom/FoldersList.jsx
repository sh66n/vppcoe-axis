/* eslint-disable react/prop-types */
import React from "react";
import Folder from "./Folder";

function FoldersList({ folders }) {
    return (
        <div>
            Folders List
            {folders &&
                folders.map((folder) => {
                    return <Folder key={folder._id} folder={folder} />;
                })}
        </div>
    );
}

export default FoldersList;
