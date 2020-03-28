import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import GetTableView from "./CommitsTable";
import {connect} from "react-redux";
import * as actions from "./reducers/displayReducer";

class CommitsView extends Component{

    state={
        commitData: [],
        dataKeys: ["name", "email", "date"],
        columns: ["name", "email", "date"]
    };

    componentWillMount(){
        this.fetchCommitInfo();
    }

    fetchCommitInfo = () => {
        const {orgname, repoSelected} = this.props;
        fetch(`https://api.github.com/repos/${orgname}/${repoSelected}/commits`)
            .then(res => res.json())
            .then((response) => {
                if(response.message === "Not Found"){
                    this.setState({
                        commitData: [],
                        noinfo: true
                    })
                }
                else {
                    let processedResponse = response.map((value) =>{
                        return {
                            name: value.commit.committer.name,
                            email: value.commit.committer.email,
                            date: value.commit.committer.date,
                        }
                    });
                    this.setState({
                        commitData: processedResponse,
                        noinfo: false
                    })
                }
            })
            .catch(() =>{
                this.setState({
                    commitData: [],
                    noinfo: true
                })
            })
    };

    render() {
        const {columns, dataKeys, commitData} = this.state;
        return(
            <div>
                <div style={{display: "flex"}}>
                    <div onClick={ () => this.props.changeViewComponent("repo", "")}> Repositories</div>
                    <div> Commits</div>
                </div>
                <GetTableView columns={columns} data={commitData} dataKeys={dataKeys}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.orgname,
    repoSelected: state.repoSelected
})

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitsView);