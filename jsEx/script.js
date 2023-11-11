let currentScenario = 1;
let rawData = [];  // This will hold the original parsed data



// Function to read CSV from a local file path
function readCSVFromPath(filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(text => {
            Papa.parse(text, {
                header: true,
                complete: function(results) {
                    rawData = results.data;
                    plotData();
                }
            });
        })
        .catch(error => console.error('Error reading the CSV file:', error));
}

function plotData() {
    // Filter data based on currentScenario
    const filteredData = rawData.filter(row => parseInt(row['scenarioColumnIndex']) === currentScenario);

    for (let i = 1; i <= 7; i++) {
        const plotData = filteredData.map(row => ({ x: row[0], y: row[i] }));
        const ctx = document.getElementById(`plot${i}`).getContext('2d');

        // Clear the previous chart if it exists
        if (window.myCharts && window.myCharts[i]) {
            window.myCharts[i].destroy();
        }

        // Create a new chart
        window.myCharts = window.myCharts || {};
        window.myCharts[i] = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: `Data for Plot ${i}`,
                    data: plotData,
                    // Add more styling as needed
                }]
            },
            options: {
                scales: {
                    x: { type: 'linear', position: 'bottom' }
                }
            }
        });
    }
}

document.getElementById('nextScenario').addEventListener('click', function() {
    currentScenario = (currentScenario % 5) + 1; // Loop through scenarios 1-5
    plotData();
});

// Call the function with your file path
readCSVFromPath('sample_data.csv');