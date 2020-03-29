import {combineReducers} from 'redux';
import {repoReducer} from './RepoTableReducer';
import {appReducer} from './AppReducer';

export default combineReducers({
    repoReducer,
    appReducer
})