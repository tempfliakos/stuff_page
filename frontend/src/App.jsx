import {useEffect, useState} from 'react';
import {MovieList} from "./components/pages/MovieList";
import {Navigation} from "./navigation/Navigation";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "./components/pages/Login";
import Cookies from 'universal-cookie';
import {Logout} from "./components/pages/Logout";
import {Options} from "./components/pages/Options";
import {Wishlist} from "./components/pages/Wishlist";
import {SwitchList} from "./components/pages/SwitchList";
import {Dashboard} from "./components/pages/Dashboard";
import {BookList} from "./components/pages/BookList";
import {PlaystationList} from "./components/pages/PlaystationList";
import {XboxList} from "./components/pages/XboxList";

export default function App() {

	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(null);

	useEffect(() => {
		const cookies = new Cookies();
		if (cookies.get("stuffPages")) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
			navigate("/");
		}
	}, [loggedIn, navigate]);

	return loggedIn ? <div className="wrapper p-3">
			{loggedIn ?
				<Navigation>
					<div className="grid-area-main">
						<Routes>
							<Route exact path="/" element={<Dashboard/>}/>
							<Route path="/movies" element={<MovieList/>}/>
							<Route path="/books" element={<BookList/>}/>
							<Route path="/xbox" element={<XboxList/>}/>
							<Route path="/playstation" element={<PlaystationList/>}/>
							<Route path="/switch" element={<SwitchList/>}/>
							<Route path="/wishlist" element={<Wishlist/>}/>
							<Route path="/options" element={<Options/>}/>
							<Route path="/logout" element={<Logout logged={setLoggedIn}/>}/>
						</Routes>
					</div>
				</Navigation>
				: <Login logged={setLoggedIn}/>}
		</div> : null
}
