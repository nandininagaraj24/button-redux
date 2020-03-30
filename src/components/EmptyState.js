import React from "react";
import search from "../images/searchEmptyState.png";
import "../css/EmptyState.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

/* Returns the empty state of the application when the
    user has not entered a search criteria
 */
const EmptyState = () => {
    return (
        <div className="empty-state">
            <img src={search} alt="Logo" height="300" width="600"/>
            <div className="empty-state-text header"> NO RESULTS </div>
            <div className="empty-state-text help-text">
                Search for the name of an organization to view repositories and commits on GitHub
                <i className="fab fa-github"/>
            </div>
        </div>
    )
};

export default EmptyState;