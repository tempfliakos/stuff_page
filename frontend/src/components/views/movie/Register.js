import React from "react";
import {Button} from "semantic-ui-react";
import {RegisterModal} from "../../modals/RegisterModal";

export function Register() {
    const trigger = (
        <Button fluid content="Regisztráció" color="green"/>
    )

    return <RegisterModal trigger={trigger}/>;
}