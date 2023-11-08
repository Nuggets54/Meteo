export async function fetchData(loc) {
        try{
        const api_url = `/meteo/${loc.lat},${loc.lng}`;
        const response = await fetch(api_url);
        const json = await response.json();
        extractJSON(json);
}catch(err){
        alert(console.error(err));
}

        //refresh_frame(resp);
};

//Standard dataframe provided by Infoclimat
// export async function refresh_frame(loc, ville) {
//         const url = "https://www.infoclimat.fr/public-api/mixed/iframeSLIDE?_ll=" + loc.lat + "," + loc.lng + "&_inc=WyJQYXJpcyIsIjQyIiwiMjk4ODUwNyIsIkZSIl0=&_auth=UkhVQg5wBiRQfQcwBXNXflc%2FDzpbLQEmBXkFZlw5VShUPwRlAWFUMgJsUi8EKwQyAC1TMA02AjIFbgtzAHJTMlI4VTkOZQZhUD8HYgUqV3xXeQ9uW3sBJgVuBWRcL1U0VDYEYAF8VDACZVIuBDUEOQA0UywNLQI7BWALZQBqUzNSOVU3DmgGZlA%2BB3oFKldlV2EPbVs3ATgFZgVjXDhVPlQzBDIBN1Q%2FAmlSLgQ9BDAAMVMwDTACPwVjC2gAclMvUkhVQg5wBiRQfQcwBXNXflcxDzFbMA%3D%3D&_c=f63067ba38bb2f7210bd8e2f5cb6cd61";
//         // console.log(document.querySelector("iframe").src);
//         // console.log(ville);
//         document.querySelector("iframe").src = url;   
// };

function extractJSON(json){
        for (let i = 0; i < 5; i++){
          delete json[Object.keys(json)[0]];
        };
        const editCharts = new Charts(json);
        editCharts.temperatureChart();
        editCharts.rainChart();
        editCharts.pressureChart();
        editCharts.humidityChart();
        editCharts.windrose();
};


class Charts{
        constructor(json){
                this.json = json;
        }

        temperatureChart(){if(
                Chart.getChart("temperature")){Chart.getChart("temperature").destroy()};
        //Extract specific data from json
                let data = [];
                const json = this.json;
                Object.keys(json).forEach(function(key){
                        data.push({time: new Date(key), value: json[String(key)]["temperature"]["2m"]-273.15});                 
                });
                //console.log(data);
        //Create a new chart
                new Chart(
                document.getElementById('temperature'),
                {type: 'line',
                data:{
                        labels: data.map(row => row.time),
                        datasets: [{label: "Température de l'air (en °C)",
                        data: data.map(row => row.value)}]},
                        options:{
                                scales:{
                                        x: {
                                                type: 'time',
                                                time: {
                                                        displayFormats:{
                                                                day: 'd/M'
                                                        },
                                                        unit: 'day'
                                                },
                                                ticks: {
                                                        autoSkip: true,
                                                        autoSkipPadding: 50,
                                                        maxRotation: 0,
                                                        major: {
                                                                enabled: true,
                                                        },
                                                }
                                        },
                                        y:{title: {
                                                display: true,
                                                text: "Température de l'air (en °C)"
                                                }
                                        },

                                },
                        },
                });

        };
        
        rainChart(){
                if(Chart.getChart("pluie")){Chart.getChart("pluie").destroy()};
                //Extract specific data from json
                        let data = [];
                        const json = this.json;
                        Object.keys(json).forEach(function(key){
                                                        data.push({time: new Date(key), value: json[String(key)]["pluie"]["2m"]}); 
                                data.push({time: new Date(key), value: json[String(key)]["pluie"]});                 
                        });
                        //console.log(data);
                //Create a new chart
                        new Chart(
                        document.getElementById('pluie'),
                        {type: 'bar',
                        data:{
                                labels: data.map(row => row.time),
                                datasets: [{label: 'Précipitations (en mm)',
                                data: data.map(row => row.value)}]},
                                options:{
                                        scales:{
                                                x: {
                                                        type: 'time',
                                                        time: {
                                                                displayFormats:{
                                                                        day: 'd/M'
                                                                },
                                                                unit: 'day'
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                                autoSkipPadding: 50,
                                                                maxRotation: 0,
                                                                major: {
                                                                        enabled: true,
                                                                },
                                                        }
                                                },
                                                y:{title: {
                                                        display: true,
                                                        text: "Précipitations (en mm)"
                                                        }
                                                },

                                        },
                                },
                        });

        };

        pressureChart(){
                if(Chart.getChart("pression")){Chart.getChart("pression").destroy()};
                //Extract specific data from json
                        let data = [];
                        const json = this.json;
                        Object.keys(json).forEach(function(key){
                                data.push({time: new Date(key), value: (json[String(key)]["pression"]["niveau_de_la_mer"])/100});                 
                        });
                        //console.log(data);
                //Create a new chart
                        new Chart(
                        document.getElementById('pression'),
                        {type: 'line',
                        data:{
                                labels: data.map(row => row.time),
                                datasets: [{label: 'Pression atmosphérique (en hPa)',
                                data: data.map(row => row.value)}]},
                                options:{
                                        scales:{
                                                x: {
                                                        type: 'time',
                                                        time: {
                                                                displayFormats:{
                                                                        day: 'd/M'
                                                                },
                                                                unit: 'day'
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                                autoSkipPadding: 50,
                                                                maxRotation: 0,
                                                                major: {
                                                                        enabled: true,
                                                                },
                                                        }
                                                },
                                                y:{title: {
                                                        display: true,
                                                        text: "Pression atmosphérique (en hPa)"
                                                        }
                                                },

                                        },
                                },
                        });
        };

        humidityChart(){
                if(Chart.getChart("humidite")){Chart.getChart("humidite").destroy()};
        //Extract specific data from json
                let data = [];
                const json = this.json;
                Object.keys(json).forEach(function(key){
                        data.push({time: new Date(key), value: json[String(key)]["humidite"]["2m"]});                 
                });
        //Create a new chart
                new Chart(
                document.getElementById('humidite'),{
                        type: 'line',
                        data:{
                        labels: data.map(row => row.time),
                        datasets: [{label: 'Humidité relative (en %)',
                                data: data.map(row => row.value)}]},
                                options:{
                                        scales:{
                                                x: {
                                                        type: 'time',
                                                        time: {
                                                                displayFormats:{
                                                                        day: 'd/M'
                                                                },
                                                                unit: 'day'
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                                autoSkipPadding: 50,
                                                                maxRotation: 0,
                                                                major: {
                                                                        enabled: true,
                                                                },
                                                        }
                                                },
                                                y:{title: {
                                                        display: true,
                                                        text: "Humidité relative (en %)"
                                                        }
                                                },
 
                                        },
                        },
                });
        };

//Windspeed distribution in percentage
        windrose(){
                if(Chart.getChart("vent")){Chart.getChart("vent").destroy()};
                //Extract specific data from json
                        let data = [];
                        const json = this.json;
                        Object.keys(json).forEach(function(key){                
                                data.push({time: new Date(key), value_1: json[String(key)]["vent_moyen"]["10m"], value_2: json[String(key)]["vent_rafales"]["10m"]});                 
                        });
                        console.log(data)
                //Create a new chart
                        new Chart(
                        document.getElementById('vent'),{
                                type: 'line',
                                data:{
                                        labels: data.map(row => row.time),
                                        datasets: [{label: 'Vitesse du vent (en km/h)',
                                        data: data.map(row => row.value_1)},{label: 'Rafales (en km/h)',
                                        data: data.map(row => row.value_2)}]},
                                options: {
                                        scales: {
                                                x: {
                                                        type: 'time',
                                                        grid: {linewidth:2},
                                                        time: {
                                                                displayFormats:{
                                                                        day: 'd/M'
                                                                },
                                                                unit: 'day'
                                                        },
                                                        ticks: {
                                                                autoSkip: true,
                                                                autoSkipPadding: 50,
                                                                maxRotation: 0,
                                                                major: {
                                                                        enabled: true,
                                                                },
                                                        }
                                                },
                                                y:{
                                                        title: {
                                                                display: true,
                                                                text: "Vitesse du vent et rafales (km/h)"
                                                                }   
                                                }
                                        }
                                }
                        });

        };

};