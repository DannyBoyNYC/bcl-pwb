import React from 'react';

import QueryBar from './components/query/query-bar';
import Tabs from './components/tabs/tabs';
import Tab from './components/tabs/tab/tab';
import { Security, AmountType, Query, NullQuery } from './types';

interface ILiquidityPortalProps {
	queries: Query[];
	activeQuery: NullQuery;
	securities: Security[];
	amountTypes: AmountType[];
	onActiveQueryChanged: (query: Query) => void;
	onQueriesChanged: (queries: Query[]) => void;
}

interface ILiquidityPortalState {
	activeQuery: NullQuery;
}

class LiquidityPortal extends React.Component<ILiquidityPortalProps, ILiquidityPortalState> {
	constructor(props: ILiquidityPortalProps) {
		super(props);
		this.state = { activeQuery: this.props.activeQuery };
		this.handleOnQuery = this.handleOnQuery.bind(this);
	}

	private handleOnQuery(query: Query) {
		this.setState({ activeQuery: query }, () => this.props.onActiveQueryChanged(query));
	}

	render() {
		const { activeQuery } = this.state;

		return (
			<div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
				<QueryBar securities={this.props.securities} amountTypes={this.props.amountTypes}
					onQuery={q => this.handleOnQuery(q)} onQueriesChanged={this.props.onQueriesChanged} queries={this.props.queries} />
				<Tabs>
					<Tab label='Product Statistics' />
					<Tab label='Market Impact' />
					<Tab label='Intraday Profiles' />
					<Tab label='Liquidity' />
					<Tab label='Performance' />
					<Tab label='Risk' />
				</Tabs>
			</div>
		);
	}
}

export default LiquidityPortal;
