import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import TableView from "./TableView";
import {connect} from "react-redux";
import "../css/RepoView.css";

class RepoView extends Component{

    render() {
        return(
            <div className="repo-view">
                <HeaderComponent/>
                <TableView orgname={this.props.orgname} setView={this.props.setView}/>
            </div>
        )
    }
}

export const mapStateToProps = (state) =>({
    orgname: state.appReducer.orgname
});

export default connect(mapStateToProps)(RepoView);