import React from "react";
import { Observable, Subscription, asyncScheduler } from 'rxjs';
import { subscribeOn } from 'rxjs/operators';
import Autosuggest from "react-autosuggest";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

class SelectSecurity extends React.Component {
	filterSubscription = Subscription.EMPTY;

	constructor(props) {
		super(props);
		this.state = {
			value: props.security ? props.security.name : '',
			security: props.security,
			securities: []
		};
	}

	componentWillUnmount() {
		if (this.filterSubscription) {
			this.filterSubscription.unsubscribe();
		}
	}

	getSecurityValue = security => security.name;
	onSecuritiesClearRequested = () => this.setState({ suggestions: [] });
	onSecuritySelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
		this.setState({ security: suggestion }, () => this.props.onChange(suggestion));
	}

	onChange = (event, params) => {
		this.setState({ value: params.newValue }, () => {
			const name = this.state.value.toLowerCase();
			const security = this.props.securities.find(x => x.name.toLowerCase() === name);
			this.setState({ security }, () => this.props.onChange(security));
		});
	};

	onSecuritiesFetchRequested = request => {
		this.setState({ securities: [] }, () => {
			if (this.filterSubscription) {
				this.filterSubscription.unsubscribe();
			}
			this.filterSubscription = this.filterStream(request.value)
				.pipe(subscribeOn(asyncScheduler))
				.subscribe(filteredSecurities => this.setState({ securities: filteredSecurities }));
		});
	}

	filterStream(value) {
		return new Observable(x => {
			const match = (security, value) =>
				security.ric.toLowerCase().includes(value) ||
				security.symbol.toLowerCase().includes(value) ||
				security.name.toLowerCase().includes(value);

			const sortByAverageDailyTradingVolume = (securityA, securityB) => {
				const a = securityA.averageDailyTradingVolume, b = securityB.averageDailyTradingVolume;
				if (a === b) {
					return 0;
				}
				return a < b ? 1 : -1;
			}

			const lowercase = value.toLowerCase();
			let list = this.props.securities.filter(x => match(x, lowercase));

			if (list.length) {
				list = list.slice(0, 20);
				list.sort((l, r) => sortByAverageDailyTradingVolume(l, r));
			}

			x.next(list);
			x.complete();
		});
	}

	renderSecurity(security, { query, isHighlighted }) {
		return (
			<MenuItem
				selected={isHighlighted}
				component="div"
				style={{
					boxSizing: "unset",
					padding: "0px",
					paddingLeft: "6px",
					fontSize: "11px"
				}}>
				<div>
					<span key={security.ric} style={{ fontWeight: 500 }}>
						{`${security.ric} | ${security.symbol} | ${security.name}`}
					</span>
				</div>
			</MenuItem>
		);
	}

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<Autosuggest
					renderInputComponent={this.renderInputComponent}
					suggestions={this.state.securities}
					onSuggestionsFetchRequested={this.onSecuritiesFetchRequested}
					onSuggestionsClearRequested={this.onSecuritiesClearRequested}
					getSuggestionValue={this.getSecurityValue}
					renderSuggestion={this.renderSecurity}
					onSuggestionSelected={this.onSecuritySelected}
					inputProps={{
						classes,
						value: this.state.value,
						onChange: this.onChange
					}}
					theme={{
						container: classes.container,
						suggestionsContainerOpen: classes.suggestionsContainerOpen,
						suggestionsList: classes.suggestionsList,
						suggestion: classes.suggestion
					}}
					renderSuggestionsContainer={options => (
						<Paper {...options.containerProps} square>
							{options.children}
						</Paper>
					)}
				/>
			</div>
		);
	}

	renderInputComponent(inputProps) {
		const { classes, inputRef = () => { }, ref, ...other } = inputProps;
		return (
			<TextField
				label="Security"
				autoFocus={true}
				fullWidth
				InputProps={{
					inputRef: node => {
						ref(node);
						inputRef(node);
					},
					classes: {
						input: classes.input
					}
				}}
				{...other}
			/>
		);
	}
}

const styles = theme => ({
	root: {
		marginLeft: theme.spacing.unit * 5,
		marginTop: theme.spacing.unit * 2,
		width: 200
	},
	container: {
		position: "relative"
	},
	suggestionsContainerOpen: {
		position: "absolute",
		zIndex: 1,
		marginTop: theme.spacing.unit,
		left: 0,
		right: 0,
	},
	suggestion: {
		display: "block"
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: "none",
		maxHeight: `${theme.spacing.unit * 20}px`,
		overflowY: 'auto'
	},
	divider: {
		height: theme.spacing.unit * 2
	}
});

export default withStyles(styles, { withTheme: true })(SelectSecurity);
