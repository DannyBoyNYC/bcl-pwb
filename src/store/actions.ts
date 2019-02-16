import { action } from 'typesafe-actions';

import { PwbActionTypes, LiquidityPortalActionTypes, Entitlements } from './types';
import { Security, Query, NullQuery } from '../components/tools/liquidity-portal/types';

export const fetchEntitlementsRequestAction = () => action(PwbActionTypes.FETCH_ENTITLEMENTS_REQUEST);
export const fetchEntitlementsSuccessAction = (entitlements: Entitlements) => action(PwbActionTypes.FETCH_ENTITLEMENTS_SUCCESS, entitlements);
export const fetchEntitlementsFailedAction = () => action(PwbActionTypes.FETCH_ENTITLEMENTS_FAILED);

export const fetchSecuritiesRequestAction = () => action(LiquidityPortalActionTypes.FETCH_SECURITIES_REQUEST);
export const fetchSecuritiesSuccessAction = (securities: Security[]) => action(LiquidityPortalActionTypes.FETCH_SECURITIES_SUCCESS, securities);
export const fetchSecuritiesFailedAction = () => action(LiquidityPortalActionTypes.FETCH_SECURITIES_FAILED);

export const setQueriesRequestAction = (queries: Query[]) => action(LiquidityPortalActionTypes.SET_QUERIES_REQUEST, queries);
export const setActiveQueryRequestAction = (query: NullQuery) => action(LiquidityPortalActionTypes.SET_ACTIVE_QUERY_REQUEST, query);