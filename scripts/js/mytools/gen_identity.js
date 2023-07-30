var names = [];
var allSurnames = [];
var Surnames = [];
var selectedSurname = '';
console.log("1");

async function loadNames() {
    //Load names data here...
    const response = await fetch(location.origin + '/terrence_world/data/csv/firstnames.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    headers[headers.length - 1] = headers[headers.length - 1].trim();
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        values[values.length - 1] = values[values.length - 1].trim();
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
    const response = await fetch(location.origin + '/terrence_world/data/csv/surnames.csv');
    const text = await response.text();
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    headers[headers.length - 1] = headers[headers.length - 1].trim();
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',');
        values[values.length - 1] = values[values.length - 1].trim();
        const obj = {};
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = values[j];
        }
        allSurnames.push(obj);
    }
    populateCountrySelect();
    // Resolve the Promise with the surnames data
    return allSurnames;
}

async function loadSurnamesByCountry(country) {
    // Load surnames if allSurnames is empty
    if (allSurnames.length === 0) {
        allSurnames = await loadSurnames();
    }
    const filteredSurnames = allSurnames.filter(allSurnames => allSurnames.Country_name === country);
    Surnames = filteredSurnames.length > 0 ? filteredSurnames : allSurnames;
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
        selectedname = filteredNames[randomIndex].Name;
    } else if (algorithm === 'higher-count') {
        // Sort in descending order
        filteredNames.sort((a, b) => b.Count - a.Count);

        // Get the array of surnames and their frequencies
        let names = filteredNames.map(filteredNames=> filteredNames.Name);
        let frequencies = filteredNames.map(filteredNames => filteredNames.Count);
        // Select a surname with a probability proportional to its frequency
        selectedname = weightedRandom(names, frequencies);
    } else if (algorithm === 'lower-count') {
        // Sort in acscending order
        filteredNames.sort((a, b) => a.Count - b.Count);

        // Reverse the frequencies so that lower counts have higher "weights"
        let maxFrequency = filteredNames[filteredNames.length - 1].Count;
        // Get the array of surnames and their frequencies
        let names = filteredNames.map(filteredNames=> filteredNames.Name);
        let frequencies = filteredNames.map(filteredNames => maxFrequency - filteredNames.Count + 1);
        // Select a surname with a probability proportional to its frequency
        selectedname = weightedRandom(names, frequencies);
    }
    return selectedname;
}

function populateCountrySelect() {
    const countrySelect = document.getElementById('country-select');
    if (countrySelect.getAttribute('title') === null){
        countrySelect.setAttribute("title", "Please select a country.");
        const uniqueCountries = [...new Set(allSurnames.map(allSurnames => allSurnames.Country_name))];
        uniqueCountries.sort();
        uniqueCountries.unshift("Random");
        uniqueCountries.forEach(country => {
            const option = document.createElement('option');
            option.value = country;
            option.text = country;
            countrySelect.appendChild(option);
        });
        countrySelect.value = "China";
    }
}
function weightedRandom(arr, weight_t) {
    const weight = weight_t.map(Number);
    let totalWeight = weight.reduce((prev, curr) => prev + curr, 0);
    let randomNum = Math.random() * totalWeight;
    let weightSum = 0;

    for (let i = 0; i < arr.length; i++) {
        weightSum += weight[i];
        weightSum = +weightSum.toFixed(2);

        if (randomNum <= weightSum) {
            return arr[i];
        }
    }
}
function getRandomSurname(algorithm, countrySelect) {
  let randomIndex;
  if (countrySelect && countrySelect !== 'Random') {
    // Load surnames by country
    loadSurnamesByCountry(countrySelect);
    if (algorithm === 'equal') {
      randomIndex = Math.floor(Math.random() * Surnames.length);
      selectedSurname = Surnames[randomIndex].Name;
    } else if (algorithm === 'higher-count') {
        // Sort in descending order
        Surnames.sort((a, b) => b.Frequency - a.Frequency);

        // Get the array of surnames and their frequencies
        let surnames = Surnames.map(Surnames=> Surnames.Name);
        let frequencies = Surnames.map(Surnames => Surnames.Frequency);
        // Select a surname with a probability proportional to its frequency
        selectedSurname = weightedRandom(surnames, frequencies);
    } else if (algorithm === 'lower-count') {
        // Sort in ascending order
        Surnames.sort((a, b) => a.Frequency - b.Frequency);
        // Change the weighting as recipical
        let surnames = Surnames.map(Surnames => Surnames.Name);
        let frequencies = Surnames.map(Surnames => maxFrequency - Surnames.Frequency + 1);

        // Select a surname with a probability proportional to its "reversed" frequency
        selectedSurname = weightedRandom(surnames, frequencies);
        }
  } else {
    // Use all surnames
    if (algorithm === 'equal') {
      randomIndex = Math.floor(Math.random() * allSurnames.length);
      selectedSurname = allSurnames[randomIndex].Name;
    } else if (algorithm === 'higher-count') {
        // Sort in descending order
        allSurnames.sort((a, b) => b.Frequency - a.Frequency);
        // Get the array of surnames and their frequencies
        let surnames = allSurnames.map(allSurnames => allSurnames.Name);
        let frequencies = allSurnames.map(allSurnames => allSurnames.Frequency);
        // Select a surname with a probability proportional to its frequency
        selectedSurname = weightedRandom(surnames, frequencies);
    } else if (algorithm === 'lower-count') {
        // Sort in ascending order
        allSurnames.sort((a, b) => a.Frequency - b.Frequency);

        // Reverse the frequencies so that lower counts have higher "weights"
        let maxFrequency = allSurnames[allSurnames.length - 1].Frequency;
        let surnames = allSurnames.map(allSurnames => allSurnames.Name);
        let frequencies = allSurnames.map(allSurnames => maxFrequency - allSurnames.Frequency + 1);

        // Select a surname with a probability proportional to its "reversed" frequency
        selectedSurname = weightedRandom(surnames, frequencies);
    }
  }
  return selectedSurname;
}
function generateRandomBirthday() {
    // Get the minimum and maximum ages from the form inputs
    const minAge = parseInt(document.getElementById('min-age').value);
    const maxAge = parseInt(document.getElementById('max-age').value);
  
    // Calculate the minimum and maximum birth years based on the current year and the entered ages
    const currentYear = new Date().getFullYear();
    const minBirthYear = currentYear - maxAge;
    const maxBirthYear = currentYear - minAge;
  
    // Generate a random birth year between the minimum and maximum birth years
    const birthYear = Math.floor(Math.random() * (maxBirthYear - minBirthYear + 1)) + minBirthYear;
  
    // Generate a random birth month and day
    const birthMonth = Math.floor(Math.random() * 12) + 1;
    const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    const birthDay = Math.floor(Math.random() * daysInMonth) + 1;
  
    // Set the values of the day, month, and year input fields
    document.getElementById('day').value = birthDay;
    document.getElementById('month').value = birthMonth;
    document.getElementById('year').value = birthYear;
  }
  loadNames().then(() => {
    return loadSurnames();
}).then(() => {
    const table = document.querySelector(".name_form");
    const sexSelect = document.querySelector("#sex-select");
    const algorithmSelect = document.querySelector("#algorithm-select");
    const countryInput = document.querySelector("#country-select");
    const firstNameInput = document.querySelector("#first-name-input");
    const lastNameInput = document.querySelector("#last-name-input");
    table.addEventListener("submit", e => {
        e.preventDefault();
        let sex = sexSelect.value;
        if (sex === 'R') {
            sex = getRandomSex();
        }
        const algorithm = algorithmSelect.value;
        const country = countryInput.value;
        const firstName = getRandomName(sex, algorithm);
        const lastName = getRandomSurname(algorithm, country);
        firstNameInput.value = firstName;
        lastNameInput.value = lastName;
        generateRandomBirthday()
    });
});