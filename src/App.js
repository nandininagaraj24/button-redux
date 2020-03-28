import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import Footer from "./Footer";
import rootReducers from "./reducers";
import Display from "./Display";
import {displayred} from "./reducers/displayReducer";
import RepoView from "./RepoView";
import View from "./View";

const store = createStore(displayred);

export default class App extends Component{
	render(){
		return (<Provider store={store}>
			<View/>
		</Provider>);
	}
}