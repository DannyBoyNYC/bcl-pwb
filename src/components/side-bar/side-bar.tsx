import React from 'react';
import classNames from 'classnames';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';

import { SideBarWidth } from '../constants';

export class SideBarItem {
	constructor(public id: string, public text: string, public icon: string) { }
}
export class SideBarTool extends SideBarItem {
	visible = true;
}

interface ISideBarProps {
	// tslint:disable-next-line:no-any
	classes: any;
	theme: Theme;
	open: boolean;
	enabledToolIds: string[];
	onClose: () => void;
	onItemClicked: (item: SideBarItem) => void;
	onToolClicked: (item: SideBarTool) => void;
}

class SideBar extends React.Component<ISideBarProps> {
	private readonly defaultToolId = 'liquidityportal';
	private readonly tools = [
		new SideBarTool('liquidityportal', 'Liquidity Portal', 'show_chart'),
		new SideBarTool('portfolio', 'Portfolio', 'bubble_chart'),
		new SideBarTool('monitor', 'Monitor', 'insert_chart_outlined'),
		new SideBarTool('posttrade', 'Post Trade', 'pie_chart')
	];
	private readonly standardViews = [
		{ id: 'dashboard', text: 'Dashboard', icon: 'dashboard' },
		{ id: 'alerts', text: 'My Alerts', icon: 'notification_important' },
		{ id: 'reports', text: 'My Reports', icon: 'line_weight' },
		{ id: 'preferences', text: 'Preferences', icon: 'check_circle_outline' }
	];

	constructor(props: ISideBarProps) {
		super(props);
		this.handleItemClicked = this.handleItemClicked.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}

	private handleClose = () => this.props.onClose();
	private handleItemClicked = (item: SideBarItem) => this.props.onItemClicked(item);
	private handleToolClicked = (item: SideBarTool) => this.props.onToolClicked(item);

	componentDidMount() {
		const defaultTool = this.tools.find(x => x.id === this.defaultToolId);
		if (defaultTool) {
			this.handleToolClicked(defaultTool);
		}
	}

	render() {
		const { classes, theme, open } = this.props;

		const tools = this.tools.filter(tool => this.props.enabledToolIds.find(id => tool.id === id));

		const drawer = (
			<div>
				<List>
					{this.standardViews.map(item => (
						<ListItem button key={item.text} onClick={() => this.handleItemClicked(item)}>
							<ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
				<Divider />
				<List>
					{tools.map(item => (
						<ListItem button key={item.text} onClick={() => this.handleToolClicked(item)}>
							<ListItemIcon><Icon>{item.icon}</Icon></ListItemIcon>
							<ListItemText primary={item.text} />
						</ListItem>
					))}
				</List>
			</div>
		);

		return (
			<Drawer
				variant="permanent"
				className={classNames(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				})}
				classes={{
					paper: classNames({
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					}),
				}}
				open={open}>
				<div className={classes.toolbar}>
					<IconButton onClick={this.handleClose}>
						{theme.direction === 'rtl' ? <Icon>chevron_right</Icon> : <Icon>chevron_left</Icon>}
					</IconButton>
				</div>
				<Divider />
				{drawer}
			</Drawer>
		);
	}
}

const styles = (theme: Theme) => createStyles({
	drawer: {
		width: SideBarWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap'
	},
	drawerOpen: {
		width: SideBarWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing.unit * 5 + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing.unit * 7 + 1
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	}
});

export default withStyles(styles, { withTheme: true })(SideBar);