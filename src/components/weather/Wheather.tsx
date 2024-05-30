
import "../slider/NavbarInicio.css";
import AirOutlinedIcon from '@mui/icons-material/AirOutlined';

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

const Weather = ({main,wind,weather,name}:Data) => {
    return(
        <div className="d-flex">
            <div className="align-items-center d-flex">
                <img src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} ></img>
            </div>
            <div className="justify-content-between align-items-center d-flex">
                <div className="align-items-center" style={{marginRight:'5rem'}}>
                    <div>
                        {Math.floor(main.temp)}°C, {weather[0].description}
                    </div>
                    <div>
                        {name}
                    </div>
                </div>
                <div className="text-end align-items-center">
                    <div>
                        {Math.floor(main.temp)}°C /{Math.floor(main.temp_min)}°C
                    </div>
                    <div>
                        <AirOutlinedIcon /> {wind.speed}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;