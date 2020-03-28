import React, {Component} from "react";
import RepoView from "./RepoView";
import CommitsView from "./CommitsView";
import {connect} from "react-redux";

class View extends Component{

    getViewComponent = (attribute) => {
        switch(attribute){
            case "repo": return <RepoView setView={this.setView}/>;
            case "commits": return <CommitsView setView={this.setView}/>
            default: return null;
        }
    };

    render(){
        return (<div>
            {this.getViewComponent(this.props.component)}
        </div>)
    }
}

const mapStateToProps = (state) => ({
    component: state.component
})

export default connect(mapStateToProps)(View);
