import { Security, Query, NullQuery } from '../components/tools/liquidity-portal/types';

export interface IAppState {
	readonly pwb: IPwbState;
	readonly tools: {
		readonly liquidityPortal: ILiquidityPortalState;
	};
}

export interface IPwbState {
	readonly isLoading: boolean;
	readonly entitlements: Entitlements | null;
	readonly entitlementsLoadingFailed: boolean;
}

export interface ILiquidityPortalState {
	readonly securities: Security[];
	readonly securitiesLoading: boolean;
	readonly securitiesLoadingFailed: boolean;
	readonly queries: Query[];
	readonly activeQuery: NullQuery;
}

export enum PwbActionTypes {
	FETCH_ENTITLEMENTS_REQUEST = '@@pwb/FETCH_ENTITLEMENTS_REQUEST',
	FETCH_ENTITLEMENTS_SUCCESS = '@@pwb/FETCH_ENTITLEMENTS_SUCCESS',
	FETCH_ENTITLEMENTS_FAILED = '@@pwb/FETCH_ENTITLEMENTS_FAILED'
}

export enum LiquidityPortalActionTypes {
	FETCH_SECURITIES_REQUEST = '@@liquidityPortal/FETCH_SECURITIES_REQUEST',
	FETCH_SECURITIES_SUCCESS = '@@liquidityPortal/FETCH_SECURITIES_SUCCESS',
	FETCH_SECURITIES_FAILED = '@@liquidityPortal/FETCH_SECURITIES_FAILED',
	SET_QUERIES_REQUEST = '@@liquidityPortal/SET_QUERIES_REQUEST',
	SET_ACTIVE_QUERY_REQUEST = '@@liquidityPortal/SET_ACTIVE_QUERY_REQUEST'
}

export class Entitlements {
	constructor(public toolIds: string[]) { }
}