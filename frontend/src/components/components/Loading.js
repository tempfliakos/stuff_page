import React, {useState} from "react";
import {usePromiseTracker} from "react-promise-tracker";

export function Loading() {
	const {promiseInProgress} = usePromiseTracker();
	const [opacity, setOpacity] = useState(1);
	const [growing, setGrowing] = useState(false);

	function animate() {
		if (growing) {
			if (opacity >= 0.8) {
				setGrowing(false);
			} else {
				setOpacity(opacity + 0.1);
			}
		} else {
			if (opacity <= 0.2) {
				setGrowing(true);
			} else {
				setOpacity(opacity - 0.1);
			}
		}
	}
	const timeOut = setTimeout(animate, 100);

	function isPromiseInProgress() {
		if(promiseInProgress) {
			return true;
		} else {
			clearTimeout(timeOut);
			return false;
		}
	}

	return (isPromiseInProgress() &&
		// <Dimmer active>
		<img src='/logo.svg' style={{height: "200px", width: "200px", opacity: opacity}} alt="logo"/>
	//</Dimmer>
	)
}