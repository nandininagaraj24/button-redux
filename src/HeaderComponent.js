import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
//import {setOrgName} from "../reducers/org";
import * as actions from "./reducers/displayReducer";

class HeaderComponent extends Component {
    handleChange = (e) => {
        console.log(e)
        this.props.setInputVal(e.target.value);
    }
    render(){
        return(
            <Fragment>
                <input  defaultValue={this.props.orgname} onChange={this.handleChange} />
            </Fragment>
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