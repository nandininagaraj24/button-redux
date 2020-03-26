export const changeText = () => {
	return {
		type: "CHANGE_TEXT",
		displayval: "CHANGE HAPPENED!!!"
	}
}

const initialState = {
	displayval: ""
}

export const displayred = (state = initialState, action) => {
	switch(action.type){
		case "CHANGE_TEXT": return {
			...state,
			displayval: action.displayval
		}
		default: break;
	}
	return state;
}

export default displayred;