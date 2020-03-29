import React from 'react';
import EmptyState from '../EmptyState';
import toJson from 'enzyme-to-json';

test('CheckboxWithLabel changes the text after click', () => {
    // Render a checkbox with label in the document
    const checkbox = shallow(<EmptyState/>);
    console.log(checkbox)
    expect(toJson(checkbox)).toMatchSnapshot();
    //expect(checkbox.find('.empty-state-text').text()).toEqual("NO RESULTS");
});