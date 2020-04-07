const request = require('request')

const forecast = function(latitude,longitude,callback){
    const url = 'https://api.darksky.net/forecast/1813b6d8bc976408a5f46b4e8ba7e560/'+latitude+','+longitude

    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to weather services!' , undefined)
        }
        else if(response.body.error){
            callback('Unable to find location!', undefined)
        }
        else{
            callback(undefined,response.body.daily.data[0].summary+' It is currently '+response.body.daily.data[0].temperatureMax+' degrees out. '+'There is a '+response.body.daily.data[0].precipProbability+'% chance of rain.')
        }
    })

}


module.exports=forecast