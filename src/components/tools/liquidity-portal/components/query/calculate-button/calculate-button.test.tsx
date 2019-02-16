import React from 'react';
import { mount } from 'enzyme';

import CalculateButton from './calculate-button';

describe('<CalculateButton />', () => {

	it('fires onClick', () => {
		let clicked = false;
		const wrapper = mount(<CalculateButton onClick={() => clicked = true} disabled={false} />);
		wrapper.find('Fab').simulate('click');
		expect(clicked).toEqual(true);
	});

	it('it is disabled', () => {
		const wrapper = mount(<CalculateButton onClick={cb} disabled={true} />);
		expect(wrapper.find('Fab').prop('disabled')).toEqual(true);
	});

	it('it is enabled', () => {
		const wrapper = mount(<CalculateButton onClick={cb} disabled={false} />);
		expect(wrapper.find('Fab').prop('disabled')).toEqual(false);
	});

	const cb = () => { let i = 0; };
});