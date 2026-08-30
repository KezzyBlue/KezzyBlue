import './WeatherCard.css';
import { useState, useEffect } from 'react';
import { MapPin, CloudSun, Droplets, Umbrella } from 'lucide-react';
import axios from 'axios';

function WeatherCard() {
    const [weather, setWeather] = useState(null);
    const coordinate = {
        lat: 21.4412,
        long: 105.5404
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get(
                `https://api.open-meteo.com/v1/forecast?latitude=${coordinate.lat}&longitude=${coordinate.long}&hourly=temperature_2m,cloud_cover,relative_humidity_2m,rain&timezone=Asia%2FBangkok`
            );
            setWeather(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch weather data", error);
            setWeather(null);
        }
    };

    useEffect(() => {
        fetchWeather();

        const iterval = setInterval(() => {
            fetchWeather();
        }, 15 * 60 * 1000);

        return () => clearInterval(iterval);

    }, []);

    const currentWeather = (() => {
        if (!weather || !weather.hourly) return null;

        const times = weather.hourly.time || [];
        const currentIndex = times.findIndex((time) => new Date(time) >= new Date());
        const index = currentIndex === -1 ? times.length - 1 : currentIndex;

        return {
            temperature: weather.hourly.temperature_2m?.[index],
            humidity: weather.hourly.relative_humidity_2m?.[index],
            rain: weather.hourly.rain?.[index],
            cloud: weather.hourly.cloud_cover?.[index],
            time: times[index],
        };
    })();

    const weatherCondition =
        currentWeather && currentWeather.cloud > 70 ? "Cloudy" :
            currentWeather && currentWeather.rain > 0 ? "Rainy" :
                "Clear";

    const comfortLabel =
        currentWeather && currentWeather.humidity > 70 ? "Humid" :
            currentWeather && currentWeather.humidity < 40 ? "Dry" :
                "Balanced";

    const rainRisk =
        currentWeather && currentWeather.rain > 1 ? "High" :
            currentWeather && currentWeather.cloud > 60 ? "Possible" :
                "Low";

    return (
        <div className="weatherCard">
            <div className="weatherTopRow">
                <div>
                    <p className="weatherLabel">Local weather</p>
                    <div className="weatherLocation tooltipWrapper" data-tooltip="Location in Phú Thọ">
                        <MapPin size={14} />
                        <span> Phú Thọ </span>
                    </div>
                </div>
                <div className="weatherStatus tooltipWrapper" data-tooltip="Current weather condition">{weatherCondition}</div>
            </div>

            <div className="weatherMain">
                <div className="weatherTempWrap">
                    <span className="weatherTemp">
                        {currentWeather ? `${Math.round(currentWeather.temperature)}°C` : "--°C"}
                    </span>
                    <span className="weatherTime">
                        {currentWeather ? new Date(currentWeather.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--"}
                    </span>
                </div>
                <div className="weatherSymbol tooltipWrapper" aria-hidden="true" data-tooltip={weatherCondition === "Rainy" ? "Rainy" : weatherCondition === "Cloudy" ? "Cloudy" : "Clear sky"}>
                    {weatherCondition === "Rainy" ? "☔" : weatherCondition === "Cloudy" ? "☁️" : "☀️"}
                </div>
            </div>

            <div className="weatherStats">
                <div className="weatherStat tooltipWrapper" data-tooltip="Cloud cover percentage">
                    <CloudSun size={16} />
                    <span>{currentWeather ? `${Math.round(currentWeather.cloud)}%` : "--%"}</span>
                </div>
                <div className="weatherStat tooltipWrapper" data-tooltip="Relative humidity">
                    <Droplets size={16} />
                    <span>{currentWeather ? `${Math.round(currentWeather.humidity)}%` : "--%"}</span>
                </div>
                <div className="weatherStat tooltipWrapper" data-tooltip="Rain amount in the past hour">
                    <Umbrella size={16} />
                    <span>{currentWeather ? `${currentWeather.rain.toFixed(1)} mm` : "-- mm"}</span>
                </div>
            </div>

            <div className="skyDivider" />

            <div className="weatherFooter">
                <div className="weatherFooterBlock">
                    <span className="weatherFooterLabel">Comfort</span>
                    <strong>{comfortLabel}</strong>
                </div>
                <div className="weatherFooterBlock">
                    <span className="weatherFooterLabel">Rain risk</span>
                    <strong>{rainRisk}</strong>
                </div>
            </div>
        </div>
    );
}

export default WeatherCard;