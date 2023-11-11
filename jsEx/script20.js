// Modularize the chart rendering logic
import { renderCharts } from './charts.js';

document.addEventListener('DOMContentLoaded', async function() {
    await loadDataAndRenderCharts();

    const changeDataButton = document.getElementById('change-data-button');
    changeDataButton.addEventListener('click', async function() {
        await loadDataAndRenderCharts();
        fetchTextAndUpdate();
    });
});

async function loadDataAndRenderCharts() {
    // try {
        const response = await fetch('data.json');
        const allData = await response.json();
        
        // Filter data for scenario 1
        const scenario1Data = allData.filter(item => item.scenario === 1);

        renderCharts(scenario1Data);
    // } catch (error) {
    //     console.error('Error:', error);
    //     // Implement more robust error handling here
    // }
}

async function fetchTextAndUpdate() {
    try {
        const response = await fetch('api_endpoint_here');
        const text = await response.text();
        document.getElementById('text-block').innerText = text;
    } catch (error) {
        console.error('Error:', error);
        // Handle error appropriately
    }
}
