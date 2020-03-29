import React, {Component} from "react";
import {connect} from "react-redux";
import EmptyState from "./EmptyState";
import * as actions from "./reducers/displayReducer";
import {Table, Spin, Pagination} from "antd";
import {data} from "./mockData/data";
import "./css/RepoTable.css";
import RepoTable from "./RepoTable";

class TableView extends Component{

    state = {
        tableData: [],
        noinfo: false,
        columns: [ {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }, {
            title: 'Forks',
            dataIndex: 'forks',
            key: 'forks'
        }, {
            title: 'Language',
            dataIndex: 'language',
            key: 'language'
        }, {
            title: 'Open Issues',
            dataIndex: 'openissues',
            key: 'openissues'
        }, {
            title: 'Watchers',
            dataIndex: 'watchers',
            key: 'watchers'
        }, {
            title: 'Created At',
            dataIndex: 'createdat',
            key: 'createdat',
            render: text => {
                return new Date(text)
            }
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
        loading: false
    };

    componentWillMount(){
        this.fetchData(this.props.orgname, this.props.sortDirection);
    }

    componentWillReceiveProps(nextProps){
        if(this.props.orgname !== nextProps.orgname){
            if(nextProps.orgname && nextProps.orgname.length > 0){
                this.fetchData(nextProps.orgname, nextProps.sortDirection);
            }
        }
        else if (this.props.sortDirection !== nextProps.sortDirection ||
            this.props.orderCategory !== nextProps.orderCategory){
            const ordereddata = this.reorderData(nextProps.sortDirection, nextProps.orderCategory, this.state.tableData);
            this.setState({
                tableData: ordereddata,
                noinfo: true,
                loading: false
            })
        }
    }

    setTableParams = (tableData, noinfo, loading ) => {
        this.setState({tableData, noinfo, loading});
    };

    reorderData = (sortDirection, orderCategory, tableData) => {
        if(sortDirection === "asc") {
            tableData.sort((a, b) =>{
                const valueToCompare = this.getValueToCompare(a[orderCategory], b[orderCategory], orderCategory);
                return (valueToCompare.valA !== valueToCompare.valB ? valueToCompare.valA < valueToCompare.valB ? -1 : 1 : 0);
            })
        }
        else{
            tableData.sort((a, b) =>{
                const valueToCompare = this.getValueToCompare(a[orderCategory], b[orderCategory], orderCategory);
                return (valueToCompare.valB !== valueToCompare.valA ? valueToCompare.valB < valueToCompare.valA ? -1 : 1 : 0);
            })
        }
        return tableData;
    };

    getValueToCompare = (a, b, orderCategory) => {
        let valA = a, valB = b;
        if( orderCategory === "updatedat"){
            valA = new Date(valA);
            valB = new Date(valB);
        }
        else if(typeof a === 'string' ){
            valA = valA? valA.toLowerCase(): "";
            valB = valB? valB.toLowerCase(): "";
        }
        return {
            valA,
            valB
        }
    };

    formatDateAntTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours() % 12;
        hours = hours === 0?12: hours;
        return date.toLocaleDateString("en-US") +" "+
            hours + ":"+ date.getMinutes()+" "+ (date.getMinutes() > 12? "PM": "AM");
    };

    fetchData = (orgname, sortDirection) => {
        const {orderCategory} = this.props;
        this.setState({loading: true});

        /*let tableresponse = [];
        data.forEach((value, index) =>{
            tableresponse.push({
                key: index,
                name: value.name,
                forks: value.forks,
                language: value.language,
                openissues: value.open_issues,
                watchers: value.watchers,
                createdat: this.formatDateAntTime(new Date(value.created_at)),
                updatedat: this.formatDateAntTime(new Date(value.updated_at)),
                viewcommits: "View Commits"
            })
        });
        const ordereddata = this.reorderData(sortDirection, orderCategory, tableresponse);
        this.setState({
            tableData: ordereddata,
            noinfo: true,
            loading: false
        })*/
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
                            createdat:this.formatDateAntTime(new Date(value.created_at)),
                            updatedat: this.formatDateAntTime(new Date(value.updated_at)),
                            viewcommits: "View Commits"
                        })
                    });

                    const ordereddata = this.reorderData(sortDirection, orderCategory, tableresponse);
                    this.setState({
                        tableData: ordereddata,
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
        let {tableData, columns} = this.state;
        const {orgname} = this.props;
        return(
            <div className="repo-table" onClick={this.tableClick}>
                {orgname.length >= 0? this.state.loading? <Spin />:
                    <RepoTable tableData={tableData} columns={columns}/>:null}
                {orgname.length === 0? <EmptyState/>:null}
            </div>
        )
    }
}

export const mapStateToProps = (state) =>({
    orderCategory: state.orderCategory,
    sortDirection: state.sortDirection
});

//export default TableView;
const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);