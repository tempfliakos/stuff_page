import {NavLink} from "./NavLink";
import {useState} from "react";
import {Button} from "../components/abstracts/Button";

export function NavBar({items, children}) {

	const [open, setOpen] = useState(true);

	function handleOpenMenu() {
		setOpen(!open);
	}

	return <>
		<div className="menu">
			<div id="navBar">
				<div className="d-none d-lg-flex flex-column align-items-center justify-content-center flex-wrap gap-3">
					{items.map(item =>
						<NavLink key={item.path} path={item.path} content={item.content}/>
					)}
				</div>

				<div className="d-flex d-lg-none flex-column align-items-center gap-3">
					{/*<Button icon={open ? "icon-close" : "icon-menu"} additionalClassNames="floating-button position-relative"*/}
					{/*        onClick={handleOpenMenu}/>*/}
					<div className="d-flex flex-column gap-3">
						{open ? items.map(item =>
							<NavLink key={item.path} path={item.path} content={item.content} icon={item.icon}
							         iconComponent={item.iconComponent}/>
						) : null}
					</div>
				</div>
			</div>
		</div>
		{children}
	</>

}
