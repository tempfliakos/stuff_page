import {useState} from "react";

export function ToggleSwitch({id, text, value = false, toggleFunc}) {

	const [checked, setChecked] = useState(value);

	function handleCheck(event) {
		setChecked(event.target.checked);
		if (toggleFunc) {
			toggleFunc(event.target.checked);
		}
	}

	return <div className={"switch "}>
		<label id={id}>
			<input type="checkbox" checked={checked} onChange={handleCheck}/>
			<span/>
			<strong>{text}</strong>
		</label>
	</div>
}