import React from "react";
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CssBaseline from "@material-ui/core/CssBaseline";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

import "./pwb.css";
import ErrorMessage from '../error-message/error-message';
import { IAppState, Entitlements } from '../../store/types';
import { DarkTheme, LightTheme, BarclaysTheme } from "../../themes";
import SideBar, { SideBarItem } from "../side-bar/side-bar";
import AppBar from "../app-bar/app-bar";
import AppHost from "../app-host/app-host";
import { fetchEntitlementsRequestAction } from '../../store/actions';

const Theme = DarkTheme;
// const Theme = BarclaysTheme;

interface IPwbState {
	sideBarOpen: boolean;
	activeSideBarItem: SideBarItem | null;
	height: number;
}

interface IPwbProps extends RouteComponentProps<{}> {
	fetchEntitlements: () => void;
	isLoading: boolean;
	entitlements: Entitlements | null;
	entitlementsLoadingFailed: boolean;
}

class Pwb extends React.Component<IPwbProps, IPwbState> {
	private listener: EventListenerOrEventListenerObject;

	constructor(props: IPwbProps) {
		super(props);
		const windowHeight = window.innerHeight;
		this.state = {
			sideBarOpen: false,
			activeSideBarItem: null,
			height: windowHeight
		};
		this.listener = () => this.setState({ height: window.innerHeight });
		this.handleOpen = this.handleOpen.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleToolClicked = this.handleToolClicked.bind(this);
		this.handleItemClicked = this.handleItemClicked.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.listener);

		this.props.fetchEntitlements();
	}
	componentWillUnmount() {
		window.removeEventListener('resize', this.listener);
	}

	private handleOpen = () => this.setState({ sideBarOpen: true });
	private handleClose = () => this.setState({ sideBarOpen: false });

	private handleItemClicked(item: SideBarItem) {
		this.setState({ activeSideBarItem: item });
		this.props.history.push(`/${item.id}`);
	}

	private handleToolClicked(item: SideBarItem) {
		this.setState({ activeSideBarItem: item });
		this.props.history.push(`/tools/${item.id}`);
	}

	render() {
		return (
			<MuiThemeProvider theme={Theme}>
				<CssBaseline />
				{this.props.entitlementsLoadingFailed
					? <ErrorMessage message='Failed to get entitlements' /> : this.renderSuccess()
				}
			</MuiThemeProvider>
		);
	}

	private renderSuccess() {
		const activeSideBarItem = this.state.activeSideBarItem;
		const { entitlements, isLoading } = this.props;

		return isLoading
			? <CircularProgress style={{ width: '40px', height: '40px', position: 'absolute', top: '42%', left: '50%' }} />
			: <div style={{ display: "flex" }}>

				<AppBar
					open={this.state.sideBarOpen}
					onOpen={() => this.handleOpen()}
					headerText={activeSideBarItem ? activeSideBarItem.text : ""} />

				<SideBar
					enabledToolIds={entitlements ? entitlements.toolIds : []}
					open={this.state.sideBarOpen}
					onClose={() => this.handleClose()}
					onItemClicked={item => this.handleItemClicked(item)}
					onToolClicked={item => this.handleToolClicked(item)} />

				{activeSideBarItem ? <AppHost height={this.state.height} /> : null}

			</div>;
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		isLoading: state.pwb.isLoading,
		entitlements: state.pwb.entitlements,
		entitlementsLoadingFailed: state.pwb.entitlementsLoadingFailed
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchEntitlements: () => dispatch(fetchEntitlementsRequestAction())
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pwb));