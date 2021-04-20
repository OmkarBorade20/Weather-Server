
const formdata=document.querySelector('form')
const search=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
const message3=document.querySelector('#message-3')
const message4=document.querySelector('#message-4')
const message5=document.querySelector('#message-5')
const message6=document.querySelector('#message-6')

formdata.addEventListener('submit',(e)=>{
    e.preventDefault()


    message1.textContent='Loading.....!'
   
    fetch('/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
        console.log(data)
        message1.textContent=''
        message2.textContent='Location :'+data.place
        message3.textContent='latitude :'+data.latitude
        message4.textContent='longitude :'+data.longitude
        message5.textContent='Weather :'+data.forecastdata.forecast[0]
        message6.textContent='Temperature :'+data.forecastdata.temperature+'°C'
    })
})
})