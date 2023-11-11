// script.js
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
            // Process the JSON data and render charts
            renderCharts(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderCharts(data) {
    // Process the JSON data to extract necessary information for each chart
    // Example: Extract heart rate data
    let heartRateData = data.map(item => ({ x: item.scenario, y: item["heart rate"] }));
    // Similarly process temperature and rhb data

    // Now use this data to render the charts using Chart.js or any other charting library
    // This is a placeholder. You should create actual Chart.js instances here.
    console.log("Render charts with data:", heartRateData);
}

function fetchTextAndUpdate() {
    fetch('api_endpoint_here')
        .then(response => response.text())
        .then(text => {
            document.getElementById('text-block').innerText = text;
        })
        .catch(error => console.error('Error:', error));
}
