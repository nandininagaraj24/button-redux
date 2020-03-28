import React, {Component} from "react";
import {connect} from "react-redux";
import * as actions from "./reducers/displayReducer";

class TableView extends Component{

    state = {
        tableData: [],
        noinfo: false
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

    fetchData = (orgname) => {
        fetch(`https://api.github.com/orgs/${orgname}/repos`)
            .then(res => res.json())
            .then((response) => {
                if(response.message === "Not Found"){
                    this.setState({
                        tableData: [],
                        noinfo: true
                    })
                }
                else {
                    this.setState({
                        tableData: response,
                        noinfo: false
                    })
                }
            })
            .catch(() =>{
                this.setState({
                    tableData: [],
                    noinfo: true
                })
            })
    };

    tableClick = (e) => {
        console.log(e.target.value)
        if(e.target.tagName === "A") {
            const reponame = e.target.parentElement.parentElement.children[0].innerText;
            this.props.changeViewComponent("commits", reponame);
        }

    }

    render(){
        const {tableData, noinfo} = this.state;
        const {orgname} = this.props;
        return(
            <div>
                {tableData.length > 0?
                    <table onClick={this.tableClick}>
                        <thead>
                        <th>Name</th>
                        <th>Forks</th>
                        <th>Language</th>
                        <th>Open Issues</th>
                        <th>Watchers</th>
                        <th>Created At</th>
                        <th>Last Update</th>
                        <th>Commits</th>
                        </thead>
                        <tbody>
                        {tableData.map((value) =>{
                            return <tr>
                                <td>{value.name}</td>
                                <td>{value.forks}</td>
                                <td>{value.language}</td>
                                <td>{value.open_issues}</td>
                                <td>{value.watchers}</td>
                                <td>{value.created_at}</td>
                                <td>{value.updated_at}</td>
                                <td className="view"><a>View Commits</a></td>
                            </tr>
                        })}
                        </tbody>
                    </table>:null}
                {noinfo? <p>No information exits for the specified Organization</p>:null}
                {tableData.length === 0 && !noinfo? <p>Pick an organization to view more details</p>:null}
            </div>
        )
    }
}

//export default TableView;
const mapDispatchToProps = {
    ...actions
};

export default connect(null, mapDispatchToProps)(TableView);