import * as actions from "../reducers/RepoTableReducer";

describe('RepoTableReducer', () => {
    const initialState = {
        orderCategory: "name",
        sortDirection: "asc"
    };

    it('RepoTableReducer SET_SORT_DIRECTION,', () => {
        const res = actions.repoReducer(initialState, {type: "SET_SORT_DIRECTION", sortDirection: "desc"});
        expect(res).toEqual({...initialState,sortDirection: "desc" });
    });

    it('RepoTableReducer SET_ORDER_CATEGORY,', () => {
        const res = actions.repoReducer(initialState, {type: "SET_ORDER_CATEGORY", orderCategory: "forks"});
        expect(res).toEqual({...initialState,orderCategory: "forks" });
    });
});