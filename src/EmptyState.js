import React from "react";
import github from "./images/github-mark.png";
import "./css/EmptyState.css";

const EmptyState = () => {
    return (
        <div className="empty-state">
            <img src={github} alt="Logo" height="350" width="500"/>
            <div className="empty-state-text">Enter the name of an organization to view repositories and commits on GitHub</div>
        </div>
    )
};

export default EmptyState;