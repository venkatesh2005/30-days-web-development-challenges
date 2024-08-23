let audio = null;

document.getElementById('searchBtn').addEventListener('click', searchWord);
document.getElementById('searchInput').addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchWord();
    }
});
document.getElementById('clearBtn').addEventListener('click', clearSearch);

async function searchWord() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (!searchInput) return;

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('No results found.');

        const data = await response.json();
        if (data && data[0]) {
            displayWordData(data[0]);
        } else {
            showError('No results found.');
        }
        document.getElementById('clearBtn').style.display = 'inline-block';
    } catch (error) {
        showError(error.message);
    }
}

function displayWordData(data) {
    const wordElement = document.getElementById('word');
    const phoneticsElement = document.getElementById('phonetics');
    const definitionSection = document.getElementById('definitionSection');
    const examplesSection = document.getElementById('examplesSection');
    const synonymsSection = document.getElementById('synonymsSection');

    wordElement.innerText = data.word;

    const partOfSpeech = data.meanings[0]?.partOfSpeech || '';
    const phonetics = data.phonetics.map(p => p.text).join(', ') || '';

    phoneticsElement.innerHTML = `
        <span class="part-of-speech">${partOfSpeech}</span>
        <span class="phonetic">${phonetics}</span>
    `;

    const firstDefinition = data.meanings[0]?.definitions[0]?.definition || 'No definition available.';
    const firstExample = data.meanings[0]?.definitions[0]?.example || 'No example available.';
    const headingColor = 'blue';

    definitionSection.innerHTML = `<h3 style="color:${headingColor};">Definition</h3><p>${firstDefinition}</p>`;
    examplesSection.innerHTML = `<h3 style="color:${headingColor};">Example</h3><p>${firstExample}</p>`;

    const synonyms = data.meanings.flatMap(meaning => meaning.synonyms).filter(Boolean);
    const antonyms = data.meanings.flatMap(meaning => meaning.antonyms).filter(Boolean);

    synonymsSection.innerHTML = `<h3 style="color:${headingColor};">Synonyms</h3>`;
    if (synonyms.length > 0) {
        synonymsSection.innerHTML += synonyms.map(synonym => `<span>${synonym}</span>`).join(', ');
    } else {
        synonymsSection.innerHTML += '<p>No synonyms available.</p>';
    }

    synonymsSection.innerHTML += `<h3 style="color:${headingColor};">Antonyms</h3>`;
    if (antonyms.length > 0) {
        synonymsSection.innerHTML += antonyms.map(antonym => `<span>${antonym}</span>`).join(', ');
    } else {
        synonymsSection.innerHTML += '<p>No antonyms available.</p>';
    }

    const audioIcon = document.getElementById('audioIcon');
    if (data.phonetics[0]?.audio) {
        if (audio) {
            audio.pause();
        }
        audio = new Audio(data.phonetics[0].audio);
        audioIcon.style.display = 'inline-block';
        audioIcon.onclick = () => audio.play();
    } else {
        audioIcon.style.display = 'none';
    }

    document.querySelector('.result-container').classList.add('active');
}

function showError(message) {
    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = `<p>${message}</p>`;
    resultContainer.classList.add('active');
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('clearBtn').style.display = 'none';
    document.querySelector('.result-container').innerHTML = '';
    document.querySelector('.result-container').classList.remove('active');

    if (audio) {
        audio.pause();
        audio = null;
    }
}


