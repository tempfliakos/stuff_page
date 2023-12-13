import {useEffect, useState} from 'react';
import {MovieList} from "./components/pages/MovieList";
import {Navigation} from "./navigation/Navigation";
import {Route, Routes, useNavigate} from "react-router-dom";
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

export default function App() {

	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useState(false);

	const children = <Routes>
		<Route exact path="/" element={<Dashboard/>}/>
		<Route path="/movies" element={<MovieList/>}/>
		<Route path="/books" element={<BookList/>}/>
		<Route path="/xbox" element={<XboxList/>}/>
		<Route path="/playstation" element={<PsList/>}/>
		<Route path="/switch" element={<SwitchList/>}/>
		<Route path="/wishlist" element={<Wishlist/>}/>
		{/*
		<Route path="/birthday" element={<Birthday/>}/>}
		*/}
		<Route path="/options" element={<Options/>}/>
		<Route path="/logout" element={<Logout logged={setLoggedIn}/>}/>


	</Routes>

	useEffect(() => {
			const cookies = new Cookies();
			if (!cookies.get("stuffPages")) {
				setLoggedIn(false);
				navigate("/");
			} else {
				setLoggedIn(true);
			}
		}
		,
		[loggedIn, navigate]
	)
	;

	return (
		<div className="wrapper p-3">
			{loggedIn ?
				<Navigation children={children}/>
				: <Login logged={setLoggedIn}/>}
		</div>
	);
}
