import React from 'react';
import Paper from '@material-ui/core/Paper';

import SelectSecurity from './select-security';
import SelectAmount from './select-amount/select-amount';
import SelectType from './select-type/select-type';
import CalculateButton from './calculate-button/calculate-button';
import QueryChips from './query-chips/query-chips';
import { Security, AmountType, Query } from '../../types';

interface IQueryBarProps {
	queries: Query[];
	securities: Security[];
	amountTypes: AmountType[];
	onQuery: (query: Query) => void;
	onQueriesChanged: (queries: Query[]) => void;
}

interface IQueryBarState {
	selectedSecurity: Security | null;
	selectedAmount: number | undefined;
	selectedType: AmountType | null;
	isReady: boolean;
	queries: Query[];
}

class QueryBar extends React.Component<IQueryBarProps, IQueryBarState> {
	constructor(props: IQueryBarProps) {
		super(props);
		this.state = {
			selectedSecurity: null,
			selectedAmount: undefined,
			selectedType: null,
			isReady: false,
			queries: this.props.queries
		};
		this.onSecurityChanged = this.onSecurityChanged.bind(this);
		this.onAmountChanged = this.onAmountChanged.bind(this);
		this.onTypeChanged = this.onTypeChanged.bind(this);
		this.onCalculateClicked = this.onCalculateClicked.bind(this);
		this.onDeleteQuery = this.onDeleteQuery.bind(this);
	}

	private determineIsReady(): boolean {
		if (this.state.selectedSecurity && this.state.selectedAmount && this.state.selectedType) {
			return true;
		}
		return false;
	}

	private onSecurityChanged(security: Security) {
		this.setState({ selectedSecurity: security }, () => this.setState({ isReady: this.determineIsReady() }));
	}

	private onAmountChanged(amount: number) {
		this.setState({ selectedAmount: amount }, () => this.setState({ isReady: this.determineIsReady() }));
	}

	private onTypeChanged(type: AmountType) {
		this.setState({ selectedType: type }, () => this.setState({ isReady: this.determineIsReady() }));
	}

	private onCalculateClicked() {
		const { selectedSecurity, selectedAmount, selectedType } = this.state;
		if (selectedSecurity && selectedAmount && selectedType) {
			const query = new Query(selectedSecurity, selectedAmount, selectedType);
			if (this.tryAddQuery(query)) {
				this.props.onQuery(query);
				this.props.onQueriesChanged(this.state.queries);
			}
		}
	}

	private onDeleteQuery(query: Query) {
		const queries = this.state.queries;
		const index = queries.findIndex(q => q.id === query.id);
		if (index >= 0) {
			queries.splice(index, 1);
			this.setState({ queries });
			this.props.onQueriesChanged(this.state.queries);
		}
	}

	private tryAddQuery(query: Query): boolean {
		const queries = this.state.queries;
		if (queries.find(q => q.id === query.id)) {
			return false;
		}
		queries.push(query);
		this.setState({ queries });
		return true;
	}

	render() {
		const hasQueries = this.state.queries.length;
		const paddingBottom = !hasQueries ? 30 : 0;

		return (
			<Paper>
				<div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingBottom, paddingRight: 27 }}>
					<SelectSecurity securities={this.props.securities} security={this.state.selectedSecurity} onChange={this.onSecurityChanged} />
					<SelectAmount onChange={this.onAmountChanged} />
					<SelectType types={this.props.amountTypes} type={this.state.selectedType} onChange={this.onTypeChanged} />
					<CalculateButton disabled={!this.state.isReady} onClick={this.onCalculateClicked} />
				</div>
				{hasQueries ? <QueryChips queries={this.state.queries}
					onDelete={this.onDeleteQuery} onClick={this.props.onQuery} /> : null}
			</Paper>
		);
	}
}

export default QueryBar;