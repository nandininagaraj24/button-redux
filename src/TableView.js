import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./reducers/displayReducer";
import {Table, Spin} from "antd";

class TableView extends Component{

    state = {
        tableData: [],
        noinfo: false,
        columns: [ {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => { return a.name.localeCompare(b.name)}
        }, {
            title: 'Forks',
            dataIndex: 'forks',
            key: 'forks',
            sorter: (a, b) => a.forks - b.forks
        }, {
            title: 'Language',
            dataIndex: 'language',
            key: 'language',
            sorter: (a, b) => { return a.name.localeCompare(b.name)}
        }, {
            title: 'Open Issues',
            dataIndex: 'openissues',
            key: 'openissues',
            sorter: (a, b) => a.openissues - b.openissues
        }, {
            title: 'Watchers',
            dataIndex: 'watchers',
            key: 'watchers',
            sorter: (a, b) => a.watchers - b.watchers
        }, {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat'
        }, {
            title: 'Updated At',
            dataIndex: 'updatedat',
            key: 'updatedat'
        }, {
            title: '',
            dataIndex: 'viewcommits',
            key: 'viewcommits',
            render: text => <a>{text}</a>
        }],
        loading: false,
        sortedInfo: []
    };

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
            sortedInfo: sorter,
        });
    };

    componentWillMount(){
        this.fetchData(this.props.orgname);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.orgname !== nextProps.orgname){
            if(nextProps.orgname && nextProps.orgname.length > 0){
                this.fetchData(nextProps.orgname);
            }
        }
    }

    sortAlphaAsc = (a, b) => {
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0 //default return value (no sorting)
    };

    sortAlphaDesc = (a, b) => {
        let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
        if (nameA > nameB) //sort string ascending
            return -1;
        if (nameA < nameB)
            return 1;
        return 0 //default return value (no sorting)
    };

    fetchData = (orgname) => {
        this.setState({loading: true});
        fetch(`https://api.github.com/orgs/${orgname}/repos`)
            .then(res => res.json())
            .then((response) => {
                if(response.message === "Not Found"){
                    this.setState({
                        tableData: [],
                        noinfo: true,
                        loading: false
                    })
                }
                else {
                    let tableresponse = [];
                    response.forEach((value, index) =>{
                        tableresponse.push({
                            key: index,
                            name: value.name,
                            forks: value.forks,
                            language: value.language,
                            openissues: value.open_issues,
                            watchers: value.watchers,
                            createdat: value.created_at,
                            updatedat: value.updated_at,
                            viewcommits: "View Commits"
                        })
                    });
                    this.setState({
                        tableData: tableresponse,
                        noinfo: false,
                        loading: false
                    })
                }
            })
            .catch(() =>{
                this.setState({
                    tableData: [],
                    noinfo: true,
                    loading: false
                })
            })
    };

    tableClick = (e) => {
        if(e.target.tagName === "A" && !e.target.parentElement.classList.contains("ant-pagination-item") &&
            !e.target.parentElement.classList.contains("ant-pagination-next") &&
            !e.target.parentElement.classList.contains("ant-pagination-prev")) {
            const reponame = e.target.parentElement.parentElement.children[0].innerText;
            this.props.changeViewComponent("commits", reponame);
        }

    };

    render(){
        const {tableData, columns} = this.state;
        const {orgname} = this.props;
        return(
            <div className="repo-table" onClick={this.tableClick}>
                {orgname.length !== 0? this.state.loading? <Spin />:
                <Table columns={columns} dataSource={tableData} onChange={this.handleChange}/>: null}
                {orgname.length === 0? <p>Pick an organization to view more details</p>:null}
            </div>
        )
    }
}

//export default TableView;
const mapDispatchToProps = {
    ...actions
};

export default connect(null, mapDispatchToProps)(TableView);