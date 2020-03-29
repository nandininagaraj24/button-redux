import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
//import {setOrgName} from "../reducers/org";
import * as actions from "./reducers/displayReducer";
import {debounce} from "lodash";
import "./css/RepoView.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands';

class HeaderComponent extends Component {

    setSearchTerm = debounce(searchTerm => {
        this.props.setInputVal(searchTerm)
    }, 1000);

    setCategory = (e) => {
        console.log(e.target.value)
        this.props.setOrderCategory(e.target.value)
    }

    setDirection = (e) => {
        //const direction = e.target.getAttribute("name");
        this.props.setSortDirection(e.target.value);
    }

    render(){
        return(
            <div className="search">
                <span className="fa fa-search"/>
                <input className="header-input" defaultValue={this.props.orgname}  onChange={e => {this.setSearchTerm(e.target.value)}}/>
                <div className="table-controls">
                    <div>View By</div>
                <select onChange={this.setCategory}>
                    <option value="name">Name</option>
                    <option value="forks">Forks</option>
                    <option value="language">Language</option>
                    <option value="openissues">Open Issues</option>
                    <option value="updatedat">Updated At</option>
                </select>
                <select onChange={this.setDirection}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.orgname
})

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);