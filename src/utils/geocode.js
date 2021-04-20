const request=require('request')

//call back feature abstraction with apigeocoding
const geocode=(address,callback)=>
{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYm9yYWRlb21rYXIiLCJhIjoiY2tubWJxb3dqMHRkZjJ4cG52bjY5NWthYiJ9.0U5YUZ5xZWuQyZ3ebqFn5A&limit=1'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Network Error!!!',undefined)
        }
        else if(body.message)
        {
            callback('ERROR'+body.message,undefined)
        }
        else
        {
            callback(undefined,
                {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                place:body.features[0].place_name}
               
                )
        }
    })
}

module.exports=geocode