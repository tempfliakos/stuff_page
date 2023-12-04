import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie/lib";

export function Logout({logged}) {

    const navigate = useNavigate();

    function handleLogout() {
        const cookie = new Cookies();
        cookie.remove("stuffPages");
        logged(false);
        navigate("/");
    }

    useEffect(() => {
        handleLogout();
    });

    return (<></>)
}