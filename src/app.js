const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require("./utils/forecast")
const geocode = require("./utils/geocode")


// Define paths for Express config
const app = express()

const pubDirPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")


// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))


app.get("", (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: "Mary Sutton"
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Mary Sutton"
    })
})

app.get("/help", (req, res) => {
    res.render('help', {
        title: "Help Page",
        message: "I am not a purple rockamapatamus, but some may say that well.",
        name: "Mary Sutton"
    })
})
// app.get("/help", (req, res) => {
//     res.send('HELP PAGE')
// })

// app.get("/about", (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
    // res.send({
    //     forecast: "It is snowing",
    //     location: "location",
    //     address: req.query.address,
    // })
})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term!"
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "Help article not found :("
    })
})

app.get("*", (req, res) => {
    res.render("error", {
        title: "404",
        errorMessage: "404 Page not found :("
    })
})

app.listen(3000, () => {
    console.log("Server is running!")
})