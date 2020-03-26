import React, {Component} from "react";
import {connect} from "react-redux";
import {changeText} from "./reducers/displayReducer";

class Display extends Component{
	render(){
		return (
			<div>
		<div>{this.props.displayval}</div>
		<button onClick={this.props.changeText}>Click me</button></div>)
	}
}

export const mapStateToProps = state => ({
	displayval: state.displayval
})

const mapDispatchToProps = dispatch => ({
  changeText: id => dispatch(changeText())
})


export default connect(mapStateToProps, mapDispatchToProps)(Display);