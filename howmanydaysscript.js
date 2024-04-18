document.getElementById('selectFileButton').addEventListener('click', () => {
});

document.getElementById('csvFileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const csvData = e.target.result;
        processCSVData(csvData);
    };
    reader.readAsText(file);
}

function processCSVData(csvData) {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date(today);
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const ninetyDaysAgo = new Date(today);
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);

    const thirtyDaysOld = [];
    const sixtyDaysOld = [];
    const ninetyDaysOld = [];
    const overNinetyDays = [];

    const rows = csvData.split('\n');

    rows.forEach(row => {
        const columns = row.split(',');
        const lastModified = new Date(columns[7]);
        if (lastModified >= thirtyDaysAgo) {
            thirtyDaysOld.push(lastModified);
        } else if (lastModified < thirtyDaysAgo && lastModified >= sixtyDaysAgo) {
            sixtyDaysOld.push(lastModified);
        } else if (lastModified < sixtyDaysAgo && lastModified >= ninetyDaysAgo) {
            ninetyDaysOld.push(lastModified);
        } else if (lastModified < ninetyDaysAgo) {
            overNinetyDays.push(lastModified)
        }
    });

    // Function to display categorized tickets
    const container = document.getElementById('ticketsContainer');

    // Display tickets modified within the last 30 days
    container.innerHTML = "<h2>Tickets modified within the last 30 days:</h2>";
    container.innerHTML += `<p>${thirtyDaysOld.length}</p>`;

    // Display tickets modified between 31 and 60 days ago
    container.innerHTML += "<h2>Tickets modified between 31 and 60 days ago:</h2>";
    container.innerHTML += `<p>${sixtyDaysOld.length}</p>`;

    // Display tickets modified between 61 and 90 days ago
    container.innerHTML += "<h2>Tickets modified between 61 and 90 days ago:</h2>";
    container.innerHTML += `<p>${ninetyDaysOld.length}</p>`;

    // Display tickets modified over 90 days ago
    container.innerHTML += "<h2>Tickets modified over 90 days ago:</h2>";
    container.innerHTML += `<p>${overNinetyDays.length}</p>`;
}