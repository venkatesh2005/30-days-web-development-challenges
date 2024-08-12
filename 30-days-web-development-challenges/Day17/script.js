const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('quote-author');
const copyQuoteButton = document.getElementById('copy-quote');
const newQuoteButton = document.getElementById('new-quote');


async function generateQuote() {
    try {
        const response = await fetch('https://type.fit/api/quotes');
        const quotes = await response.json();
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = `- ${randomQuote.author || "Unknown"}`;
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}


function copyQuote() {
    const quote = `${quoteText.textContent} ${quoteAuthor.textContent}`;
    navigator.clipboard.writeText(quote).then(() => {
        alert('Quote copied to clipboard!');
    }).catch(err => {
        console.error('Error copying quote:', err);
    });
}


copyQuoteButton.addEventListener('click', copyQuote);
newQuoteButton.addEventListener('click', generateQuote);

generateQuote();
