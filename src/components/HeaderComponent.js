import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import * as actions from "../reducers/AppReducer";
import InputError from "./InputError";
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

    /* Input validation pattern match so that
        there are no scripts of wild card patterns passed by the user
     */
    checkIfPatternMatchesRepoName = (value) => {
        return /^([a-zA-Z0-9-_. ]{0,50})$/.test(value);
    };

    /* Adding delay to call the API's to prevent
        calls on every single key press
     */
    setSearchTerm = debounce(searchTerm => {
        const patternMatched = this.checkIfPatternMatchesRepoName(searchTerm);
        this.props.setInputVal(searchTerm, patternMatched)
    }, 1000);

    render(){
        return(
            <div className="search">
                <span className="fa fa-search"/>
                <input className="header-input" placeholder="Search Organization Name" defaultValue={this.props.orgname}
                       onChange={e => {this.setSearchTerm(e.target.value)}}/>
                {!this.props.isPatternMatched? <InputError />: null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.appReducer.orgname,
    isPatternMatched: state.appReducer.isPatternMatched
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);