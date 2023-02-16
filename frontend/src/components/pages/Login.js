import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import Cookies from 'universal-cookie';
import {makePostRequest} from "../../services/axios";
import {Register} from "../views/login/Register";
import {trackPromise} from "react-promise-tracker";

export function Login({logged}) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const history = useHistory();
	const landingPage = "/movies";

	function handleLogin(event) {
		event.preventDefault();
		if (validateEmail(email)) {
			trackPromise(
				makePostRequest("auth/login", {email: email, password: password})
					.then(res => {
						const {accessToken} = res.data;
						const cookies = new Cookies();
						cookies.set('stuffPages', accessToken, {path: '/'});
						logged(true);
						history.push(landingPage);
						setErrorMessage(null);
					}).catch(error => {
					setErrorMessage("Hiba történt");
				}));
		} else {
			setErrorMessage("Nem valid email!");
		}

	}

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	function validateEmail(mail) {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
	}

	return <div class="login-container">
		<div class="d-grid justify-content-center">
			<img src="/logo.svg" alt="Stuff Pages Logo" class="logo pt-1"/>
		</div>
		<div class="d-grid justify-content-center">
			<h1 class="c-light-green">Bejelentkezés</h1>
		</div>
		<div class="d-grid">
			<input placeholder="Email cím" onChange={handleEmailChange} type="email" class="c-white"/>
			<input placeholder="Jelszó" onChange={handlePasswordChange} type="password" class="c-white"/>
		</div>
		<div class="d-flex align-items-center justify-content-center">
			<div class="mr-1">
				<form onSubmit={handleLogin}>
					<button type="submit" class="bg-dark-green c-white" onClick={handleLogin}>Bejelentkezés</button>
				</form>
			</div>
			<div>
				<Register/>
			</div>
		</div>
	</div>
	// <Grid textAlign='center' verticalAlign='middle' style={{paddingTop: '11%'}}>
	// 	<Grid.Row>
	// 		<Grid.Column style={{maxWidth: 450}}>
	// 			<Header style={{color: "white"}} textAlign='center'>
	// 				<Image src='/logo.svg' style={{height: "200px", width: "200px"}}/>
	// 			</Header>
	// 		</Grid.Column>
	// 	</Grid.Row>
	// 	<Grid.Row>
	// 		<Grid.Column style={{maxWidth: 450}}>
	// 			<Header as="h1" style={{color: "white"}} textAlign='center'>
	// 				Bejelentkezés
	// 			</Header>
	// 		</Grid.Column>
	// 	</Grid.Row>
	// 	<Grid.Row>
	// 		<Grid.Column style={{maxWidth: 450}}>
	// 			<Form size='large'>
	// 				<Segment stacked inverted style={{backgroundColor: "transparent"}}>
	// 					<Form.Input fluid icon='user' iconPosition='left' placeholder="Email cím"
	// 					            onChange={handleEmailChange} type="email" inverted/>
	// 					<Form.Input fluid icon='lock' iconPosition='left' placeholder="Jelszó"
	// 					            onChange={handlePasswordChange} type="password" inverted/>
	//
	//
	// 					<Form.Group>
	// 						<Button fluid content="Bejelentkezés" color="blue" onClick={handleLogin}/>
	// 						<Register/>
	// 					</Form.Group>
	//
	// 				</Segment>
	// 			</Form>
	// 			{errorMessage ? <Message error content={errorMessage}/> : null}
	// 		</Grid.Column>
	// 	</Grid.Row>
	// </Grid>
}