const request = require('request')

const forecast = (cord1, cord2, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c1e51fe51c50e16f8b50dbe9d3210d2c&query=http://api.weatherstack.com/current?access_key=c1e51fe51c50e16f8b50dbe9d3210d2c&query=${cord1},${cord2}&units=f&units=f`

request({ url, json: true }, (error, { body }) => {
    if (error) {
        callback("Unable to connect to weather service!", undefined)

    } else if (body.error) {
        callback("unable to find location!", undefined)
    } else {
        callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out, and it feels like " + body.current.feelslike + " degrees.")
    }
    
})
}

module.exports = forecast