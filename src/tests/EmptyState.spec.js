import React from 'react';
import EmptyState from '../components/EmptyState';
import toJson from 'enzyme-to-json';

describe('EmptyState', () => {

    it('EmptyState should be rendered,', () => {
        let component = mount(<EmptyState/>);
        expect(component.find('.empty-state-text').exists()).toEqual(true);
    });
    it('EmptyState NO RESULTS text should be rendered,', () => {
        let component = mount(<EmptyState/>);
        console.log(component.find('.empty-state-text.header').text("NO RESULTS"))
    });
    it('EmptyState NO RESULTS help text should be rendered,', () => {
        let component = mount(<EmptyState/>);
        console.log(component.find('.empty-state-text.help-text').text("Search for the name of an organization to view repositories and commits on GitHub"))
    });
});