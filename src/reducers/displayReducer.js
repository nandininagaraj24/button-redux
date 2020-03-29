export const changeText = () => {
	return {
		type: "CHANGE_TEXT",
		displayval: "CHANGE HAPPENED!!!"
	}
}

export const setInputVal = (value) => {
    return {
        type: "SET_INPUT_VAL",
        orgname: value
    }
}

export const changeViewComponent = (component, repoSelected) => {
    return {
        type: "CHANGE_VIEW_COMPONENT",
        component,
        repoSelected
    }
}

const initialState = {
	displayval: "",
    orgname: '',
    component: "repo",
	repoSelected: ""
}

export const displayred = (state = initialState, action) => {
	switch(action.type){
		case "CHANGE_TEXT": return {
			...state,
			displayval: action.displayval
		}
        case "SET_INPUT_VAL": return {
            ...state,
            orgname: action.orgname
        }
		case "CHANGE_VIEW_COMPONENT": return {
            ...state,
            component: action.component,
            repoSelected: action.repoSelected
        }
		default: break;
	}
	return state;
}

export default displayred;