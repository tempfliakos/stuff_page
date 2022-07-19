import React, {useState} from "react";
import {Button, Form, Message, Modal, Segment} from "semantic-ui-react";
import {makePostRequest} from "../../services/axios";

export function RegisterModal({trigger}) {
    const [isOpen, setOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    function handleEmailChange(event, data) {
        setEmail(data.value);
    }

    function handlePasswordChange(event, data) {
        setPassword(data.value);
    }

    function handleRePasswordChange(event, data) {
        setRePassword(data.value);
    }

    function validateEmail(mail) {
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)
    }

    function handleRegister() {
        setErrorMessage(null);
        if(validateEmail(email)) {
            if(password === rePassword) {
                makePostRequest("auth/register", {email: email, password: password})
                    .then(res => {
                        handleClose();
                    }).catch(error => {
                    console.log(error);
                    setErrorMessage("Az adott email címmel rendlekezik felhasználó!");
                })
            } else {
                setErrorMessage("A két jelszó nem egyezik meg!");
            }
        } else {
            setErrorMessage("Helytelen az e-mail formátuma!");
        }

    }

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
        setEmail("");
        setPassword("");
        setRePassword("")
    }
    return (
        <Modal open={isOpen} trigger={trigger} onOpen={handleOpen} onClose={handleClose} basic>
            <Form size='large'>
                <Segment stacked inverted>
                    <Form.Input fluid icon='user' iconPosition='left' placeholder="Email cím"
                                onChange={handleEmailChange} inverted required/>
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder="Jelszó"
                                onChange={handlePasswordChange} type="password" inverted required/>
                    <Form.Input fluid icon='lock' iconPosition='left' placeholder="Jelszó újra"
                                onChange={handleRePasswordChange} type="password" inverted required />


                    <Form.Group>
                        <Button fluid disabled={!email || !password || !rePassword} content="Regisztráció" color="green" onClick={handleRegister}/>
                    </Form.Group>

                </Segment>
            </Form>
            {errorMessage ? <Message error content={errorMessage} floating/> : null}

        </Modal>
    )
}