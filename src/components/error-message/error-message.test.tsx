import React from 'react';
import { shallow } from 'enzyme';

import ErrorMessage from './error-message';

describe('<ErrorMessage/>', () => {
	it('should display the given message', () => {
		const message = 'the message';
		const wrapper = shallow(<ErrorMessage message={message} />);
		expect(wrapper.find('span').text()).toEqual(message);
	});
});