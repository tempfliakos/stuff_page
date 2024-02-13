import {Link, useLocation} from "react-router-dom";

export function NavLink({path, content, openMenu}) {
	const location = useLocation();

	function isActive() {
		return location.pathname.endsWith("/" + path);
	}

	function handleOnClick() {
		if(openMenu) {
			openMenu(false);
		}
	}

	return <Link key={path} to={path} className="nav-item" onClick={handleOnClick}>
			<div
				className={"nav-item-container d-flex align-items-center justify-content-center px-5 " + (isActive() ? "active" : "")}>
				{content}
			</div>
		</Link>
}