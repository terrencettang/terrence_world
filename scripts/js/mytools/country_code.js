// Fetch the CSV data and parse it using PapaParse
fetch(location.origin + '/terrence_world/data/csv/country-codes.csv')
    .then(response => response.text())
    .then(data => {
        const parsedData = Papa.parse(data, { header: true }).data;
        // Append the table rows to the table body
        const tableBody = document.querySelector('tbody');
        parsedData.forEach(object => {
            const row = document.createElement('tr');

            // Create a cell for the flag icon
            const flagCell = document.createElement('td');
            flagCell.style.textAlign = 'center';
            flagCell.style.verticalAlign = 'middle';
            flagCell.style.padding = '0'; 
            const flagImg = document.createElement('img');
            flagImg.setAttribute('src', `https://flagsapi.com/${object['Alpha-2']}/flat/32.png`);
            flagImg.style.padding = '0'; 
            flagCell.appendChild(flagImg);
            row.appendChild(flagCell);

            // Create cells for the country code data
            const nameCell = document.createElement('td');
            nameCell.textContent = object['Name'];
            const alpha2Cell = document.createElement('td');
            alpha2Cell.textContent = object['Alpha-2'];
            const alpha3Cell = document.createElement('td');
            alpha3Cell.textContent = object['Alpha-3'];
            row.appendChild(nameCell);
            row.appendChild(alpha2Cell);
            row.appendChild(alpha3Cell);

            tableBody.appendChild(row);
        });
    });