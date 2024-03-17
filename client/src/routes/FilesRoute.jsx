import React from "react";

function FilesRoute() {
    return (
        <div>
            <h1>pdf</h1>
            <iframe
                src="https://res.cloudinary.com/ddmjczaqq/image/upload/v1710658831/Axis/pjbv8iddqsl4rxziwf1y.pdf"
                width="800"
                height="500"
            ></iframe>
            <object
                data="https://res.cloudinary.com/ddmjczaqq/image/upload/v1710658831/Axis/pjbv8iddqsl4rxziwf1y.pdf"
                type="application/pdf"
                height="500"
                width="500"
            ></object>
        </div>
    );
}

export default FilesRoute;
