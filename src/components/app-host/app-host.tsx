import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';

import LiquidityPortalContainer from './containers/liquidity-portal-container';

interface IAppHostProps {
	// tslint:disable-next-line:no-any
	classes: any;
	theme: Theme;
	height: number;
}

const AppHost: React.FunctionComponent<IAppHostProps> = props => {
	return (
		<main className={props.classes.content} style={{ height: props.height }}>
			<div className={props.classes.toolbar} />
			<div className={props.classes.appContainer}>
				<Switch>
					<Route path='/tools/liquidityportal' exact render={routeProps => <LiquidityPortalContainer {...routeProps} />} />
				</Switch>
			</div>
		</main>
	);
};

const styles = (theme: Theme) => createStyles({
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing.unit * 3
	},
	appContainer: {
		height: `calc(100% - ${theme.spacing.unit * 7.5}px)`
	}
});

export default withStyles(styles, { withTheme: true })(AppHost);