import React, {Component} from "react";
import {Pagination} from "antd";

class RepoTable extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentPage: 1,
            pageSize: 15
        };
    }
    getCurrentPageData = () => {
        const {currentPage, pageSize} = this.state;
        let {tableData} = this.props;
        const start = ((currentPage - 1) * pageSize);
        const end = currentPage * pageSize;
        const data = [...tableData];
        return data.slice(start, end);
    };
    onChange = (pageNumber) => {
        this.setState({currentPage: pageNumber});
    };
    render(){
        let {tableData, columns} = this.props;
        const {pageSize} = this.state;
        let currentData = this.getCurrentPageData();
        return(<div>
            <table>
                <thead>
                <tr>
                {columns.map((value) =>{
                    return <th>{value.title}</th>
                })}
                </tr>
                </thead>
                <tbody>
                {currentData.map((value, index) =>{
                    return <tr key={index}>
                        <td>{value.name}</td>
                        <td>{value.forks}</td>
                        <td>{value.language}</td>
                        <td>{value.openissues}</td>
                        <td>{value.watchers}</td>
                        <td>{value.createdat}</td>
                        <td>{value.updatedat}</td>
                        <td><a>View Commits</a></td>
                    </tr>
                })}
                </tbody>
            </table>
            <Pagination defaultCurrent={1} total={tableData.length} pageSize={pageSize} onChange={this.onChange} />
        </div>)
    }
}

export default RepoTable;