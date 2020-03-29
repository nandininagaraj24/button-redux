import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
//import {setOrgName} from "../reducers/org";
import * as actions from "./reducers/displayReducer";
import {debounce} from "lodash";

class HeaderComponent extends Component {
    handleChange = (e) => {
        console.log(e)
       /* _.debounce((e) => {
            this.props.setInputVal(e.target.value)
        }, 1000);*/
        this.props.setInputVal(e.target.value)
    }
    render(){
        return(
            <div className="search">
                <span className="fa fa-search"/>
                <input className="header-input" defaultValue={this.props.orgname} onChange={this.handleChange}
                       placeholder="Search Organization"/>
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