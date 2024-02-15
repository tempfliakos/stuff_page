import {NavBar} from "./NavBar";

export function Navigation({children}) {

	const items = [
		{path: "", content:"Dashboard", icon: "icon-analytics"},
		{path: "movies", content: "Filmek", icon: "icon-movie"},
		{path: "books", content: "Könyvek", icon: "icon-book"},
		{path: "xbox", content: "Xbox", icon: "icon-joystick"},
		{path: "playstation", content: "Playstation", icon: "icon-joystick"},
		{path: "switch", content: "Switch", icon: "icon-joystick"},
		{path: "wishlist", content: "Wishlist", icon: "icon-joystick"},
		{path: "options", content: "Beállítások", icon: "icon-settings"},
		{path: "logout", content: "Kijelentkezés", icon: "icon-logout"},
	];

	return <NavBar items={items}>
		{children}
	</NavBar>
}