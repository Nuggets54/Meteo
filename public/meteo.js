// import {loc} from "./leaflet.js";

//const api_url = `meteo/${lat},${lon}`;
export async function fetch_data(loc) {
        const api_url = `/meteo/${loc}`;
        const response = await fetch(api_url);
        const json = await response.json();
        console.log(json)
}