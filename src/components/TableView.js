import React, {Component} from "react";
import {connect} from "react-redux";
import EmptyState from "./EmptyState";
import * as actionsApp from "../reducers/AppReducer";
import * as actionsRepo from "../reducers/RepoTableReducer";
import {Spin} from "antd";
import "../css/RepoTable.css";
import RepoTable from "./RepoTable";
import {repoTableColumns} from "../config/repoTableConfig";
import GetTableControls from "./RepoTableControls";

/* The table view is the container component for the
    repository table and its control components

 */
class TableView extends Component{

    state = {
        tableData: [],
        noinfo: false,
        columns: repoTableColumns,
        loading: false
    };

    componentWillMount(){
        if(this.props.orgname && this.props.orgname.length > 0) {
            this.fetchData(this.props.orgname, this.props.sortDirection);
        }
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
        fetch(`https://api.github.com/orgs/${orgname}/repos`)
            .then(res => res.json())
            .then((response) => {
                if (response.message === "Not Found") {
                    this.setTableParams([], true, false);
                }
                else {
                    let tableresponse = [];
                    response.forEach((value, index) => {
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
                    this.setTableParams(ordereddata, false, false);
                }
            })
            .catch(() => {
                this.setTableParams([], true, false);
            })
    };

    /* Using Event bubbling to hancle click events at the parent level rather
        than attaching to every child
        This method changes the view to fetch and show the commits
     */
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
        const {orgname, orderCategory, sortDirection} = this.props;
        return(
            <div className="repo-table" onClick={this.tableClick}>
                {this.state.loading? <Spin />:
                    <div>
                        <GetTableControls {...this.props}/>
                        <RepoTable tableData={tableData} columns={columns}
                                   orderCategory={orderCategory} sortDirection={sortDirection}/></div>}
            </div>
        )
    }
}

export const mapStateToProps = (state) =>({
    orderCategory: state.repoReducer.orderCategory,
    sortDirection: state.repoReducer.sortDirection
});

const mapDispatchToProps = {
    ...actionsApp,
    ...actionsRepo
};

export default connect(mapStateToProps, mapDispatchToProps)(TableView);