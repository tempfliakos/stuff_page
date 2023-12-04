import {useState} from "react";
import {LoginForm} from "../forms/LoginForm";
import {RegisterForm} from "../forms/RegisterForm";

export function Login({logged}) {


	const [isRegister, setIsRegister] = useState(false);

	function validateEmail(mail) {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
	}

	return <div class="login-container">
		<div class="d-grid justify-content-center">
			<img src="/logo.svg" alt="Stuff Pages Logo" class="logo pt-1"/>
		</div>

		{isRegister ?
			<RegisterForm validateEmail={validateEmail} setIsRegister={setIsRegister}/> :
			<LoginForm logged={logged} validateEmail={validateEmail} setIsRegister={setIsRegister}/>
		}

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