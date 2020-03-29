export const setOrderCategory = (orderCategory) => {
    return {
        type: "SET_ORDER_CATEGORY",
        orderCategory
    }
};

export const setSortDirection = (sortDirection) => {
    return {
        type: "SET_SORT_DIRECTION",
        sortDirection
    }
};

const initialState = {
    orderCategory: "name",
    sortDirection: "asc"
};

export const repoReducer = (state = initialState, action) => {
    switch(action.type){
        case "SET_ORDER_CATEGORY": return {
            ...state,
            orderCategory: action.orderCategory
        };
        case "SET_SORT_DIRECTION": return {
            ...state,
            sortDirection: action.sortDirection
        };
        default: break;
    }
    return state;
};

export default repoReducer;