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

/*export const setOrderCategory = (orderCategory) => {
    return {
        type: "SET_ORDER_CATEGORY",
        orderCategory
    }
}

export const setSortDirection = (sortDirection) => {
    return {
        type: "SET_SORT_DIRECTION",
        sortDirection
    }
}*/

const initialState = {
    orgname: '',
    component: "repo",
	repoSelected: "",
   // orderCategory: "name",
    //sortDirection: "asc"
}

export const appReducer = (state = initialState, action) => {
	switch(action.type){
        case "SET_INPUT_VAL": return {
            ...state,
            orgname: action.orgname
        }
		case "CHANGE_VIEW_COMPONENT": return {
            ...state,
            component: action.component,
            repoSelected: action.repoSelected
        }
        /*case "SET_ORDER_CATEGORY": return {
            ...state,
            orderCategory: action.orderCategory
        }
        case "SET_SORT_DIRECTION": return {
            ...state,
            sortDirection: action.sortDirection
        }*/
		default: break;
	}
	return state;
}

export default appReducer;