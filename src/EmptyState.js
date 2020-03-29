import React from "react";
import "./css/RepoView.css";

const EmptyState = () => {
    return (
        <div>
            <i className="fab fa-github"/>
            <div>Search the name of an organization to view repositories and commits</div>
        </div>
    )
};

export default EmptyState;