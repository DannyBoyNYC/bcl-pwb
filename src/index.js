import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";

import './index.css';
import Pwb from './components/pwb/pwb';
import configureStore from './store/configure';

const app = (
	<Provider store={configureStore(false)}>
		<BrowserRouter>
			<Pwb />
		</BrowserRouter>
	</Provider>
);

ReactDOM.render(app, document.getElementById('root'));