import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducer from "../reducers";
import View from "./View";
import "../css/App.css";

const store = createStore(reducer);

/* This is the root view container of the application
   The redux store is created and passed down to all the children components
 */
export default class App extends Component{
	render(){
		return (<Provider store={store}>
			<View/>
		</Provider>);
	}
}