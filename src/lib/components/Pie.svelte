<script>
	import { createEventDispatcher, onDestroy } from 'svelte';
	import Chart from 'chart.js/auto';

	/**
	 * @type {import("chart.js/auto").ChartItem}
	 */
	let chartElement;
	/**
	 * @type {Chart<"pie", number[], string>}
	 */
	let myChart;

	// Data for the pie chart
	const data = {
		labels: ['Permintaan', 'Berlangsung', 'Total'],
		datasets: [
			{
				label: 'Konsultasi',
				data: [16, 3, 19],
				backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
				borderWidth: 1
			}
		]
	};

	// Options for the pie chart
	const options = {
		responsive: true,
		maintainAspectRatio: false
	};

	// Create the chart when the component is first rendered
	$: {
		if (chartElement) {
			myChart = new Chart(chartElement, {
				type: 'pie',
				data,
				options
			});
		}
	}

	// Cleanup the chart when the component is destroyed
	onDestroy(() => {
		if (myChart) {
			myChart.destroy();
		}
	});

	// Dispatch an event when the chart is ready
	const dispatch = createEventDispatcher();
	$: {
		if (myChart) {
			dispatch('chartReady', myChart);
		}
	}
</script>

<canvas bind:this={chartElement} />
