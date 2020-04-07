const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000
//console.log(__dirname)
// console.log(__filename)

//Define Paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {

    res.render('index',{
        title:'WeatherApp',
        name: 'Abdullah Farooq'
    })
})

app.get('/help',(req,res) => {

    res.render('help',{
        title:'Help Page',
        name: 'Abdullah Farooq',
        company:'smartronix'
    })
})

app.get('/about',(req,res) => {

    res.render('about',{
        title:'About Page',
        name: 'Abdullah Farooq',
        company:'smartronix'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if(error){
           return res.send({error:error})
        }

        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({error: error})
            }
            res.send({
                    forecast:forecastData,
                    location:data.location,
                    address:req.query.address
                    })
            })
    })
    
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search query!'
        })
    }
    console.log(req.query.search)
    res.send({products:[]})

})
app.get('/help/*',(req,res) => {

    res.render('404',{
        title:'404',
        name:'Abdullah Farooq',
        errorMessage:'Help article not found.'
    })
})

app.get('*',(req,res) => {

    res.render('404',{
        title:'404',
        name:'Abdullah Farooq',
        errorMessage:'Page not found.'
    })
})

app.listen(port,() => {
    console.log('Server is up and running on port '+port)
})