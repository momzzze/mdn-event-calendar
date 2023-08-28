import React from "react";

const SingleComponent = ({ event }) => {
    return (
        <div className="rectangular-container w-300 h-150 bg-gray-200 border border-gray-300 p-20 box-border">
            <div className="content font-sans text-base text-gray-700">
                <h1 className="text-xl font-bold">{event.title}</h1>
                <p>{event.location}</p>
            </div>
        </div>
    );
};

export default SingleComponent;
