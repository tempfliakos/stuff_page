import React from "react";
import {NavBar} from "./NavBar";

export function Navigation({children}) {

	const leftItems = [
		{path: "", content:"Dashboard"},
		{path: "movies", content: "Filmek"},
		{path: "books", content: "Könyvek"},
		{path: "xbox", content: "Xbox"},
		{path: "playstation", content: "Playstation"},
		{path: "switch", content: "Switch"},
		{path: "wishlist", content: "Wishlist"},
		{path: "options", content: "Beállítások"},
		{path: "logout", content: "Kijelentkezés"},
	];
	const rightItems = [

	];

	return <NavBar leftItems={leftItems} rightItems={rightItems}>
		{children}
	</NavBar>
}