import React, { useState, useEffect } from 'react'
import axios from "axios";
import "./CintaNoticia.css";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Container } from '@mui/material';

function CintaNoticas() {
    const [listedNews, setState] = useState([]); //lista con noticias
    const [stringNews, setString] = useState(""); //string para mostrar las noticias
    const api_key='thedynnyun5crugpifrgnfptfznzu1gvj4adwk1d';
    //api de https://rss2json.com/
    //noticias de https://vivimoslanoticia.cl/
    const requestNewsCurico = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fvivimoslanoticia.cl%2Ffeed%2F&api_key=${api_key}`;
    //noticias de https://www.elmostrador.cl
    const requestNewsCountry = `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.elmostrador.cl%2Ffeed%2F&api_key=${api_key}`;
    const getNews = async (request:string) => { 
        const result = await axios.get(request);
        const response = result.data;
        for(var i in response.items){
            var item = response.items[i];
            setState(listedNews.push( (JSON.stringify(item.title)).replace(/['"]+/g, '')))
        }
        setString(`${stringNews}${" NOTICIAS: "}${listedNews.join(' | ')}`)
        setState([])
    };

    useEffect(()=>{
        const timer = () => {
          return setTimeout(() => {
            getNews(requestNewsCurico); 
            getNews(requestNewsCountry);        
          }, 10*60*60*1000); //obtengo noticias actualizadas cada 10 hora
        };
        // Iniciar el temporizador cuando el componente se monte
        timer();
      },[])

    return (
        <div className='contenedor-titulo'>
            <Container sx={{backgroundColor:'#009A8C',zIndex:'3'}}>
                <NewspaperIcon sx={{fontSize:'12vh',color:'white'}} />
            </Container>
            <h1 className='cinta-titulo'>
                {stringNews}
            </h1>
        </div>
    );
}

export default CintaNoticas;