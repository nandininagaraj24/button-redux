import * as actions from "../reducers/AppReducer";

describe('AppReducer', () => {
    const initialState = {
        orgname: '',
        component: "repo",
        repoSelected: ""
    };

    it('AppReducer SET_INPUT_VAL,', () => {
        const res = actions.appReducer(initialState, {type: "SET_INPUT_VAL", orgname: "Netflix"});
        expect(res).toEqual({...initialState,orgname: "Netflix" });
    });

    it('AppReducer CHANGE_VIEW_COMPONENT,', () => {
        const res = actions.appReducer(initialState, {type: "CHANGE_VIEW_COMPONENT", component: "commits", repoSelected:"asyntax"});
        expect(res).toEqual({...initialState, component: "commits", repoSelected:"asyntax" });
    });
});