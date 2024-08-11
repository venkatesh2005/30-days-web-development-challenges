const card = document.querySelector('.card-inner');
const cvvInput = document.getElementById('cvv');
const nameInput = document.getElementById('name');
const cardNumberInput = document.getElementById('card-number');
const cardNameDisplay = document.querySelector('.name h2');
const cardNumberDisplay = document.querySelector('.card-number h3');
const validThruMonthInput = document.getElementById('valid-thru-month');
const validThruYearInput = document.getElementById('valid-thru-year');
const validThruDisplay = document.querySelector('.valid-thru-date');
const cvvDisplay = document.querySelector('.cvv-number');
const submitMessage = document.getElementById('submit-message');

cvvInput.addEventListener('focus', () => {
    card.style.transform = 'rotateY(180deg)';
});

cvvInput.addEventListener('blur', () => {
    card.style.transform = 'rotateY(0deg)';
});

nameInput.addEventListener('input', () => {
    cardNameDisplay.textContent = nameInput.value.toUpperCase();
});

cardNumberInput.addEventListener('input', (e) => {
    let inputVal = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedCardNumber = inputVal.match(/.{1,4}/g)?.join(' ') || inputVal;

    e.target.value = formattedCardNumber;
    cardNumberDisplay.textContent = formattedCardNumber;
});

validThruMonthInput.addEventListener('change', updateValidThru);
validThruYearInput.addEventListener('change', updateValidThru);

function updateValidThru() {
    const month = validThruMonthInput.value !== "Month" ? validThruMonthInput.value : "MM";
    const year = validThruYearInput.value !== "Year" ? validThruYearInput.value.substring(2) : "YY";
    validThruDisplay.textContent = `${month}/${year}`;
}

cvvInput.addEventListener('input', () => {
    cvvDisplay.textContent = `${cvvInput.value}`;
});

document.querySelector('.form-container').addEventListener('submit', function(event) {
    event.preventDefault();

    if (nameInput.value === '' || cardNumberInput.value === '' || validThruMonthInput.value === 'Month' || validThruYearInput.value === 'Year' || cvvInput.value === '') {
        alert('Please fill out all fields correctly.');
        return;
    }

    submitMessage.classList.remove('hidden');
});
