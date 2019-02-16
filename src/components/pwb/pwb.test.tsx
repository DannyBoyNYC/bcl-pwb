import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import Pwb from "./pwb";
import configureStore from '../../store/configure';

it("renders without crashing", () => {
	const div = document.createElement("div");
	const tree = (
		<Provider store={configureStore(true)}>
			<BrowserRouter>
				<Pwb />
			</BrowserRouter>
		</Provider>
	);
	ReactDOM.render(tree, div);
	ReactDOM.unmountComponentAtNode(div);
});