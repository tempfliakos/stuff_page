import React from "react";
import {Link, useHistory, useLocation} from "react-router-dom";
import {Container, Icon, Menu} from "semantic-ui-react";
import classnames from "classnames";
import Cookies from "universal-cookie/lib";

export function NavBar({logged}) {

    const location = useLocation();
    const history = useHistory();

    function isActive(path) {
        return location.pathname.startsWith(path);
    }

    function linkClass(path) {
        return classnames("item", { active: isActive(path) });
    }

    function handleLogout() {
        const cookie = new Cookies();
        cookie.remove("id");
        logged(false);
        history.push("/");
    }

    return (
        <Menu secondary as={Container} color={"red"}>
            <Link to="/movies" className={linkClass("/movies")}>
                Filmek
            </Link>
            <Link to="/books" className={linkClass("/books")}>
                Könyvek
            </Link>
            <Link to="/games" className={linkClass("/games")}>
                Játékok
            </Link>
            <Menu.Item position={"right"}>
                <Icon name={"power off"} color="red" onClick={handleLogout} size="large" link/>
            </Menu.Item>
        </Menu>
    );
}