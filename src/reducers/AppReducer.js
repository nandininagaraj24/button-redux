export const setInputVal = (value) => {
    return {
        type: "SET_INPUT_VAL",
        orgname: value
    }
};

export const changeViewComponent = (component, repoSelected) => {
    return {
        type: "CHANGE_VIEW_COMPONENT",
        component,
        repoSelected
    }
};

const initialState = {
    orgname: '',
    component: "repo",
	repoSelected: ""
};

export const appReducer = (state = initialState, action) => {
	switch(action.type){
        case "SET_INPUT_VAL": return {
            ...state,
            orgname: action.orgname
        };
		case "CHANGE_VIEW_COMPONENT": return {
            ...state,
            component: action.component,
            repoSelected: action.repoSelected
        };
		default: break;
	}
	return state;
};

export default appReducer;