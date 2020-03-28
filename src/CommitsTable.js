import React from "react";


export const GetTableView = ({columns, data, dataKeys}) => {

    return <table>
        <thead>
        {columns.map((value) =>{
            return <th>{value}</th>
        })}
        </thead>
        <tbody>
        {data.map((row) =>{
            return <tr>
                {dataKeys.map((value) =>{
                    return  <td>{row[value]}</td>;
                })}
            </tr>
        })}
        </tbody>
    </table>

};

export default GetTableView;