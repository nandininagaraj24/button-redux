import React from "react";

/* Renders the action controls for the table
    which allows the user to toggle the criteria of
    data ordering
    and the direction of order - ascending/ descending
 */
const GetTableControls = (props) => {

    const setCategory = (e) => {
        props.setOrderCategory(e.target.value)
    };

    const setDirection = (e) => {
        props.setSortDirection(e.target.value);
    };

    return (<div className="table-controls">
        <div>View By</div>
        <select onChange={setCategory}>
            <option value="name">Name</option>
            <option value="forks">Popularity</option>
            <option value="language">Language</option>
            <option value="openissues">Open Issues</option>
            <option value="updatedat">Updated At</option>
        </select>
        <select onChange={setDirection}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    </div>);
};

export default GetTableControls;