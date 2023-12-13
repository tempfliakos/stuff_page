import {useState} from "react";
import {func} from "prop-types";

export function Button({additionalClassNames, text, icon, onClick, hasApprove}) {

	const [isApprove, setIsApprove] = useState(false);

	function handleOnClick() {
		if(hasApprove) {
			setIsApprove(true);
		} else {
			onClick();
		}
	}

	function handleApprove() {
		onClick();
		setIsApprove(false);
	}

	return isApprove ? <div>
			<div>
				<h3>Biztosan?</h3>
			</div>
			<div className="d-flex gap-3">
				<button onClick={handleApprove}>Igen</button>
				<button onClick={() => setIsApprove(false)}>Nem</button>
			</div>
		</div> :
		<button className={"d-flex align-items-center justify-content-center " + additionalClassNames} onClick={handleOnClick}>
		{icon ?	<i className={icon}/> : null}
		<span>{text}</span>
	</button>
}