import React from "react";

export function Button({classNames, text, icon, onClick}) {

	return <button class={"d-flex align-items-center justify-content-center " + classNames} onClick={onClick}>
		{icon ?	<i className={icon}/> : null}
		<span>{text}</span>
	</button>
}