import React from 'react';
import ReactDOM from 'react-dom';
import { mount, shallow } from 'enzyme';

import AppBar from './app-bar';

describe('<AppBar />', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<AppBar open={false} headerText='' onOpen={cb} />, div);
		ReactDOM.unmountComponentAtNode(div);
	});

	it('calls onOpen when open is clicked', () => {
		let openCalled = false;
		const wrapper = mount(<AppBar open={false} headerText='' onOpen={() => { openCalled = true; }} />);
		const iconButton = wrapper.find('IconButton');
		iconButton.simulate('click');
		expect(openCalled).toBeTruthy();
	});

	it('sets header text', () => {
		const headerText = 'the header text';
		const wrapper = mount(<AppBar open={false} headerText={headerText} onOpen={cb} />);
		const h6 = wrapper.find('Typography').childAt(0);
		expect(h6.text()).toEqual(headerText);
	});

	const cb = () => { let i = 0; };
});