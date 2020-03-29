import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
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
    orgname: state.orgname
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);