import React from "react";

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
            <option value="forks">Forks</option>
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