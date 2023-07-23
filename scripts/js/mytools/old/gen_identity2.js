let names = [];
let allSurnames = [];
let surnames = [];

async function loadNames() {
    //Load names data here...
    const response = await fetch(location.origin + '/terrence_world/data/csv/firstnames.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        names.push(obj);
    }
    // Call loadSurnames after loading names data
    await loadSurnames();
}

async function loadSurnames() {
    //Load surnames data here...
    populateCountrySelect();
    const response = await fetch(location.origin + '/terrence_world/data/csv/surnames.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        allSurnames.push(obj);
    }
}

async function loadSurnamesByCountry(country) {
    const filteredSurnames = allSurnames.filter(surname => surname.Country === country);
    surnames = filteredSurnames.length > 0 ? filteredSurnames : allSurnames;
}

function getRandomSex() {
    const sexes = ['M', 'F'];
    const randomIndex = Math.floor(Math.random() * sexes.length);
    const sex = sexes[randomIndex];
    return sex;
}

function getRandomName(sex, algorithm) {
    let filteredNames = names.filter(name => name.Sex === sex);
    let randomIndex;
    if (algorithm === 'equal') {
        randomIndex = Math.floor(Math.random() * filteredNames.length);
    } else if (algorithm === 'higher-count') {
        filteredNames.sort((a, b) => b.Frequency - a.Frequency);
        const maxFrequency = filteredNames[0].Frequency;
        const lowerFrequencyNames = filteredNames.filter(name => name.Frequency < maxFrequency);
        filteredNames = lowerFrequencyNames.length > 0 ? lowerFrequencyNames : filteredNames;
        randomIndex = Math.floor(Math.random() * filteredNames.length);
    } else if (algorithm === 'lower-count') {
        filteredNames.sort((a, b) => a.Frequency - b.Frequency);
        const minFrequency = filteredNames[0].Frequency;
        const higherFrequencyNames = filteredNames.filter(name => name.Frequency > minFrequency);
        filteredNames = higherFrequencyNames.length > 0 ? higherFrequencyNames : filteredNames;
        randomIndex = Math.floor(Math.random() * filteredNames.length);
    }
    const name = filteredNames[randomIndex].Name;
    return name;
}

function populateCountrySelect() {
    const countrySelect = document.getElementById('country-select');
    const uniqueCountries = [...new Set(surnames.map(surname => surname.Country))];
    uniqueCountries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.text = country;
        countrySelect.appendChild(option);
    });
}

function getRandomSurname(algorithm, country) {
    let randomIndex;
    if (country === 'Random') {
        // Use all surnames
        if (algorithm === 'equal') {
            randomIndex = Math.floor(Math.random() * allSurnames.length);
        } else if (algorithm === 'higher-count') {
            allSurnames.sort((a, b) => b.Frequency - a.Frequency);
            const maxFrequency = allSurnames[0].Frequency;
            const lowerFrequencySurnames = allSurnames.filter(surname => surname.Frequency < maxFrequency);
            surnames = lowerFrequencySurnames.length > 0 ? lowerFrequencySurnames : allSurnames;
            randomIndex = Math.floor(Math.random() * surnames.length);
        } else if (algorithm === 'lower-count') {
            allSurnames.sort((a, b) => a.Frequency - b.Frequency);
            const minFrequency = allSurnames[0].Frequency;
            const higherFrequencySurnames = allSurnames.filter(surname => surname.Frequency > minFrequency);
            surnames = higherFrequencySurnames.length > 0 ? higherFrequencySurnames : allSurnames;
            randomIndex = Math.floor(Math.random() * surnames.length);
        }
    } else {
        // Use surnames from selected country
        loadSurnamesByCountry(country);
        if (algorithm === 'equal') {
            randomIndex = Math.floor(Math.random() * surnames.length);
        } else if (algorithm === 'higher-count') {
            surnames.sort((a, b) => b.Frequency - a.Frequency);
            const maxFrequency = surnames[0].Frequency;
            const lowerFrequencySurnames = surnames.filter(surname => surname.Frequency < maxFrequency);
            surnames = lowerFrequencySurnames.length > 0 ? lowerFrequencySurnames : surnames;
            randomIndex = Math.floor(Math.random() * surnames.length);
        } else if (algorithm === 'lower-count') {
            surnames.sort((a, b) => a.Frequency - b.Frequency);
            const minFrequency = surnames[0].Frequency;
            const higherFrequencySurnames = surnames.filter(surname => surname.Frequency > minFrequency);
            surnames = higherFrequencySurnames.length > 0 ? higherFrequencySurnames : surnames;
            randomIndex = Math.floor(Math.random() * surnames.length);
        }
    }
    const surname = surnames[randomIndex].Name;
    return surname;
}
loadNames().then(() => {
    return loadSurnames();
}).then(() => {
    const nameForm = document.querySelector("#name-form");
    const sexSelect = document.querySelector("#sex-select");
    const algorithmSelect = document.querySelector("#algorithm-select");
    const countryInput = document.querySelector("#country-select");
    const firstNameInput = document.querySelector("#first-name-input");
    const lastNameInput = document.querySelector("#last-name-input");
    nameForm.addEventListener("submit", e => {
        e.preventDefault();
        let sex = sexSelect.value;
        if (sex === 'R') {
            sex = getRandomSex();
        }
        const algorithm = algorithmSelect.value;
        const firstName = getRandomName(sex, algorithm);
        const lastName = getRandomSurname(algorithm, countryInput);
        firstNameInput.value = firstName;
        lastNameInput.value = lastName;
    });
});