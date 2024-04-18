// Add an event listener to the button
document.getElementById('csvFileInput').addEventListener('click', () => {
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
        // Initialize an empty object to store the result
        const unmodifiedTickets = {};

        // Calculate the date one week ago
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        // Fetch data from the CSV file

                // Split the CSV data into rows
        const rows = csvData.split('\n');
        // Parse each row
        rows.forEach(row => {
            const columns = row.split(',');
            const owner = columns[8];
            const ticketNumber = columns[1];
            const lastModified = new Date(columns[7]);
            console.log(ticketNumber)
            // Check if the ticket has been modified in the past week
            if (lastModified < oneWeekAgo) {
                if (!unmodifiedTickets[owner]) {
                    unmodifiedTickets[owner] = [];
                }
                unmodifiedTickets[owner].push(ticketNumber);
            }
        });
        const resultContainer = document.getElementById('resultContainer');
        resultContainer.innerHTML = '';

        for (const owner in unmodifiedTickets) {
            const ticketList = unmodifiedTickets[owner];
            const ownerHeader = document.createElement('h2');
            ownerHeader.textContent = `Owner: ${owner}`;
            resultContainer.appendChild(ownerHeader);

            const ticketUL = document.createElement('ul');
            ticketList.forEach(ticket => {
                const ticketLink = document.createElement('a');
                ticketLink.href = `https://ncat.cherwellondemand.com/CherwellClient/Access/Command/Queries.GoToRecord?BusObID=6dd53665c0c24cab86870a21cf6434ae&PublicID=${ticket}`;
                ticketLink.textContent = ticket;
                ticketLink.target = '_blank'; // Open link in a new tab
                const listItem = document.createElement('li');
                listItem.appendChild(ticketLink);
                ticketUL.appendChild(listItem);
            });
            resultContainer.appendChild(ticketUL);
        }
    }
