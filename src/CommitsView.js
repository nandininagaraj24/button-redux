import React, {Component} from "react";
import HeaderComponent from "./HeaderComponent";
import GetTableView from "./CommitsTable";
import {connect} from "react-redux";
import * as actions from "./reducers/displayReducer";
import {Table, Spin} from "antd";

class CommitsView extends Component{

    state={
        commitData: [],
        dataKeys: ["name", "email", "date"],
        columns: [ {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => { return a.name.localeCompare(b.name)}
        }, {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => { return a.name.localeCompare(b.name)}
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
                            date: value.commit.committer.date,
                        }
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
        const {columns, dataKeys, commitData} = this.state;
        return(
            <div>
                <div style={{display: "flex"}}>
                    <div onClick={ () => this.props.changeViewComponent("repo", "")}> Repositories</div>
                    <div> Commits</div>
                </div>
                {this.state.loading? <Spin />:
                    <Table columns={columns} dataSource={commitData}/>}
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