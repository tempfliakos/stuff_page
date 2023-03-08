import React from "react";
import {NavBar} from "./NavBar";
import {Link, useLocation} from "react-router-dom";
import {NavLink} from "./NavLink";

export function Navigation({children}) {

	const leftItems = [
		<NavLink path="" content="Dashboard"/>,
		<NavLink path="movies" content="Filmek"/>,
		<NavLink path="books" content="Könyvek"/>,
		<NavLink path="xbox" content="Xbox"/>,
		<NavLink path="playstation" content="Playstation"/>,
		<NavLink path="switch" content="Switch"/>,
		<NavLink path="wishlist" content="Wishlist"/>,
		<NavLink path="options" content="Beállítások"/>,
		<NavLink path="logout" content="Kijelentkezés"/>
	];
	const rightItems = [

	];

	return <NavBar leftItems={leftItems} rightItems={rightItems}>
		{children}
	</NavBar>
}