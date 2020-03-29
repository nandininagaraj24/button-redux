import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {displayred} from "../reducers/displayReducer";
import View from "./View";
import "../css/App.css";

const store = createStore(displayred);

export default class App extends Component{
	render(){
		return (<Provider store={store}>
			<View/>
		</Provider>);
	}
}