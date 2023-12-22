// script.js

function geolocation() {
    // Check if the browser supports geolocation
    if (navigator.geolocation) {
        // Get the current location
        navigator.geolocation.getCurrentPosition(fetchWeatherData, showError);
    } else {
        document.getElementById("p1").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15; // Conversion from Kelvin to Celsius
}

function fetchWeatherData(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const apiKey = "98533fba6d626a0fcabb9f9e34ed995c";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    // Fetch weather data from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Extract relevant information from the API response
            const temperatureKelvin = data.main.temp;
            const description = data.weather[0].description;

            // Convert temperature to Celsius
            const temperatureCelsius = kelvinToCelsius(temperatureKelvin);

            // Update the content of the <p> element with the weather information
            document.getElementById("p1").innerHTML = `Temperature: ${temperatureCelsius.toFixed(2)}°C`;
            document.getElementById("p2").innerHTML= `Weather Description: ${description}`;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            document.getElementById("p1").innerHTML = "Error fetching weather data.";
        });
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("p1").innerHTML = "User denied the request for geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("p1").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("p1").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("p1").innerHTML = "An unknown error occurred.";
            break;
    }
}

// Automatically fetch weather data when the page loads
geolocation();
