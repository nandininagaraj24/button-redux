import React, {Component} from 'react';
import {connect} from "react-redux";
import {setFilter} from "./reducers/visibilityFilter";

class Footer extends Component{

	render(){
		return (<div>
				<span onClick = {() => this.props.dispatch(setFilter('SHOW_ALL'))}>All</span>
				<span onClick = {() => this.props.dispatch(setFilter('SHOW_COMPLETED'))}> Completed </span>
				<span onClick = {() => this.props.dispatch(setFilter('SHOW_ACTIVE'))}> Active </span>
			</div>)
	}

}

export default connect()(Footer);