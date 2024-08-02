const container = document.querySelector('.weather-app');
const searchButton = document.querySelector('.search-button');
const weatherDisplay = document.querySelector('.weather-display');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');

searchButton.addEventListener('click', () => {
    const APIKey = 'ee6cb9acb50a7535ffb7276046626feb';
    const city = document.querySelector('.search-input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherDisplay.classList.remove('active');
                weatherDetails.classList.remove('active');
                notFound.classList.add('active');
                return;
            }

            notFound.classList.remove('active');
            weatherDisplay.classList.add('active');
            weatherDetails.classList.add('active');

            const image = document.querySelector('.weather-icon');
            const temperature = document.querySelector('.temperature');
            const description = document.querySelector('.weather-description');
            const humidity = document.querySelector('.humidity .detail-value');
            const wind = document.querySelector('.wind-speed .detail-value');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = json.weather[0].description;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            
            setTimeout(() => {
                container.style.height = `450px`;
            }, 100);
        });
});
