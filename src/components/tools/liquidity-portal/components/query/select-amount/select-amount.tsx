import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

interface ISelectAmountProps {
	// tslint:disable-next-line:no-any
	classes: any;
	onChange: (value: number) => void;
}

interface ISelectAmountState {
	value: number;
}

class SelectAmount extends React.Component<ISelectAmountProps, ISelectAmountState> {
	constructor(props: ISelectAmountProps) {
		super(props);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	private handleOnChange = (value: string) => this.props.onChange(Number(value));

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<TextField type='number'
					label='Amount'
					fullWidth
					onChange={e => this.handleOnChange(e.target.value)} />
			</div>
		);
	}
}

const styles = (theme: Theme) => createStyles({
	root: {
		marginLeft: theme.spacing.unit * 11,
		marginTop: theme.spacing.unit * 2,
		width: 150
	}
});

export default withStyles(styles, { withTheme: true })(SelectAmount);
