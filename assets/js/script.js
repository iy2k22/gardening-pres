$(document).ready(() => {
    const apiKey = "cf19e26cd84560f303a4c185e64c50ca";

    const getCurrentWeather = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            const { latitude, longitude } = position.coords;
            const forecastDiv = $("#forecast");

            // get city name
            fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`)
                .then((res) => {
                    if (!res.ok)
                        throw new Error("couldn't get city name");
                    return res.json();
                })
                .then((data) => {
                    const { name } = data[0];
                    $("#city-name").text(name);
                    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
                })
                .then((res) => {
                    if (!res.ok)
                        throw new Error("error: couldn't get forecast data");
                    return res.json();
                })
                .then(({ list }) => {
                    const relevant = list.filter(({ dt_txt }) => dt_txt.slice(11, 13) === '12');
                    for (let forecast of relevant) {
                        const forecastCard = $("<div></div>");
                        forecastCard.addClass("card col-lg-2");
                    }
                })
        }, (e) => $("#forecastBit").remove());
    }
    
    getCurrentWeather();
});