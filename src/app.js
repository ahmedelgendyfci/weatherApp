const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geodata = require('./utils/geocode')
const forecastdata = require('./utils/forcasting')

const app = express()

// define pathes for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// setup handelbars enginge and views path
app.set('view engine', 'hbs')
app.set('views',viewsPath);
hbs.registerPartials(partialPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'ahmed elgendy'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'help',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: 'You must provide a search address!'
        })
    }
    
    geodata(req.query.address,(error,data)=>{
        if(error)
        {
            console.log(error)
        }
        else
        {
            console.log(data);
            forecastdata(data.latitude,data.langitude,(error,temperature)=>{
              
                const temp = parseInt((temperature-32)/1.8)
                if(error)
                {
                    console.log(error)
                }
                else{
                    console.log(temperature)
                    res.send({
                        forecast: 'It is snowing',
                        location: 'Philadelphia',
                        address: data.place_name,
                        temperature:temp
                    })
                }
            })
        }
    })
    
    
})

app.get('*',(req,res)=>{
    res.send('Error 404 !')
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})