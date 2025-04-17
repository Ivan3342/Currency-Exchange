// Declaring the variables for easier access to the elements in the HTML file.
const convertButton = document.getElementById('convert-button');
const inputField = document.getElementById('value-one');
const outputField = document.getElementById('value-two');
const selectFrom = document.getElementById('from-currency');
const selectTo = document.getElementById('to-currency');


const convert = (from, to, amount) => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
        .then((response) => response.json())
        .then((data) => {
        const convertedAmount = Math.floor(data.rates[to],2);
        outputField.value = convertedAmount;
        });
};
//Event listener when button convert is clicked, to convert the value and display it.
convertButton.addEventListener('click', () => {
    convert(selectFrom.options[selectFrom.selectedIndex].value, selectTo.options[selectTo.selectedIndex].value, inputField.value);

})