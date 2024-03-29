import {Doughnut} from "react-chartjs-2";

export function DoughnutChart({labels, values, backgroundColor, hoverColor = backgroundColor}) {

	const data = {
		labels: labels,
		datasets: [{
			data: values,
			backgroundColor: backgroundColor,
			hoverBackgroundColor: hoverColor,
		}]
	};

	return (
		<Doughnut
			width={200}
			height={200}
			data={data}
			options={{
				maintainAspectRatio: false
			}}
		/>
	)
}