// Declaring the variables for easier access to the elements in the HTML file.
const convertButton = document.getElementById('convert-button');
const inputField = document.getElementById('value-one');
const outputField = document.getElementById('value-two');
const selectFrom = document.getElementById('from-currency');
const selectTo = document.getElementById('to-currency');
const swapSymbol = document.getElementById('swap-symbol');

const swapCurrencies = () => {
    const temp = selectFrom.value;
    selectFrom.value = selectTo.value;
    selectTo.value = temp;
    outputField.value = 0;
    inputField.value = 0;
    if(swapSymbol.innerHTML === '⇌') {
        swapSymbol.innerHTML = '⇋';
    }
    else {
        swapSymbol.innerHTML = '⇌';
    }
}

const convert = (from, to, amount) => {
    if(selectFrom.selectedIndex !== selectTo.selectedIndex) {
        fetch(`https://v6.exchangerate-api.com/v6/b6e6c39f6ade3431969c0aa4/pair/${from}/${to}/${amount}`)
        .then((response) => response.json())
        .then((data) => {
        const convertedAmount = Math.round(data.conversion_rate * 100) / 100;
        outputField.value = convertedAmount;
        });
    }
    else {
        alert('Molimo vas koristite druge valute!')
        outputField.value = 0;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetch('https://v6.exchangerate-api.com/v6/b6e6c39f6ade3431969c0aa4/codes')
    .then((response) => response.json())
    .then((data) => {
        const currencyCodes = data.supported_codes;
        currencyCodes.forEach((currency) => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency[0];
            optionFrom.textContent = `${currency[0]} - ${currency[1]}`;
            selectFrom.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency[0];
            optionTo.textContent = `${currency[0]} - ${currency[1]}`;
            selectTo.appendChild(optionTo);
        });
    });
})

//Event listener when button swap is clicked, to swap the currencies.
swapSymbol.addEventListener('click', () => {
    swapCurrencies();
})

//Event listener when button convert is clicked, to convert the value and display it.
convertButton.addEventListener('click', () => {
    convert(selectFrom.options[selectFrom.selectedIndex].value, selectTo.options[selectTo.selectedIndex].value, inputField.value);
})

