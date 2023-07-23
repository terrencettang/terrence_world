// Fetch the CSV data and parse it using PapaParse
fetch('country-codes.csv')
    .then(response => response.text())
    .then(data => {
        const parsedData = Papa.parse(data, { header: true }).data;
        // Append the table rows to the table body
        const tableBody = document.querySelector('tbody');
        parsedData.forEach(object => {
            const row = document.createElement('tr');

            // Create a cell for the flag icon
            const flagCell = document.createElement('td');
            const flagIcon = document.createElement('i');
            flagIcon.classList.add('flag-icon');
            flagIcon.classList.add(`flag-icon-${object['Alpha-2 code'].toLowerCase()}`);
            flagCell.appendChild(flagIcon);
            row.appendChild(flagCell);

            // Create cells for the country code data
            const nameCell = document.createElement('td');
            nameCell.textContent = object['English short name lower case'];
            const alpha2Cell = document.createElement('td');
            alpha2Cell.textContent = object['Alpha-2 code'];
            const alpha3Cell = document.createElement('td');
            alpha3Cell.textContent = object['Alpha-3 code'];
            row.appendChild(nameCell);
            row.appendChild(alpha2Cell);
            row.appendChild(alpha3Cell);

            tableBody.appendChild(row);
        });
    });