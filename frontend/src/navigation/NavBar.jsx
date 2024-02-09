import {NavLink} from "./NavLink";
import {useState} from "react";
import {Button} from "../components/abstracts/Button";

export function NavBar({items, children}) {

	const [open, setOpen] = useState(false);

	function handleOpenMenu() {
		setOpen(!open);
	}

	return <>
		<div className="grid-area-menu">
			<div id="navBar">
				<div className="d-none d-lg-flex flex-column align-items-center justify-content-center flex-wrap gap-3">
					{items.map(item =>
						<NavLink key={item.path} path={item.path} content={item.content}/>
					)}
				</div>

				<div className="d-flex d-lg-none flex-column gap-3">
					<Button icon={open ? "icon-close" : "icon-menu"} additionalClassNames="floating-button position-relative"
					        onClick={handleOpenMenu}/>
					<div className="d-flex flex-column gap-3">
						{open ? items.map(item =>
							<NavLink key={item.path} path={item.path} content={item.content}
							         openMenu={() => setOpen(false)}/>
						) : null}
					</div>
				</div>
			</div>
		</div>
		{children}
	</>

}
