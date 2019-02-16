import { Reducer, AnyAction } from 'redux';

import { IAppState, IPwbState, ILiquidityPortalState, PwbActionTypes, LiquidityPortalActionTypes } from './types';

const initialAppState: IAppState = {
	pwb: {
		isLoading: false,
		entitlements: null,
		entitlementsLoadingFailed: false
	},
	tools: {
		liquidityPortal: {
			queries: [],
			activeQuery: null,
			securities: [],
			securitiesLoading: false,
			securitiesLoadingFailed: false
		}
	}
};

const pwbReducer: Reducer<IPwbState> = (state = initialAppState.pwb, action) => {
	switch (action.type) {
		case PwbActionTypes.FETCH_ENTITLEMENTS_REQUEST: {
			return { ...state, isLoading: true };
		}
		case PwbActionTypes.FETCH_ENTITLEMENTS_SUCCESS: {
			return { ...state, isLoading: false, entitlements: action['payload'] };
		}
		case PwbActionTypes.FETCH_ENTITLEMENTS_FAILED: {
			return { ...state, isLoading: false, entitlementsLoadingFailed: true };
		}
		default:
			return state;
	}
};

const liquidityPortalReducer: Reducer<ILiquidityPortalState> = (state = initialAppState.tools.liquidityPortal, action) => {
	switch (action.type) {
		case LiquidityPortalActionTypes.FETCH_SECURITIES_REQUEST: {
			return { ...state, securitiesLoading: true };
		}
		case LiquidityPortalActionTypes.FETCH_SECURITIES_SUCCESS: {
			return { ...state, securities: action['payload'], securitiesLoading: false };
		}
		case LiquidityPortalActionTypes.FETCH_SECURITIES_FAILED: {
			console.log('FETCH_SECURITIES_FAILED');
			return { ...state, securitiesLoadingFailed: true, securitiesLoading: false };
		}
		case LiquidityPortalActionTypes.SET_QUERIES_REQUEST: {
			return { ...state, queries: action['payload'] };
		}
		case LiquidityPortalActionTypes.SET_ACTIVE_QUERY_REQUEST: {
			return { ...state, activeQuery: action['payload'] };
		}
		default:
			return state;
	}
};

const appReducer: Reducer<IAppState> = (state = initialAppState, action: AnyAction) => {
	return {
		pwb: pwbReducer(state.pwb, action),
		tools: {
			liquidityPortal: liquidityPortalReducer(state.tools.liquidityPortal, action)
		}
	};
};

export default appReducer;