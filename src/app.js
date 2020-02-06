const path = require('path');
const express = require('express');
const hbs = require('hbs');
const utils = require('./utils/utils.js')
const app = express();

//setup handlebar engine and views location
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'../tempelates/views'))
hbs.registerPartials(path.join(__dirname,'../tempelates/partials'))

//setup static directory to serve
app.use(express.static(path.join(__dirname,'../public')));


//app.com
//app.com/help
//app.com/buy we do this by get
//request and respond 

app.get('/',(req,res) =>{
    res.render('index.hbs',{
        title: 'Weather app',
        name: 'Julius'
    });
})


app.get('/about',(req,res) =>{
    res.render('about.hbs',{
        title: 'About',
        name: 'Julius'
    })
})

app.get('/help',(req,res) =>{
    res.render('help.hbs',{
        title: 'Help page',
        name: 'Julius',
        message: 'Contact me'
    })
})


app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
           error: "Please provide an address"
       })
   }
   
    utils.geocode(req.query.address,(error,{latitude,longitude, place_name} = {})=>{
        if(!req.query.address){
            return res.send({
                error: error
            })
        }else{
            utils.forecast(latitude,longitude,(error,body)=>{
                if(error){
                    return res.send({
                        error: error
                    })}else{
                        return res.send({
                            forecast:body,
                            address: req.query.address,
                            place_name
                        })
                    }
            })
            
        }
    });   
   
})


app.get('/products',(req,res) =>{
   
    if(!req.query.serach){
        return res.send({
            error: "you must provide a search term"
        })
    }

    res.send({
        products: []
    })
})


//404 pages
app.get('/help/*',(req,res)=>{
    res.render('404page.hbs',{
        title: '404',
        error: 'Help article not found',
        name: 'Julius'

    })
})


app.get('*',(req,res)=>{
     res.render('404page.hbs',{
         title: '404',
        error: 'Page not found',
        name: 'Julius'
    })
})


//start server

app.listen(3000,()=>{
    console.log('Server has started')
});