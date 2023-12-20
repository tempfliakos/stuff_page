import {useState} from "react";
import {trackPromise} from "react-promise-tracker";
import {makePostRequest} from "../../services/axios";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {Button} from "../abstracts/Button";

export function LoginForm({logged, validateEmail, setIsRegister}) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);
	const navigate = useNavigate();
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
						navigate(landingPage);
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
			<div className="d-grid gap-3 mb-3">
				<input placeholder="Email cím" onChange={handleEmailChange} type="email" className="c-white mx-3"/>
				<input placeholder="Jelszó" onChange={handlePasswordChange} type="password" className="c-white mx-3"/>
			</div>

			<div className="d-flex align-items-center justify-content-center gap-3">
				<div>
					<Button type="submit" additionalClassNames="bg-dark-green c-white" text="Bejelentkezés"/>
				</div>
				<div>
					<Button type="reset" additionalClassNames="bg-light-grey c-black" text="Regisztráció"
					        onClick={handleChangeToRegister}/>
				</div>
			</div>
		</form>
	</>
}