import React from 'react';
import { mount } from 'enzyme';

import Tab from './tab/tab';
import Tabs from './tabs';

describe('<Tabs />', () => {

	it('renders Tabs', () => {
		const tabCount = Math.floor((Math.random() * 10) + 1); //Anything between 1 and 10
		const wrapper = mount(tabsTree(tabCount));
		expect(wrapper.find('Tab').length).toBe(tabCount + 1); //<- +1 to include the 'selectedTab'
	});

	it('selects tab 0 by default', () => {
		const wrapper = mount(tabsTree(1));
		expect(wrapper.find('Tab').last().prop('label')).toEqual('tab0');
	});

	it('can select initial tab', () => {
		const wrapper = mount(tabsTree(4, 1));
		expect(wrapper.find('Tab').last().prop('label')).toEqual('tab1');
	});

	const tabsTree = (tabCount, initiallySelectedTabIndex = 0) => {
		const tabs = [];
		for (let tab = 0; tab < tabCount; tab++) {
			tabs.push({ label: `tab${tab}` });
		}
		return <Tabs initiallySelectedTabIndex={initiallySelectedTabIndex}>
			{tabs.map((t, i) => <Tab key={i} label={t.label} />)}</Tabs>
	}
});