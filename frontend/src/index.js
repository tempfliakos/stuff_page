import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {Provider} from "react-redux";
import {store} from "./store/store";
import {BrowserRouter} from "react-router-dom";
import "./style/_main.scss";
import {Loading} from "./components/components/Loading";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App/>
			<Loading/>
		</BrowserRouter>
	</Provider>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
