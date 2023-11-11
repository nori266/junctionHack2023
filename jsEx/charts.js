// Import Chart.js if you're using modules, otherwise it's already globally available
// import Chart from 'chart.js';

export function renderCharts(data) {
    // Extract data for each measurement
    const heartRateData = data.map(item => ({ x: item.timestep, y: item["heart rate"] }));
    const temperatureData = data.map(item => ({ x: item.timestep, y: item.temperature }));
    const rhbData = data.map(item => ({ x: item.timestep, y: item.rhb }));

    // Render charts
    renderChart('heart-rate-chart', heartRateData, 'Heart Rate');
    renderChart('temperature-chart', temperatureData, 'Temperature');
    renderChart('rhb-chart', rhbData, 'RHB');
}

function renderChart(canvasId, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: { 
            datasets: [{
                label: label,
                data: data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            },
            maintainAspectRatio: false, 
        }
    });
}
