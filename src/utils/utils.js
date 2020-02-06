const request = require('request');

const geocode = (address,callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoieXVsaXVzOTkiLCJhIjoiY2s1czJxYzZjMDdkODNvbG9yZGZ2dGVjNSJ9.X8ycScGXeW00pWOxb0OHoA&limit=1';
    request({url:geocodeURL,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect. Check your Internet',undefined);
        }else if(body.features.length ===0){
            callback('Unable to find locations. Try another Search',undefined);
        }else{
            callback(undefined,{
             latitude:  body.features[0].center[1],
              longitude:  body.features[0].center[0],
              place_name: body.features[0].place_name
            }
            )
        }
    })   
}


const forecast = (latitude,longitude,callback) =>{
    const forecastURL =  'https://api.darksky.net/forecast/0d08340158a5d0f351becf908e05d115/'+encodeURIComponent(latitude)+','+encodeURIComponent(longitude);
    request({url: forecastURL, json: true},(error,{body})=>{
        if(error){
            callback('Unable to connect. Check your Internet',undefined);
        }else if (body.error){
            callback('Unable to find Temp. Try another Search',undefined);
      
        }else{
            callback(undefined,"It is currently " +body.currently.temperature+ " degrees out. There is a "+body.currently.precipProbability +"% chance of raing")
        }
    })
}


module.exports = {geocode: geocode,forecast: forecast}