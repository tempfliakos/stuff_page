import React, {useEffect} from "react";
import {useHistory} from "react-router-dom";
import Cookies from "universal-cookie/lib";

export function Logout({logged}) {

    const history = useHistory();

    function handleLogout() {
        const cookie = new Cookies();
        cookie.remove("stuffPages");
        logged(false);
        history.push("/");
    }

    useEffect(() => {
        handleLogout();
    });

    return (<></>)
}