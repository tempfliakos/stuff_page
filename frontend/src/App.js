import React, {useEffect, useState} from 'react';
import {MovieList} from "./components/pages/MovieList";
import {Navigation} from "./navigation/Navigation";
import {Route, Switch, useHistory} from "react-router-dom";
import {Login} from "./components/pages/Login";
import Cookies from 'universal-cookie';
import {XboxList} from "./components/pages/XboxList";
import {Logout} from "./components/pages/Logout";
import {PsList} from "./components/pages/PsList";
import {Options} from "./components/pages/Options";
import {Wishlist} from "./components/pages/Wishlist";
import {SwitchList} from "./components/pages/SwitchList";
import {Dashboard} from "./components/pages/Dashboard";
import {BookList} from "./components/pages/BookList";

function App() {

	const history = useHistory();
	const [loggedIn, setLoggedIn] = useState(false);

	const children = <div class="wrapper">App</div>
		// <Grid container columns="equal">
	// 	<Switch>
	// 		<Route exact path="/">
	// 			<Dashboard/>
	// 		</Route>
	// 		<Route path="/movies">
	// 			<MovieList/>
	// 		</Route>
	// 		<Route path="/books">
	// 			<BookList/>
	// 		</Route>
	// 		<Route path="/xbox">
	// 			<XboxList/>
	// 		</Route>
	// 		<Route path="/playstation">
	// 			<PsList/>
	// 		</Route>
	// 		<Route path="/switch">
	// 			<SwitchList/>
	// 		</Route>
	// 		<Route path="/wishlist">
	// 			<Wishlist/>
	// 		</Route>
	// 		{/*            <Route path="/birthday">
    //             <Birthday/>
    //         </Route>*/}
	// 		<Route path="/options">
	// 			<Options/>
	// 		</Route>
	// 		<Route path="/logout">
	// 			<Logout logged={setLoggedIn}/>
	// 		</Route>
	// 	</Switch>
	// </Grid>

	useEffect(() => {
			const cookies = new Cookies();
			if (!cookies.get("stuffPages")) {
				setLoggedIn(false);
				history.push("/");
			} else {
				setLoggedIn(true);
			}
		}
		,
		[loggedIn, history]
	)
	;

	return (
		<div>
			{loggedIn ?
				<div>Asd</div>
				// <Navigation children={children}/>
				: <Login logged={setLoggedIn}/>}
		</div>
	);
}

export default App;
