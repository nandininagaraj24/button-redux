import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addTodo} from "./reducers/todos";

class TodoInput extends Component{
	componentDidMount(){
		this.addNewTodo.bind(this);
	}

	addNewTodo(e) {
		console.log("New Item added")
		e.preventDefault();
		if(this.input.value.trim()){
			this.props.dispatch(addTodo(this.input.value));
			this.input.value  = '';
		}
	}

	render(){
		return(<div>
			<form onSubmit ={(e) => this.addNewTodo(e)}>
				<input ref={node => (this.input = node)}/>
				<button type = "submit">Add Todo</button>
			</form>
		</div>)
	}
}

export default connect()(TodoInput);