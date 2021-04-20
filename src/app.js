const express=require('express')
const path=require('path')
const hbs=require('hbs')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//express config for path
const publicdirectorypath=path.join(__dirname,'../public')
const partialpath=path.join(__dirname,'../views/partials')
//static html files from public

//dynamic html files setting up engines and view
app.set('view engine','hbs')
app.use(express.static(publicdirectorypath))
hbs.registerPartials(partialpath)



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        data:'Dynamic Data'
    })
})

app.get('/help',(req,res)=>{
    res.send('App Express')
})


app.get('/about',(req,res)=>{
    res.render('about',{title:'About',about:'Developed this Site While Learig Node Js By Following Along the tutorial on udemy!!'})
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send('Error Need to provide address!')
    }
    
    geocode( req.query.address,(error,{latitude,longitude,place}={})=>{
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }
            res.send({place,latitude,longitude,forecastdata})
        })
    })
   
})

//wildcard * for error pages
app.get('*',(req,res)=>{
    res.render('error')
})
app.listen(port,()=>{
    console.log('Server Started at Port '+port+'.!')
})
