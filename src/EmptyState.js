import React from "react";
import github from "./images/github-mark.png";
import "./css/EmptyState.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const EmptyState = () => {
    return (
        <div className="empty-state">
            <img src={github} alt="Logo" height="350" width="500"/>
            <i class="fab fa-github"></i>
            <div className="empty-state-text">Enter the name of an organization to view repositories and commits on GitHub</div>
        </div>
    )
};

export default EmptyState;