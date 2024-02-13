import {Pie} from "react-chartjs-2";

export function PieChart({labels, values, backgroundColor, hoverColor = backgroundColor}) {

	const data = {
		labels: labels,
		datasets: [{
			data: values,
			backgroundColor: backgroundColor,
			hoverBackgroundColor: hoverColor,
		}]
	};

	return (
		<Pie
			width={200}
			height={200}
			data={data}
			options={{
				maintainAspectRatio: false
			}}
		/>
	)
}