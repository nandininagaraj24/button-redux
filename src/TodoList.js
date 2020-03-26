import React from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {toggleTodo} from "./reducers/todos";

const getVisibleTodos = (todos, filter) => {
	switch(filter){
		case 'SHOW_ALL': return todos;
		case 'SHOW_ACTIVE': return todos.filter( t => !t.completed);
		case 'SHOW_COMPLETED': return todos.filter( t => t.completed);
		default: break;
	}
}

const TodoList = ({ todos , toggleTodo}) => {
	return (<div>
		<ul>
			{todos.map( todo => (
				 <li key = {todo.id} style={{"text-decoration": todo.completed? "line-through": "none"}} 
				 onClick={() => {
				 	toggleTodo(todo.id)
				 }}>
				{todo.text}
			</li>))}
		</ul>
	</div>)
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);