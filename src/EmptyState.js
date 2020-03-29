import React from "react";
import github from "./images/searchEmptyState.png";
import "./css/EmptyState.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const EmptyState = () => {
    return (
        <div className="empty-state">
            <img src={github} alt="Logo" height="300" width="600"/>
            <div className="empty-state-text"> NO RESULTS </div>
            <div className="empty-state-text">Search for the name of an organization to view repositories and commits on GitHub <i className="fab fa-github"/></div>
        </div>
    )
};

export default EmptyState;