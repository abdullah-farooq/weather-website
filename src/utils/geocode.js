const request = require('request')

const geocode= function(address,callback){
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYWJkdWxhZmFydWsiLCJhIjoiY2s4a20ycXk0MDNhYjNucW90bWJ6dmpjeiJ9.Gi3X5s1nZ5h9V9PLiWy4_Q&limit=1'
    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Unable to connect to location services.',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location. Try another search', undefined)
        }
        else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            }
            )
        }

    })

}

module.exports=geocode