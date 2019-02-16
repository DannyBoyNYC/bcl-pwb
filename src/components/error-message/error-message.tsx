import React from 'react';
import Icon from '@material-ui/core/Icon';

interface IErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = props => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', height: '100%', alignItems: 'center' }}>
			<Icon>error_outline</Icon>
			<span>{props.message}</span>
		</div>
	);
};

export default ErrorMessage;