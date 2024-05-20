import axios from "axios";
import { useState } from "react";
import "./Time.css"

const Time = () => {
    const hora = new Date()
    const final = hora.toLocaleString("es-CL",{
        timeZone: "America/Santiago",
        hour12: true, // false
        hour: "numeric", // 2-digit
        minute: "2-digit", // numeric
   });
    const dia = hora.toLocaleString("es-CL",{
        timeZone: "America/Santiago",
        dateStyle:"full"
    });
    
    return(
        <div className="time-box text-white">
            <div>
                <p className="time-text">{final}</p>
            </div>
            <div>
                <p className="day-text">{dia}</p>
            </div>
            
        </div>
    );
}

export default Time;