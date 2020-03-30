import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import TableView from "./TableView";
import EmptyState from "./EmptyState";
import {connect} from "react-redux";
import "../css/RepoView.css";

/* Container component to display the
    header controls for the table
    and the table listing the repositories
 */
class RepoView extends Component{

    getComponent = (orgname, isPatternMatched) => {
        if(orgname.length > 0 && isPatternMatched){
            return <TableView orgname={this.props.orgname} setView={this.props.setView}/>
        }
        else{
         return <EmptyState/>;
        }
    };

    render() {
        return(
            <div className="repo-view">
                <HeaderComponent/>
                {this.getComponent(this.props.orgname, this.props.isPatternMatched)}
            </div>
        )
    }
}

export const mapStateToProps = (state) =>({
    orgname: state.appReducer.orgname,
    isPatternMatched: state.appReducer.isPatternMatched
});

export default connect(mapStateToProps)(RepoView);