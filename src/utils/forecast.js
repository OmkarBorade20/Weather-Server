const request=require('request')
const weather=(latitude,longitute,callback)=>
{
        const url='http://api.weatherstack.com/current?access_key=c26f29af6412f38f60ff0450ead2b301&query='+latitude+','+longitute+'&units=m'

        request({url,json:true},(error,{body})=>{
            if(error)
            {
                callback('Network Problem!!',undefined)
            }
            else if(body.error)
            {
                callback('Error'+body.error.info,undefined)
            }
            else
            {
               
                callback(undefined,{
                forecast: body.current.weather_descriptions,
                temperature: body.current.temperature,
                fellsliketem: body.current.feelslike
            }
                )
            }
        })
}

module.exports=weather