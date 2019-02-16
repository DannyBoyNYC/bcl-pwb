import React from 'react';
import ReactDOM from 'react-dom';
import { mount, ReactWrapper } from 'enzyme';

import SideBar from './side-bar';

describe('<SideBar />', () => {
	it('has eight items where all tools are enabled', () => {
		const toolIds = ['liquidityportal', 'portfolio', 'monitor', 'posttrade'];
		const wrapper = mount(<SideBar open={false} enabledToolIds={toolIds}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(wrapper.find('ListItemText').length).toEqual(8);
	});

	it('has four items where all tools are disabled/not supplied', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(wrapper.find('ListItemText').length).toEqual(4);
	});

	it('has Dashboard', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Dashboard')).toBeTruthy();
	});

	it('has My Alerts', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'My Alerts')).toBeTruthy();
	});

	it('has My Reports', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'My Reports')).toBeTruthy();
	});

	it('has Preferences', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Preferences')).toBeTruthy();
	});

	it('has Liquidity Portal if enabled', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={['liquidityportal']}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Liquidity Portal')).toBeTruthy();
	});

	it('has Portfolio if enabled', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={['portfolio']}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Portfolio')).toBeTruthy();
	});

	it('has Monitor if enabled', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={['monitor']}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Monitor')).toBeTruthy();
	});

	it('has Post Trade if enabled', () => {
		const wrapper = mount(<SideBar open={false} enabledToolIds={['posttrade']}
			onClose={cb} onItemClicked={cb} onToolClicked={cb} />);
		expect(findListItem(wrapper, 'Post Trade')).toBeTruthy();
	});

	it('fires onClose', () => {
		let closed = false;
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={() => closed = true} onItemClicked={cb} onToolClicked={cb} />);
		wrapper.find('IconButton').simulate('click');
		expect(closed).toEqual(true);
	});

	it('fires onItemClicked', () => {
		let itemClicked = false;
		const wrapper = mount(<SideBar open={false} enabledToolIds={[]}
			onClose={cb} onItemClicked={() => itemClicked = true} onToolClicked={cb} />);
		findListItem(wrapper, 'Dashboard').simulate('click');
		expect(itemClicked).toBeTruthy();
	});

	it('fires onToolClicked', () => {
		let toolClicked = false;
		const wrapper = mount(<SideBar open={false} enabledToolIds={['liquidityportal']}
			onClose={cb} onItemClicked={cb} onToolClicked={() => toolClicked = true} />);
		findListItem(wrapper, 'Liquidity Portal').simulate('click');
		expect(toolClicked).toBeTruthy();
	});

	const cb = () => { let i = 0; };

	const findListItem = (wrapper: ReactWrapper, name: string) => {
		const textNode = wrapper.findWhere(x => x.name() === 'ListItemText' && x.prop('primary') === name);
		return textNode.closest('ListItem');
	};
});