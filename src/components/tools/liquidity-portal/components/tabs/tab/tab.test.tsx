import React from 'react';
import { mount } from 'enzyme';

import Tab from './tab';

describe('<Tab />', () => {

	it('renders children', () => {
		const wrapper = mount(<Tab label='x'><button><span></span></button></Tab>);
		expect(wrapper.find('span')).toBeTruthy();
	})

});