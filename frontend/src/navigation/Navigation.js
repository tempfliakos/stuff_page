import React from "react";
import {NavBar} from "./NavBar";
import {Link, useLocation} from "react-router-dom";

export function Navigation({children}) {

    const location = useLocation();

    function isActive(path) {
        return location.pathname.endsWith(path);
    }

    const leftItems = [
        {as: Link, content: "Dashboard", key: "/", to: "/", active: isActive("/")},
        {as: Link, content: "Filmek", key: "movies", to: "movies", active: isActive("/movies")},
        {as: Link, content: "Könyvek", key: "books", to: "books", active: isActive("/books")},
        {as: Link, content: "Xbox", key: "xbox", to: "xbox", active: isActive("/xbox")},
        {as: Link, content: "Playstation", key: "playstation", to: "playstation", active: isActive("/playstation")},
        {as: Link, content: "Switch", key: "switch", to: "switch", active: isActive("/switch")},
        {as: Link, content: "Wishlist", key: "wishlist", to: "wishlist", active: isActive("/wishlist")},
        // {as: Link, content: "Szülinap", key: "birthday", to: "birthday", active: isActive("/birthday")},
    ];
    const rightItems = [
        {as: Link, content: "Beállítások", key: "options", to: "options", active: isActive("/options")},
        {as: Link, content: "Kijelentkezés", key: "logout", to: "/logout"}
    ];

    return <NavBar leftItems={leftItems} rightItems={rightItems}>
        {children}
    </NavBar>
}