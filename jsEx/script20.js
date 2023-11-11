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
    const postData = {
        heart_rate: 0.1,
        oxygen_saturation: 0.2,
        sleep_data: 0.5
        // Add other fields as required by your API
    };

    const response = await fetch('http://localhost:8000/prevent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    document.getElementById('text-block').innerText = `Action: ${data.action}`;

}

