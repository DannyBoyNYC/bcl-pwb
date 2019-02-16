import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import ErrorMessage from '../../error-message/error-message';
import { IAppState } from '../../../store/types';
import { Security, AmountType, Query, NullQuery } from '../../tools/liquidity-portal/types';
import LiquidityPortal from '../../tools/liquidity-portal/liquidity-portal';
import { fetchSecuritiesRequestAction, setQueriesRequestAction, setActiveQueryRequestAction } from '../../../store/actions';

interface ILiquidityPortalContainerProps {
	queries: Query[];
	activeQuery: NullQuery;
	securities: Security[];
	securitiesLoading: boolean;
	securitiesLoadingFailed: boolean;
	fetchSecurities: () => void;
	setQueries: (queries: Query[]) => void;
	setActiveQuery: (activeQuery: NullQuery) => void;
}

interface ILiquidityPortalContainerState {
	amountTypes: AmountType[];
	queries: Query[];
	activeQuery: NullQuery;
}

class LiquidityPortalContainer extends React.Component<ILiquidityPortalContainerProps, ILiquidityPortalContainerState> {
	constructor(props: ILiquidityPortalContainerProps) {
		super(props);
		this.state = { amountTypes: this.amountTypes(), queries: this.props.queries, activeQuery: this.props.activeQuery };
	}

	componentDidMount() {
		if (!this.props.securities.length) {
			this.props.fetchSecurities();
		}
	}

	componentWillUnmount() {
		this.props.setQueries(this.state.queries);
		this.props.setActiveQuery(this.state.activeQuery);
	}

	render() {
		return this.props.securitiesLoadingFailed
			? <ErrorMessage message='Failed to get securities' /> : this.renderSuccess();
	}

	private renderSuccess() {
		return this.props.securitiesLoading
			? <CircularProgress style={{ width: '40px', height: '40px', position: 'absolute', top: '42%', left: '50%' }} />
			: <LiquidityPortal securities={this.props.securities} amountTypes={this.state.amountTypes}
				onQueriesChanged={queries => this.setState({ queries })} queries={this.state.queries}
				onActiveQueryChanged={activeQuery => this.setState({ activeQuery })} activeQuery={this.state.activeQuery} />;
	}

	private amountTypes(): AmountType[] {
		return [
			{ id: '1', name: 'Shares' },
			{ id: '2', name: 'Local Value' },
			{ id: '3', name: 'Value' },
			{ id: '4', name: '% Market Cap' },
			{ id: '5', name: '% ADV' }];
	}
}

const mapStateToProps = (state: IAppState) => {
	return {
		queries: state.tools.liquidityPortal.queries,
		activeQuery: state.tools.liquidityPortal.activeQuery,
		securities: state.tools.liquidityPortal.securities,
		securitiesLoading: state.tools.liquidityPortal.securitiesLoading,
		securitiesLoadingFailed: state.tools.liquidityPortal.securitiesLoadingFailed
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {
		fetchSecurities: () => dispatch(fetchSecuritiesRequestAction()),
		setQueries: (queries: Query[]) => dispatch(setQueriesRequestAction(queries)),
		setActiveQuery: (activeQuery: NullQuery) => dispatch(setActiveQueryRequestAction(activeQuery))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(LiquidityPortalContainer);