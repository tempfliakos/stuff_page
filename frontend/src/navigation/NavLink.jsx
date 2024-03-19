import {Link, useLocation} from "react-router-dom";

export function NavLink({path, content, openMenu, icon, iconComponent}) {
	const location = useLocation();

	function isActive() {
		return location.pathname.endsWith("/" + path);
	}

	function handleOnClick() {
		if(openMenu) {
			openMenu(false);
		}
	}

	return <Link key={path} to={path} className="nav-item w-100" onClick={handleOnClick}>
		<div
			className={"nav-item-container d-none d-lg-flex align-items-center justify-content-center px-5 " + (isActive() ? "active" : "")}>
			{content}
		</div>
		<div
			className={"nav-item-container icon-container d-flex flex-column d-lg-none align-items-center justify-content-center " + (isActive() ? "active" : "")}>
			{iconComponent}
			{<i className={icon}/>}
		</div>
	</Link>
}