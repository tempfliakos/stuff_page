import {Link, useLocation} from "react-router-dom";

export function NavLink({path, content}) {
	const location = useLocation();

	function isActive() {
		return location.pathname.endsWith("/" + path);
	}

	return <Link key={path} to={path} active={isActive()}
		      class="nav-item">
			<div
				className={"nav-item-container d-flex align-items-center justify-content-center px-5 " + (isActive() ? "active" : "")}>
				{content}
			</div>
		</Link>
}