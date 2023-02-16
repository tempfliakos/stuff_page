import React from "react";
import {RegisterModal} from "../../modals/RegisterModal";

export function Register() {
    const trigger = (
        <button class="bg-light-grey c-white">Regisztráció</button>
    )

    // return <RegisterModal trigger={trigger}/>;
    return trigger;
}