console.log('client side JS file is loaded')


const WeatherForm = document.querySelector('form');

const WeatherInput = document.querySelector('input');

const outputerror = document.querySelector('#error');
const outputdata = document.querySelector('#data');


WeatherForm.addEventListener('submit',(e)=>{
    e.preventDefault(); //to not refresh page
    const location = WeatherInput.value;
    fetch('/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
          if(data.error){
             outputerror.textContent =data.error;
             outputdata.textContent = "";
            }else{
           outputdata.textContent = data.forecast + " in " + data.place_name;
                outputerror.textContent ="";
        
          }
        })
    })
})