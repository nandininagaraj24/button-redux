import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import * as actions from "../reducers/AppReducer";
import {debounce} from "lodash";
import "../css/RepoView.css";
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands';

/*
    This is a controlled component which
     renders the input bar where the user
     searches for an organization
 */
class HeaderComponent extends Component {

    /* Adding delay to call the API's to prevent
        calls on every single key press
     */
    setSearchTerm = debounce(searchTerm => {
        this.props.setInputVal(searchTerm)
    }, 1000);

    render(){
        return(
            <div className="search">
                <span className="fa fa-search"/>
                <input className="header-input" placeholder="Search Organization Name" defaultValue={this.props.orgname}
                       onChange={e => {this.setSearchTerm(e.target.value)}}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.appReducer.orgname
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);