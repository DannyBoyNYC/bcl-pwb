import React from "react";
import classNames from "classnames";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { createStyles, withStyles, Theme } from "@material-ui/core/styles";

import { SideBarWidth } from "../constants";

interface IAppBarProps {
	// tslint:disable-next-line:no-any
	classes: any;
	theme: Theme;
	open: boolean;
	headerText: string;
	onOpen: () => void;
}

class AppBar extends React.Component<IAppBarProps> {
	constructor(props: IAppBarProps) {
		super(props);
		this.handleOpen = this.handleOpen.bind(this);
	}

	private handleOpen = () => this.props.onOpen();

	render() {
		const { classes, open, headerText } = this.props;

		return (
			<MuiAppBar
				position="fixed"
				className={classNames(classes.appBar, {
					[classes.appBarShift]: open
				})}>
				<Toolbar disableGutters={!open}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={this.handleOpen}
						className={classNames(classes.menuButton, {
							[classes.hide]: open
						})}
					>
						<Icon>menu</Icon>
					</IconButton>
					<Typography variant="h6" color="inherit" noWrap>
						{headerText}
					</Typography>
				</Toolbar>
			</MuiAppBar>
		);
	}
}

const styles = (theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			})
		},
		appBarShift: {
			marginLeft: SideBarWidth,
			width: `calc(100% - ${SideBarWidth}px)`,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		}
	});

export default withStyles(styles, { withTheme: true })(AppBar);