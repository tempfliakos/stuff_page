import {useState} from "react";

export function Button({type="button", additionalClassNames = "", text = "", icon, onClick, hasApprove}) {

	const [isApprove, setIsApprove] = useState(false);

	function handleOnClick() {
		if(hasApprove) {
			setIsApprove(true);
		} else if(onClick) {
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
		<button type={type} className={"d-flex align-items-center justify-content-center " + additionalClassNames} onClick={handleOnClick}>
		{icon ?	<i className={icon}/> : null}
		<span className={icon ? "d-lg-block d-none" : ""}>{text}</span>
	</button>
}