/*
// Parte 1
import type { NextPage } from "next";
import React, { useState, useEffect } from "react"; 

interface WeatherProps {
    weather: string; // Estado del clima
}

const WeatherComponent = (props: WeatherProps) => {
    const [count, setCount] = useState(0); 

    useEffect(() => {
        setCount(1); 
    }, []);

    return (
        <h1 onClick={() => setCount(count + 1)}>
            El clima es {props.weather}, y el contador muestra {count}
        </h1>
    );
};

// Renderizado de pagina
const PageComponentWeather: NextPage = () => {
    return <WeatherComponent weather="sunny" />; 
};

export default PageComponentWeather;

// Parte 2

import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Weather.module.css";

interface WeatherProps {
    weather: string;
}

const WeatherComponent = (props: WeatherProps) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(1);
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                El clima es {props.weather}, y el contador muestra {count}
            </h1>
            <button
                className={styles.counter}
                onClick={() => setCount(count + 1)}
            >
                Incrementar contador
            </button>
        </div>
    );
};

const PageComponentWeather: NextPage = () => {
    return <WeatherComponent weather="sunny" />;
};

export default PageComponentWeather;

// Parte 3

import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Weather.module.css";

interface WeatherProps {
    weather: string;
}

// Componente 
const WeatherComponent = (props: WeatherProps) => {
    const [count, setCount] = useState<number>(0);

    // useEffect para iniciar el contador desde localStorage
    useEffect(() => {
        const savedCount = localStorage.getItem("weather-counter");
        if (savedCount) {
            setCount(Number(savedCount)); // Si existe un valor almacenado lo asignamos al contador
        }
    }, []);

    // useEffect para guardar el contador en localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem("weather-counter", count.toString());
    }, [count]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                El clima es {props.weather}, y el contador muestra {count}
            </h1>
            <button
                className={styles.counter}
                onClick={() => setCount(count + 1)}
            >
                Incrementar contador
            </button>
        </div>
    );
};

// Pagina para usar el WeatherComponent
const PageComponentWeather: NextPage = () => {
    return <WeatherComponent weather="sunny" />;
};

export default PageComponentWeather;

// Parte 4
import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Weather.module.css";

interface WeatherData {
    weather: string;
    temp: number;
    unit: string;
}

// Componente principal
const WeatherComponent = () => {
    const [count, setCount] = useState<number>(0);
    const [tempUnit, setTempUnit] = useState<string>("metric"); // Unidad predeterminada
    const [weatherData, setWeatherData] = useState<WeatherData>({
        weather: "",
        temp: 0,
        unit: "",
    });

    // useEffect para iniciar el contador desde localStorage
    useEffect(() => {
        const savedCount = localStorage.getItem("weather-counter");
        if (savedCount) {
            setCount(Number(savedCount)); // Recuperar valor del contador
        }
    }, []);

    // useEffect para guardar el contador en localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem("weather-counter", count.toString());
    }, [count]);

    // useEffect para obtener datos meteorologicos de la API segun la unidad de temperatura
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `/api/weather/12345?tempUnit=${tempUnit}` // Enviaos la unidad como parametro
                );
                if (!response.ok) {
                    throw new Error("Error al obtener datos del clima");
                }
                const data = await response.json();
                setWeatherData(data); // Actualizamos el estado con los datos recibidos
            } catch (error) {
                console.error(error);
            }
        };

        fetchWeatherData();
    }, [tempUnit]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                El clima es {weatherData.weather}, la temperatura es{" "}
                {weatherData.temp}° {weatherData.unit}, y el contador muestra {count}
            </h1>
            <button
                className={styles.counter}
                onClick={() => setCount(count + 1)}
            >
                Incrementar contador
            </button>
            <div className={styles.tempUnitButtons}>
                <button
                    onClick={() => setTempUnit("metric")}
                    disabled={tempUnit === "metric"}
                >
                    Celsius
                </button>
                <button
                    onClick={() => setTempUnit("imperial")}
                    disabled={tempUnit === "imperial"}
                >
                    Fahrenheit
                </button>
            </div>
        </div>
    );
};

// Pagina para usar el WeatherComponent
const PageComponentWeather: NextPage = () => {
    return <WeatherComponent />;
};

export default PageComponentWeather;
*/
// Parte 6
import React, { useState, useEffect } from "react";
import styles from "@/styles/Weather.module.css";
import type { GetStaticProps, NextPage } from "next";

interface WeatherData {
    weather: string;
    temp: number;
    unit: string;
}

// Props para el componente WeatherComponent
interface WeatherProps {
    initialWeatherData: WeatherData;
}

const WeatherComponent: React.FC<WeatherProps> = ({ initialWeatherData }) => {
    const [count, setCount] = useState<number>(0);
    const [tempUnit, setTempUnit] = useState<string>("metric"); // Unidad predeterminada
    const [weatherData, setWeatherData] = useState<WeatherData>(initialWeatherData);

    // useEffect para iniciar el contador desde localStorage
    useEffect(() => {
        const savedCount = localStorage.getItem("weather-counter");
        if (savedCount) {
            setCount(Number(savedCount)); 
        }
    }, []);

    // useEffect para guardar el contador en localStorage cada vez que se actualiza
    useEffect(() => {
        localStorage.setItem("weather-counter", count.toString());
    }, [count]);

    // useEffect para obtener datos meteorológicos de la API segun la unidad de temperatura
    useEffect(() => {
        if (tempUnit !== initialWeatherData.unit) {
            const fetchWeatherData = async () => {
                try {
                    const response = await fetch(
                        `/api/weather/12345?tempUnit=${tempUnit}` 
                    );
                    if (!response.ok) {
                        throw new Error("Error al obtener datos del clima");
                    }
                    const data = await response.json();
                    setWeatherData(data); // Actualizar el estado con los datos recibidos
                } catch (error) {
                    console.error(error);
                }
            };

            fetchWeatherData();
        }
    }, [tempUnit]);

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>
                El clima es {weatherData.weather}, la temperatura es{" "}
                {weatherData.temp}° {weatherData.unit}, y el contador muestra {count}
            </h1>
            <button
                className={styles.counter}
                onClick={() => setCount(count + 1)}
            >
                Incrementar contador
            </button>
            <div className={styles.tempUnitButtons}>
                <button
                    onClick={() => setTempUnit("metric")}
                    disabled={tempUnit === "metric"}
                >
                    Celsius
                </button>
                <button
                    onClick={() => setTempUnit("imperial")}
                    disabled={tempUnit === "imperial"}
                >
                    Fahrenheit
                </button>
            </div>
        </div>
    );
};

// Pagina para usar el WeatherComponent
const PageComponentWeather: NextPage<WeatherProps> = ({ initialWeatherData }) => {
    return <WeatherComponent initialWeatherData={initialWeatherData} />;
};

// Uso de getStaticProps con ISR
export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch("http://localhost:3000/api/weather/12345?tempUnit=metric");
    const initialWeatherData = await response.json();

    return {
        props: {
            initialWeatherData,
        },
        revalidate: 30, // Recargar la pagina estatica cada 30 segundos
    };
};

export default PageComponentWeather;
