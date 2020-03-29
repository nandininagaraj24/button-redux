import React from "react";
import GetTableControls from "../components/RepoTableControls";
import toJson from "enzyme-to-json";

describe('RepoTableControls', () => {

    it('RepoTableControls should be rendered,', () => {
        let component = mount(<GetTableControls/>);
        console.log(component)
        expect(component.find('.table-controls').isEmpty()).toEqual(false);
    });
});