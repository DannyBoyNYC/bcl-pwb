import React from 'react';
import { mount } from 'enzyme';

import { AmountType } from '../../../types';
import SelectType from './select-type';

describe('<SelectType />', () => {

	const types = [
		new AmountType('1', 'Shares'),
		new AmountType('2', 'Local Value'),
		new AmountType('3', 'Value'),
		new AmountType('4', '% Market Cap'),
		new AmountType('5', '% ADV'),
	];

	it('fires onChange for Shares', () => {
		let changed = false;
		const wrapper = mount(<SelectType types={types} type={types[0]} onChange={_ => changed = true} />);
		const menuItems = wrapper.find('TextField').props().onChange({ target: { value: types[0].name } })
		expect(changed).toBe(true);
	});

	it('fires onChange for Local Value', () => {
		let changed = false;
		const wrapper = mount(<SelectType types={types} type={types[0]} onChange={_ => changed = true} />);
		const menuItems = wrapper.find('TextField').props().onChange({ target: { value: types[1].name } })
		expect(changed).toBe(true);
	});

	it('fires onChange for Value', () => {
		let changed = false;
		const wrapper = mount(<SelectType types={types} type={types[0]} onChange={_ => changed = true} />);
		const menuItems = wrapper.find('TextField').props().onChange({ target: { value: types[2].name } })
		expect(changed).toBe(true);
	});

	it('fires onChange for % Market Cap', () => {
		let changed = false;
		const wrapper = mount(<SelectType types={types} type={types[0]} onChange={_ => changed = true} />);
		const menuItems = wrapper.find('TextField').props().onChange({ target: { value: types[3].name } })
		expect(changed).toBe(true);
	});

	it('fires onChange for % ADV', () => {
		let changed = false;
		const wrapper = mount(<SelectType types={types} type={types[0]} onChange={_ => changed = true} />);
		const menuItems = wrapper.find('TextField').props().onChange({ target: { value: types[3].name } })
		expect(changed).toBe(true);
	});

})