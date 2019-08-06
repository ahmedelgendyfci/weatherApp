const request = require('request')

const geodata = (address, callback) => {
    const geocoding = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYWhtZWRlbGdlbmR5ZmNpIiwiYSI6ImNqeDFpdDM2ZDAyZnE0OW1nNXN5NDdiZWMifQ.aHqWXrx1dZwcnNejt71eJw";

    request({ url: geocoding, json: true }, (error, response) => {
        if (error) { // no internet connection 
            callback("Unable to connect to location service! ", undefined)
        } else if (response.body.features.length === 0) { // not found the place
            callback("Unable to find this location!", undefined)
        } else { // return response 
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                langitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geodata