import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "../reducers/AppReducer";
import {Table, Spin} from "antd";
import "../css/CommitsView.css";
import {formatDateAndTime} from "../helpers/utils";
import BreadCrumbs from "./Breadcrumbs";


/* This is the container for the table that
    shows details about the commits in a
    repository selected by the user

    It also renders the Breadcrumbs component
 */
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

    setCommitsTableParams = (commitData, noinfo, loading ) => {
        this.setState({commitData, noinfo, loading});
    };

    /* Github API call that gets the list of all commits within the repo*/

    fetchCommitInfo = () => {
        const {orgname, repoSelected} = this.props;
        this.setState({loading: true});
        fetch(`https://api.github.com/repos/${orgname}/${repoSelected}/commits`)
            .then(res => res.json())
            .then((response) => {
                if(response.message === "Not Found"){
                    this.setCommitsTableParams([], true, false);
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
                    this.setCommitsTableParams(processedResponse, false, false);
                }
            })
            .catch(() =>{
                this.setCommitsTableParams([], true, false);
            })
    };

    render() {
        const {columns, commitData} = this.state;
        const {repoSelected} = this.props;
        return(
            <div className="commits-view">
                <BreadCrumbs {...this.props}/>
                {this.state.loading? <Spin />:
                    <Table columns={columns} key={"key"} dataSource={commitData}/>}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    orgname: state.appReducer.orgname,
    repoSelected: state.appReducer.repoSelected
});

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(CommitsView);