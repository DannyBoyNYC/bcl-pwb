import React from 'react';

interface ITabProps {
	label: string;
}

class Tab extends React.Component<ITabProps> {
	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}

export default Tab;