import {NavBar} from "./NavBar";
import {XboxIcon} from "../components/svgs/XboxIcon";
import {PlaystationIcon} from "../components/svgs/PlaystationIcon";
import {SwitchIcon} from "../components/svgs/SwitchIcon";

export function Navigation({children}) {

	const items = [
		{path: "", content:"Dashboard", icon: "icon-analytics"},
		{path: "movies", content: "Filmek", icon: "icon-movie"},
		{path: "books", content: "Könyvek", icon: "icon-book"},
		{path: "xbox", content: "Xbox", icon:"", iconComponent: <XboxIcon additionalClassNames="p-3"/>},
		{path: "playstation", content: "Playstation", iconComponent: <PlaystationIcon additionalClassNames="p-3"/>},
		{path: "switch", content: "Switch", iconComponent: <SwitchIcon additionalClassNames="p-3"/>},
		{path: "wishlist", content: "Wishlist", icon: "icon-joystick"},
		{path: "options", content: "Beállítások", icon: "icon-settings"},
		{path: "logout", content: "Kijelentkezés", icon: "icon-logout"},
	];

	return <NavBar items={items}>
		{children}
	</NavBar>
}