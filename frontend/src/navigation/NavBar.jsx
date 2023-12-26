import {NavLink} from "./NavLink";
import {useState} from "react";
import {Button} from "../components/abstracts/Button";

export function NavBar({items, children}) {

	const [open, setOpen] = useState(false);

	function handleOpenMenu() {
		setOpen(!open);
		window.scrollTo(0,0);
	}

	return <>
		<div className="grid-area-menu">
			<div className="d-sm-none d-lg-flex align-items-center justify-content-center flex-wrap gap-3">
				{items.map(item =>
					<NavLink key={item.path} path={item.path} content={item.content}/>
				)}
			</div>

			<div className="d-lg-none d-flex flex-column gap-3">
				<Button icon={open ? "icon-close" : "icon-menu"} additionalClassNames="floating-button menu" onClick={handleOpenMenu}/>
				{open ? items.map(item =>
						<NavLink key={item.path} path={item.path} content={item.content} openMenu={() => setOpen(false)}/>
					) : null
				}
			</div>
		</div>
		{children}
	</>

}
