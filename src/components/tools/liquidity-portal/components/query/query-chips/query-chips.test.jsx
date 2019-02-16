import React from 'react';
import { mount } from 'enzyme';

import QueryChips from './query-chips';
import { Query, Security, AmountType } from '../../../types';

describe('<QueryChips />', () => {

	it('does not display where no queries are supplied', () => {
		const wrapper = mount(<QueryChips queries={[]} onDelete={cb} onClick={cb} />);
		expect(wrapper.find('Chip').length).toBe(0);
	});

	it('displays n chips', () => {
		let queries = [];
		const chipCount = Math.floor((Math.random() * 10) + 1); //Anything between 1 and 10
		for (let chip = 0; chip < chipCount; chip++) {
			queries.push(new Query(new Security(chip.toString(), 'x', 'x', 0), 0, new AmountType('x', 'x')));
		}
		const wrapper = mount(<QueryChips queries={queries} onDelete={cb} onClick={cb} />);
		expect(wrapper.find('Chip').length).toBe(chipCount);
	});

	it('fires onDelete', () => {
		const query = new Query(new Security('x', 'x', 'x', 0), 0, new AmountType('x', 'x'));
		let deletedQuery = null;
		const wrapper = mount(<QueryChips queries={[query]} onDelete={q => deletedQuery = q} onClick={cb} />);
		wrapper.find('Chip').props().onDelete(query);
		expect(deletedQuery).toMatchObject(query);
	});

	it('fires onClick', () => {
		const query = new Query(new Security('x', 'x', 'x', 0), 0, new AmountType('x', 'x'));
		let clickedQuery = null;
		const wrapper = mount(<QueryChips queries={[query]} onDelete={cb} onClick={q => clickedQuery = q} />);
		wrapper.find('Chip').props().onClick(query);
		expect(clickedQuery).toMatchObject(query);
	});

	const cb = () => { let i = 0; };
});