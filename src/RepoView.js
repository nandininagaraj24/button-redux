import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import TableView from "./TableView";
import {connect} from "react-redux";

class RepoView extends Component{

    state = {
        orgname: ""
    };

    setOrgNameInput = (orgname) => {
        this.setState({orgname});
    };

    render() {
        return(
            <div>
                <HeaderComponent setOrgNameInput={this.setOrgNameInput} orgname={this.state.orgname}/>
                <TableView orgname={this.props.orgname} setView={this.props.setView}/>
            </div>
        )
    }
}

export const mapStateToProps = (state) =>({
    orgname: state.orgname
});

export default connect(mapStateToProps)(RepoView);