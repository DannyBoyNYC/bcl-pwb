import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import { AmountType } from '../../../types';

interface ISelectTypeProps {
	// tslint:disable-next-line:no-any
	classes: any;
	types: AmountType[];
	type: AmountType | null;
	onChange: (type: AmountType) => void;
}

interface ISelectTypeState {
	selectedType: AmountType | null;
}

class SelectType extends React.Component<ISelectTypeProps, ISelectTypeState> {
	constructor(props: ISelectTypeProps) {
		super(props);
		this.state = { selectedType: props.type };
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	private handleOnChange(value: string) {
		const type = this.props.types.find(x => x.name === value);
		if (type) {
			this.setState({ selectedType: type }, () => this.props.onChange(type));
		}
	}

	render() {
		const { classes, types } = this.props;

		return (
			<div className={classes.root}>
				<TextField
					className={classes.textField}
					select
					label='Type'
					fullWidth
					value={this.state.selectedType ? this.state.selectedType.name : ''}
					onChange={e => this.handleOnChange(e.target.value)}
					SelectProps={{
						MenuProps: {
							className: classes.menu
						}
					}}>

					{types.map(type => (
						<MenuItem key={type.id} value={type.name}
							style={{ boxSizing: 'unset', padding: '0px', paddingLeft: '13px', fontSize: '11px' }}>
							{type.name}
						</MenuItem>
					))}

				</TextField>
			</div>
		);
	}
}

const styles = (theme: Theme) => createStyles({
	root: {
		marginLeft: theme.spacing.unit * 5,
		marginTop: theme.spacing.unit * 2,
		width: 150
	}
});

export default withStyles(styles, { withTheme: true })(SelectType);
