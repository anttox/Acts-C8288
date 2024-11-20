import React, { useState } from "react";

type WeatherProps = {
    zipCode: string;
    weather: string;
    tempC: string;
    tempF: string;
    friends: string[];
};

const PageComponentWeather: React.FC<WeatherProps> = ({ zipCode, weather, tempC, tempF, friends }) => {
    const [counter, setCounter] = useState(0);

    const handleClick = () => {
        setCounter(counter + 1);
    };

    return (
        <div>
            <h1 data-testid="weather-heading" onClick={handleClick}>
                Weather Information
            </h1>
            <p data-testid="zip-code">Zip Code: {zipCode}</p>
            <p data-testid="weather-status">Weather: {weather}</p>
            <p data-testid="temperature-c">Temperature: {tempC}°C / {tempF}°F</p>
            <p data-testid="friends">
                Nearby Friends&apos; Zip Codes: {friends.join(", ")}
            </p>
            <p data-testid="counter">Counter: {counter}</p>
        </div>
    );
};

export default PageComponentWeather;
