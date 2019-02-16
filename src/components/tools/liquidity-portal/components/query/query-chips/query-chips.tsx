import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Query } from '../../../types';

interface IQueryChipsProps {
	// tslint:disable-next-line:no-any
	classes: any;
	queries: Query[];
	onDelete: (query: Query) => void;
	onClick: (query: Query) => void;
}

class QueryChips extends React.Component<IQueryChipsProps> {
	private handleDelete = (query: Query) => this.props.onDelete(query);
	private handleClick = (query: Query) => this.props.onClick(query);

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				{this.props.queries.map(data => {
					return (
						<Chip
							className={classes.chip}
							key={data.id}
							label={`${data.security.name} ${data.amount} ${data.amountType.name}`}
							clickable={true}
							onClick={this.handleClick.bind(this, data)}
							onDelete={this.handleDelete.bind(this, data)} />
					);
				})}
			</div>
		);
	}
}

const styles = (theme: Theme) => createStyles({
	root: {
		display: 'flex',
		justifyContent: 'left',
		flexWrap: 'wrap',
		paddingLeft: theme.spacing.unit * 3,
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 1.5,
		paddingRight: theme.spacing.unit * 4
	},
	chip: {
		margin: theme.spacing.unit / 2
	},
});

export default withStyles(styles, { withTheme: true })(QueryChips);