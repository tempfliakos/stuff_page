import React from "react";
import $ from "jquery";

export function Scrollable(props) {

	const paneDidMount = () => {
		$(document).off('scroll');
		$(document).on('scroll',props.func);
	}

	return <div ref={paneDidMount}>{props.children}</div>;
}