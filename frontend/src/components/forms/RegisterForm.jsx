import {useState} from "react";
import {makePostRequest} from "../../services/axios";
import {Button} from "../abstracts/Button";

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
		<div className="d-grid gap-3 mb-3">
			<input placeholder="Email cím" onChange={handleEmailChange} type="email" className="c-white mx-3"/>
			<input placeholder="Jelszó" onChange={handlePasswordChange} type="password" className="c-white mx-3"/>
			<input placeholder="Jelszó újra" onChange={handleRePasswordChange} type="password" className="c-white mx-3"/>
		</div>
		<div className="d-flex align-items-center justify-content-center gap-3">
			<div>
					<Button type="submit" additionalClassNames="bg-dark-green c-white" text="Bejelentkezés" onClick={handleRegister}/>
			</div>
			<div>
				<Button type="reset" additionalClassNames="bg-light-grey c-black" text="Mégse" onClick={handleChangeToRegister}/>
			</div>
		</div>
	</>
}