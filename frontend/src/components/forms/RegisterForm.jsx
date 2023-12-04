import {useState} from "react";
import {makePostRequest} from "../../services/axios";

export function RegisterForm({validateEmail, setIsRegister}) {

	const [errorMessage, setErrorMessage] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [rePassword, setRePassword] = useState("");

	function handleEmailChange(event) {
		setEmail(event.target.value);
	}

	function handlePasswordChange(event) {
		setPassword(event.target.value);
	}

	function handleRePasswordChange(event) {
		setRePassword(event.target.value);
	}

	function handleRegister() {
		if(validateEmail(email)) {
			if(password === rePassword) {
				makePostRequest("auth/register", {email: email, password: password})
					.then(res => {
						setErrorMessage(null);
						handleChangeToRegister();
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

	function handleChangeToRegister() {
		setIsRegister(false);
	}

	return <>
		<div className="d-grid justify-content-center">
			<h1 className="c-light-green">Regisztráció</h1>
		</div>
		<div className="d-grid">
			<input placeholder="Email cím" onChange={handleEmailChange} type="email" className="c-white"/>
			<input placeholder="Jelszó" onChange={handlePasswordChange} type="password" className="c-white"/>
			<input placeholder="Jelszó újra" onChange={handleRePasswordChange} type="password" className="c-white"/>
		</div>
		<div className="d-flex align-items-center justify-content-center">
			<div className="mr-1">
				<form>
					<button type="submit" className="bg-dark-green c-white" onClick={handleRegister}>Regisztáció
					</button>
				</form>
			</div>
			<div>
				<button type="reset" onClick={handleChangeToRegister}>Mégse</button>
			</div>
		</div>
	</>
}