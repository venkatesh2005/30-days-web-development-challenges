let select = document.querySelectorAll('.currency');
let btn = document.getElementById('btn');
let amountInput = document.getElementById('amount');
let resultDiv = document.getElementById('result');

fetch('https://api.frankfurter.app/currencies')
    .then(res => res.json())
    .then(res => displayDropDown(res));

function displayDropDown(res) {
    let currencies = Object.entries(res);
    for (let i = 0; i < currencies.length; i++) {
        let code = currencies[i][0];
        let name = currencies[i][1];
        let option = `<option value="${code}" title="${name}">${code} - ${name}</option>`;
        select[0].innerHTML += option;
        select[1].innerHTML += option;
    }
}

btn.addEventListener('click', () => {
    let fromCurrency = select[0].value;
    let toCurrency = select[1].value;
    let amountValue = amountInput.value;
    if (fromCurrency === toCurrency) {
        alert("Choose different currencies");
    } else {
        convert(fromCurrency, toCurrency, amountValue);
    }
});

function convert(fromCurrency, toCurrency, amountValue) {
    const host = 'api.frankfurter.app';
    fetch(`https://${host}/latest?amount=${amountValue}&from=${fromCurrency}&to=${toCurrency}`)
        .then(resp => resp.json())
        .then(data => {
            let rate = Object.values(data.rates)[0];
            let fromCurrencyName = select[0].options[select[0].selectedIndex].text; 
            let toCurrencyName = select[1].options[select[1].selectedIndex].text; 
            resultDiv.innerHTML = `<span class="amount">${amountValue} ${fromCurrencyName}</span> = <span class="converted">${rate.toFixed(2)} ${toCurrencyName}</span>`;
        });
}
