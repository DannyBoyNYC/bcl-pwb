import React from 'react';
import { mount } from 'enzyme';

import SelectAmount from './select-amount';

describe('<SelectAmount />', () => {

	it('fires onChange', () => {
		let changed = false;
		const wrapper = mount(<SelectAmount onChange={_ => changed = true} />);
		wrapper.find('TextField').props().onChange({ target: 0 });
		expect(changed).toBe(true);
	});

	it('fires onChange with expected value', () => {
		let value = 0;
		const firedValue = 100;
		const wrapper = mount(<SelectAmount onChange={x => value = x} />);
		wrapper.find('TextField').props().onChange({ target: { value: firedValue } });
		expect(value).toBe(firedValue);
	});

});