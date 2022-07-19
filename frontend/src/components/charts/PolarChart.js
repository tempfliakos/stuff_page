import React from "react";
import {Polar} from "react-chartjs-2";

export function PolarChart({labels, values, backgroundColor, hoverColor = backgroundColor}) {

	const data = {
		labels: labels,
		datasets: [{
			data: values,
			backgroundColor: backgroundColor,
			hoverBackgroundColor: hoverColor,
		}]
	};

	return (
		<Polar
			width={200}
			height={200}
			data={data}
			options={{
				maintainAspectRatio: false
			}}
		/>
	)
}