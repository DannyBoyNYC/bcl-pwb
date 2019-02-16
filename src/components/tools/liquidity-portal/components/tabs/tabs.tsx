import React, { ReactElement } from 'react';
import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';

import Tab from './tab/tab';

interface ITabsProps {
	// tslint:disable-next-line:no-any
	initiallySelectedTabIndex?: number;
	classes: any;
	theme: Theme;
	children: ReactElement<Tab>[];
}

interface ITabsState {
	value: number;
}

class Tabs extends React.Component<ITabsProps, ITabsState> {
	constructor(props: ITabsProps) {
		super(props);
		this.state = { value: props.initiallySelectedTabIndex ? props.initiallySelectedTabIndex : 0 };
		this.handleChange = this.handleChange.bind(this);
	}

	private handleChange(event: React.ChangeEvent<{}>, value: number) {
		this.setState({ value });
	}

	private selectedTab(): React.ReactNode {
		return React.Children.map(this.props.children, (childTab, index) => index === this.state.value ? childTab : null);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<MuiTabs
					className={classes.tabs}
					value={this.state.value}
					onChange={this.handleChange}
					indicatorColor="primary"
					textColor="primary"
					variant='fullWidth'>
					{React.Children.map(this.props.children, childTab => <MuiTab label={childTab.props.label} />)}
				</MuiTabs>
				{this.selectedTab()}
			</div>
		);
	}
}

const styles = (theme: Theme) => createStyles({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	divider: {
		marginTop: 1
	},
	tabs: {
		display: 'flex',
		flexDirection: 'column',
		flexWrap: 'wrap',
		backgroundColor: theme.palette.background.default
	}
});

export default withStyles(styles, { withTheme: true })(Tabs);