import React from "react";
import Material from "./Material";

function MaterialsList({ materials }) {
    return (
        <div style={{ backgroundColor: "blue" }}>
            <h1>Materials List</h1>

            {materials &&
                materials.map((material) => {
                    return <Material key={material._id} material={material} />;
                })}
        </div>
    );
}

export default MaterialsList;
