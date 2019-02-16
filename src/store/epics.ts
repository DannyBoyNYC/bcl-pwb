import { from, of, throwError, Observable } from 'rxjs';
import { Action } from 'redux';
import { switchMap, map, delay, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';

import { IAppState, PwbActionTypes, LiquidityPortalActionTypes, Entitlements } from './types';
import { fetchEntitlementsSuccessAction, fetchSecuritiesSuccessAction, fetchSecuritiesFailedAction, fetchEntitlementsFailedAction } from './actions';
import { Security } from '../components/tools/liquidity-portal/types';

const fakeSecuritiesStream = (): Observable<Security[]> => {
	return new Observable(x => {
		const symbols = ['BP', 'VOD', 'BARC', 'BARC', 'RBS', 'ABF', 'ADM', 'ADM', 'AAL', 'ANTO', 'AHT', 'BHP',
			'BLND', 'BKG', 'AUTO', 'HSX', 'INF', 'ITV', 'JMAT', 'LSE', 'MKS', 'MRO', 'MCRO', 'LLOY', 'LAND', 'NXT',
			'PSON', 'OCDO', 'RTO', 'SDR'];
		const securities = [];
		for (let i = 0; i < 350000; i++) {
			const ric = i.toString();
			const symbol = symbols[Math.floor((Math.random() * (symbols.length - 1)))];
			const name = `${symbol}${ric}`;
			const averageDailyTradingVolume = Math.floor((Math.random() * 1000000) + 1);
			securities.push({ ric, symbol, name, averageDailyTradingVolume });
		}
		x.next(securities);
	});
};

const fakeEntitlementsStream = (): Observable<Entitlements> =>
	new Observable(x => x.next(new Entitlements(['liquidityportal', 'portfolio', 'monitor', 'posttrade'])));

// tslint:disable-next-line:no-any
export const fakeFetchSecuritiesEpic = (actions$: Observable<Action>, state$: Observable<IAppState>, dependencies: any) => {
	return actions$.pipe(
		ofType(LiquidityPortalActionTypes.FETCH_SECURITIES_REQUEST),
		delay(2000), //<- Simulate the delay in fetching
		switchMap(_ =>
			fakeSecuritiesStream().pipe(
				map(x => fetchSecuritiesSuccessAction(x)),
				catchError(_ => of(fetchSecuritiesFailedAction()))
			))
	);
};

// tslint:disable-next-line:no-any
export const fakeFetchEntitlementsEpic = (actions$: Observable<Action>, state$: Observable<IAppState>, dependencies: any) => {
	return actions$.pipe(
		ofType(PwbActionTypes.FETCH_ENTITLEMENTS_REQUEST),
		delay(5000), //<- Simulate the delay in fetching
		switchMap(_ =>
			fakeEntitlementsStream().pipe(
				map(x => fetchEntitlementsSuccessAction(x)),
				catchError(_ => of(fetchEntitlementsFailedAction()))
			))
	);
};