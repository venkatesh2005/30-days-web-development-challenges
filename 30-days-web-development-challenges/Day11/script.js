const pwdOutput = document.querySelector('#pwdOutput');
const copyBtn = document.querySelector('#copyBtn');
const pwdLength = document.querySelector('#pwdLength');
const incNumbers = document.querySelector('#incNumbers');
const incUpper = document.querySelector('#incUpper');
const incLower = document.querySelector('#incLower');
const incSymbols = document.querySelector('#incSymbols');
const form = document.querySelector('#form');


copyBtn.addEventListener('click', async () => {
  const password = pwdOutput.value;
  if (password) {
    await navigator.clipboard.writeText(password);
    alert("Copied to clipboard");
  } else {
    alert("No password to copy");
  }
});

function getRandomChar(min, max) {
  const limit = max - min + 1;
  return String.fromCharCode(Math.floor(Math.random() * limit) + min);
}

function getUpperCase() {
  return getRandomChar(65, 90);
}

function getLowerCase() {
  return getRandomChar(97, 122);
}

function getNumber() {
  return getRandomChar(48, 57);
}

function getSymbol() {
  const symbols = "~!@#$%^&*()_+|}{<>*./";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const charFuncs = [
  { element: incNumbers, func: getNumber },
  { element: incUpper, func: getUpperCase },
  { element: incLower, func: getLowerCase },
  { element: incSymbols, func: getSymbol }
];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const length = pwdLength.value;
  let password = "";

  const activeFuncs = charFuncs.filter(({ element }) => element.checked);

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * activeFuncs.length);
    const char = activeFuncs[index].func();
    password += char;
  }

  pwdOutput.value = password;
});
