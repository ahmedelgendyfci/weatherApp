const request = require('request')

const forecast = (latitude,langitude,callback)=>{
    const url = "https://api.darksky.net/forecast/5030625d84a7cadf03bc9818ba13b577/"+latitude+","+langitude+"";

    request({url:url, json:true},(error, response)=>{ // take json + callback function
        if (error) { //if there is no internet connection 
            callback("Unable to connect to location service! ", undefined)
        } else if (response.body.error) { //if an error happend
            callback("Unable to find this forecast!", undefined)
        } else { // success response
            callback(undefined, response.body.currently.temperature)
        }
    })
}

module.exports = forecast