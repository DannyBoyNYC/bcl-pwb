import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ICalculateButtonProps {
	// tslint:disable-next-line:no-any
	classes: any;
	disabled: boolean;
	onClick: () => void;
}

const CalculateButton: React.FunctionComponent<ICalculateButtonProps> = props => {
	const { classes, disabled } = props;

	return (
		<div className={classes.container}>
			<Fab
				variant="extended"
				style={{ paddingLeft: 17, paddingRight: 17 }}
				size="small"
				color="primary"
				onClick={() => props.onClick()}
				disabled={disabled}
				aria-label="Calculate">
				Calculate
			</Fab>
		</div>
	);
};

const styles = (theme: Theme) => createStyles({
	container: {
		marginLeft: theme.spacing.unit * 5,
		marginTop: theme.spacing.unit * 3.5,
	}
});

export default withStyles(styles, { withTheme: true })(CalculateButton);