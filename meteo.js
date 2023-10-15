import {loc, marker} from "./leaflet.js";

function fetch_data(loc) {
    URL = "http://www.infoclimat.fr/public-api/gfs/json?_ll=" + loc + "&_auth=ABpXQAR6XX9QfQA3UiQFLAVtDjtdKwEmC3cCYVo%2FVClROgRlA2MGYFE%2FAXwBLldhBCkAYww3BTVWPQB4DnwEZQBqVzsEb106UD8AZVJ9BS4FKw5vXX0BJgtgAmNaKVQ1UTMEYAN%2BBmJRNgF9ATBXagQwAH8MLAU8VjMAbg5kBGYAalczBG9dP1A9AH1SfQU3BTMObF1rATgLawJsWjVUNFFmBDQDMQZgUTkBfQEwV2cEMQBiDDAFNVY9AGIOfAR4ABpXQAR6XX9QfQA3UiQFLAVjDjBdNg%3D%3D&_c=0c2f667087fb03f5a0c92c39c87102ed"
    console.log(loc, URL)
};
console.log(marker)
console.log(loc)

if (loc){
    fetch_data(loc)
};