<script>
    import { onMount } from 'svelte';
    import { Chart } from 'chart.js/auto';
    import 'chartjs-adapter-date-fns';
    import { wsStore } from '../stores/ws_store';

    let chartCanvas;
    let chart;

    $effect(() => {
        const chartData = $wsStore.data.map(item => ({
            x: new Date(item.timestamp),
            y: parseFloat(item.value)
        }));

        if (chart) {
            chart.data.datasets[0].data = chartData;
            chart.update();
        } else if (chartCanvas) {
            chart = new Chart(chartCanvas, {
                type: 'line',
                data: {
                    datasets: [{
                        label: 'Temperature (°C)',
                        data: chartData,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            type: 'time',
                            time: {
                                unit: 'minute'
                            }
                        },
                        y: {
                            beginAtZero: false
                        }
                    }
                }
            });
        }
    });

    onMount(() => {
        return () => {
            if (chart) chart.destroy();
        };
    });
</script>

<div class="chart_container">
    <canvas bind:this={chartCanvas}></canvas>
</div>

<style>
    .chart_container {
        width: 100%;
        height: 300px;
        padding: 0.5rem;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        overflow: hidden;
    }

    canvas {
        max-width: 100%;
    }
</style>
