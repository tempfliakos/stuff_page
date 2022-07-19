import React from "react";
import {Bar} from "react-chartjs-2";

export function BarChart({labels, values, name, backgroundColor, hoverColor = backgroundColor}) {

	const data = {
		labels: labels,
		datasets: [
			{
				label: name,
				data: values,
				backgroundColor: backgroundColor,
				hoverBackgroundColor: hoverColor,
				borderWidth: 1,
			}
		]
	};

	return (
		<Bar
			data={data}
			width={200}
			height={200}
			options={{
				maintainAspectRatio: false
			}}
		/>
	)
}