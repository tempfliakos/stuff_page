import React from "react";
import {RegisterModal} from "../../modals/RegisterModal";

export function Register() {
    const trigger = (
        <button>Regisztráció</button>
    )

    return <RegisterModal trigger={trigger}/>;
}