import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./reducers/displayReducer";
import {Table, Spin} from "antd";
import "./css/CommitsView.css";
import {formatDateAndTime} from "./helpers/utils";

class CommitsView extends Component{

    state={
        commitData: [],
        dataKeys: ["name", "email", "date"],
        columns: [ {
            title: 'SHA',
            dataIndex: 'sha',
            key: 'sha'
        },{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        }, {
            title: 'Date',
            dataIndex: 'date',
            key: 'date'
        }],
        loading: false
    };

    componentWillMount(){
        this.fetchCommitInfo();
    }
    fetchCommitInfo = () => {
        const {orgname, repoSelected} = this.props;
        this.setState({loading: true});
        fetch(`https://api.github.com/repos/${orgname}/${repoSelected}/commits`)
            .then(res => res.json())
            .then((response) => {
                if(response.message === "Not Found"){
                    this.setState({
                        commitData: [],
                        noinfo: true,
                        loading: false
                    })
                }
                else {
                    let processedResponse = response.map((value,  index) =>{
                        return {
                            key: index,
                            name: value.commit.committer.name,
                            email: value.commit.committer.email,
                            date: formatDateAndTime(value.commit.committer.date),
                            sha: value.sha
                        }
                    });
                    processedResponse.sort((a, b) =>{
                        const valA = new Date(a.date);
                        const valB = new Date(b.date);
                        return (valB !== valA ? valB < valA ? -1 : 1 : 0);
                    });
                    this.setState({
                        commitData: processedResponse,
                        noinfo: false,
                        loading: false
                    })
                }
            })
            .catch(() =>{
                this.setState({
                    commitData: [],
                    noinfo: true,
                    loading: false
                })
            })
    };

    render() {
        const {columns, commitData} = this.state;
        const {repoSelected} = this.props;
        return(
            <div className="commits-view">
                <div className="view-navigator" style={{display: "flex"}}>
                    <div className="active" onClick={ () => this.props.changeViewComponent("repo", "")}>Back to Repositories</div>
                    <div> > </div>
                    <div>Commits for {repoSelected}</div>
                </div>
                {this.state.loading? <Spin />:
                    <Table columns={columns} key={"key"} dataSource={commitData}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.orgname,
    repoSelected: state.repoSelected
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitsView);