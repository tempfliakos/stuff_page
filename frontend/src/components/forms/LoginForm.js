import React, {useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {makePostRequest} from "../../services/axios";
import Cookies from "universal-cookie";
import {useHistory} from "react-router-dom";

export function LoginForm({logged, validateEmail, setIsRegister}) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const history = useHistory();
	const landingPage = "/movies";

	function handleLogin(event) {
		event.preventDefault();
		if (validateEmail(email)) {
			console.log(email)
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

	function handleChangeToRegister() {
		setIsRegister(true);
	}

	return <>
	<form onSubmit={handleLogin}>
		<div className="d-grid justify-content-center">
			<h1 className="c-light-green">Bejelentkezés</h1>
		</div>
		<div className="d-grid">
			<input placeholder="Email cím" onChange={handleEmailChange} type="email" className="c-white"/>
			<input placeholder="Jelszó" onChange={handlePasswordChange} type="password" className="c-white"/>
		</div>
		<div className="d-flex align-items-center justify-content-center">
			<div className="mr-1">

					<button type="submit" className="bg-dark-green c-white">Bejelentkezés</button>

			</div>
			<div>
				<button type="reset" className="bg-light-grey c-white" onClick={handleChangeToRegister}>Regisztráció</button>
			</div>
		</div>
	</form>
	</>
}