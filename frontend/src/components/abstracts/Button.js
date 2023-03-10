import React from "react";

export function Button({classNames, text, icon, onClick}) {

	return <button class={"d-flex align-items-center justify-content-center " + classNames} onClick={onClick}>
		{icon ?	<span class={"icon " + icon}/> : null}
		<span>{text}</span>
	</button>
}