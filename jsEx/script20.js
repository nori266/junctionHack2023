document.addEventListener('DOMContentLoaded', function() {
    // Initial data loading and chart rendering
    loadDataAndRenderCharts();

    // Event listener for the button
    document.getElementById('change-data-button').addEventListener('click', function() {
        loadDataAndRenderCharts();
        fetchTextAndUpdate();
    });
});

function loadDataAndRenderCharts() {
    fetch('data.json') // Adjust this to your JSON file's path
        .then(response => response.json())
        .then(data => {
            renderCharts(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderCharts(data) {
    // Extract data for each measurement
    let heartRateData = data.map(item => ({ x: item.timestep, y: item["heart rate"] }));
    let temperatureData = data.map(item => ({ x: item.timestep, y: item.temperature }));
    let rhbData = data.map(item => ({ x: item.timestep, y: item.rhb }));

    // Render chart for Heart Rate
    renderChart('heart-rate-chart', heartRateData, 'Heart Rate');

    // Render chart for Temperature
    renderChart('temperature-chart', temperatureData, 'Temperature');

    // Render chart for RHB
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
            }
        }
    });
}

function fetchTextAndUpdate() {
    fetch('api_endpoint_here') // Replace with your actual API endpoint
        .then(response => response.text())
        .then(text => {
            document.getElementById('text-block').innerText = text;
        })
        .catch(error => console.error('Error:', error));
}
