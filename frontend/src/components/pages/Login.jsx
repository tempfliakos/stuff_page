import {useState} from "react";
import {LoginForm} from "../forms/LoginForm";
import {RegisterForm} from "../forms/RegisterForm";

export function Login({logged}) {


	const [isRegister, setIsRegister] = useState(false);

	function validateEmail(mail) {
		return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);
	}

	return <div className="login-container">
		<div className="d-grid justify-content-center">
			<img src="/logo.svg" alt="Stuff Pages Logo" className="logo pt-1"/>
		</div>

		{isRegister ?
			<RegisterForm validateEmail={validateEmail} setIsRegister={setIsRegister}/> :
			<LoginForm logged={logged} validateEmail={validateEmail} setIsRegister={setIsRegister}/>
		}

	</div>
}