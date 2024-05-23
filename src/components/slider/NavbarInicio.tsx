import axios from "axios";
import "./NavbarInicio.css";
import Weather from "../weather/Wheather";
import { useEffect, useState } from "react";
import Time from "../time/Time";

interface Clima{
    id: number,
    main: string,
    description: string,
    icon: string 
}

interface Data {
    coord: {
        lon: number,
        lat: number,
    },
    main: {
        temp: number,
        temp_min: number,
        temp_max: number,
        humidity: number,
        pressure: number
    },
    wind: {
        speed: number
    },
    weather: Clima[],
    name:string,
    timezone: number
}

const initial = {
    coord: {
        lon: -71.2333,
        lat: -34.9833,
    },
    main: {
        temp: 20,
        temp_min: 12,
        temp_max: 36,
        humidity: 0,
        pressure: 0
    },
    wind: {
        speed: 0
    },
    weather: [{
        id: 800,
        main: 'Clear',
        description: 'clear sky',
        icon: '01d' 
    }],
    name:'Curicó',
    timezone: -14400
}


export const NavbarInicio = () => {
    const [datos,setDatos] = useState<Data>(initial)


    const ciudad= 'Curicó'
    const consulta = async () => {
        const query = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=ca91f278180de2526c359dbcb495dd24&&units=metric&lang=sp`)
        const objeto = {coord:query.data.coord,main:query.data.main,wind:query.data.wind,weather:query.data.weather,name:query.data.name,timezone:query.data.timezone}
        setDatos(objeto)
    }
    consulta()
    useEffect(()=>{
        const timer = () => {
          return setTimeout(() => {
            consulta()
            console.log("se hizo la consulta")
          }, 3600000);
        };
    
        // Iniciar el temporizador cuando el componente se monte
        timer();
    },[])
    
    return(
        <div className="navbari container">
            <div className="">
                <img src="/src/assets/logo.png" className="container-logo"></img>
            </div>
            <div className="align-items-center d-flex">
                <Time />
            </div>
            <div className="clima-hora-container">
                <div className="clima-hora-card">
                    <Weather coord={datos.coord} main={datos.main} name={datos.name} timezone={datos.timezone} 
                    weather={datos.weather} wind={datos.wind} />
                </div>
            </div>
        </div>
    );
}
