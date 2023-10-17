const express = require('express');
//import fetch from "node-fetch";

const app = express();
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`Starting server at ${port}`);
  });
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

app.get('/meteo/:loc', async (request, response) => {
    const loc = request.params.loc.split(',');
    const lat = loc[0];
    const lng = loc[1];
    const meteo_url = `http://www.infoclimat.fr/public-api/gfs/json?_ll=${lat},${lng}&_auth=ABpXQAR6XX9QfQA3UiQFLAVtDjtdKwEmC3cCYVo%2FVClROgRlA2MGYFE%2FAXwBLldhBCkAYww3BTVWPQB4DnwEZQBqVzsEb106UD8AZVJ9BS4FKw5vXX0BJgtgAmNaKVQ1UTMEYAN%2BBmJRNgF9ATBXagQwAH8MLAU8VjMAbg5kBGYAalczBG9dP1A9AH1SfQU3BTMObF1rATgLawJsWjVUNFFmBDQDMQZgUTkBfQEwV2cEMQBiDDAFNVY9AGIOfAR4ABpXQAR6XX9QfQA3UiQFLAVjDjBdNg%3D%3D&_c=0c2f667087fb03f5a0c92c39c87102ed`;
    const meteo_response = await fetch(meteo_url);
    const meteo_data = await meteo_response.json();
  
    // const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
    // const aq_response = await fetch(aq_url);
    // const aq_data = await aq_response.json();
  
    // const data = {
    //   meteo: meteo_data,
    //   air_quality: aq_data
    // };
    response.json(meteo_data);
  });
