import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Form, Grid, Header, Image, Message, Segment} from "semantic-ui-react";
import Cookies from 'universal-cookie';
import {makePostRequest} from "../services/axios";
import {Register} from "./Register";

export function Login({logged}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    function handleLogin() {
        makePostRequest("login", {email: email, password: password})
            .then(res => {
                const cookies = new Cookies();
                cookies.set('id', res.data.id, {path: '/'});
                logged(true);
                history.push("/movies");
                setErrorMessage(null);
            }).catch(error => {
            setErrorMessage("Hiba történt");
        })
    }

    function handleEmailChange(event, data) {
        setEmail(data.value);
    }

    function handlePasswordChange(event, data) {
        setPassword(data.value);
    }

    return (
        <Grid textAlign='center' verticalAlign='middle' style={{paddingTop: '11%'}}>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header style={{color: "white"}} textAlign='center'>
                        <Image src='/logo.svg' style={{height: "200px", width: "200px"}}/>
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h1" style={{color: "white"}} textAlign='center'>
                        Bejelentkezés
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column style={{maxWidth: 450}}>
                    {/*<Header style={{color: "white"}} textAlign='center'>*/}
                    {/*    <Image src='/logo.svg' style={{height: "200px", width: "200px"}}/>*/}
                    {/*    <Label as="h1" content={"Bejelentkezés"}/>*/}
                    {/*</Header>*/}
                    <Form size='large'>
                        <Segment stacked inverted style={{backgroundColor: "transparent"}}>
                            <Form.Input fluid icon='user' iconPosition='left' placeholder="Email cím"
                                        onChange={handleEmailChange} type="email" inverted/>
                            <Form.Input fluid icon='lock' iconPosition='left' placeholder="Jelszó"
                                        onChange={handlePasswordChange} type="password" inverted/>


                            <Form.Group>
                                <Button fluid content="Bejelentkezés" color="blue" onClick={handleLogin}/>
                                <Register/>
                            </Form.Group>

                        </Segment>
                    </Form>
                    {errorMessage ? <Message error content={errorMessage}/> : null}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}