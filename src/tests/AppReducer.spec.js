import * as actions from "../reducers/AppReducer";

describe('AppReducer', () => {
    const initialState = {
        orgname: '',
        component: "repo",
        repoSelected: "",
        isPatternMatched: true
    };

    it('AppReducer SET_INPUT_VAL valid,', () => {
        const res = actions.appReducer(initialState, {type: "SET_INPUT_VAL", orgname: "Netflix", isPatternMatched: true});
        expect(res).toEqual({...initialState,orgname: "Netflix" });
    });

    it('AppReducer SET_INPUT_VAL INVALID,', () => {
        const res = actions.appReducer(initialState, {type: "SET_INPUT_VAL", orgname: "Net$", isPatternMatched: false});
        expect(res).toEqual({...initialState,orgname: "Net$", isPatternMatched: false });
    });

    it('AppReducer CHANGE_VIEW_COMPONENT,', () => {
        const res = actions.appReducer(initialState, {type: "CHANGE_VIEW_COMPONENT", component: "commits", repoSelected:"asyntax"});
        expect(res).toEqual({...initialState, component: "commits", repoSelected:"asyntax" });
    });
});