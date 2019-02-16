import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import appReducer from './reducers';
import Environment from '../environment';
import { fakeFetchEntitlementsEpic, fakeFetchSecuritiesEpic } from './epics';

const configureStore = (isFake: boolean) => {

	const epicMiddleware = createEpicMiddleware({
		dependencies: {
			environment: new Environment()
		}
	});
	const store = createStore(appReducer, composeWithDevTools(applyMiddleware(epicMiddleware)));

	const epics = isFake
		? combineEpics(fakeFetchEntitlementsEpic, fakeFetchSecuritiesEpic)
		: combineEpics(fakeFetchEntitlementsEpic, fakeFetchSecuritiesEpic) //<- Only fakes for now - swap-out accordingly

	epicMiddleware.run(epics);

	return store;
};

export default configureStore;