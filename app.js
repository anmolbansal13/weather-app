const API_KEY = "23dd6253d33145e6b7e115429240809";
const BASE_URL = `https://api.weatherapi.com/v1`;

const search = document.querySelector('.fa-magnifying-glass');
let query;

function updateData(data) {
    let current = data.current;
    document.querySelector('.data').querySelector('img').src=current.condition.icon;
    document.querySelector('.temp').innerHTML=`${current.temp_c}°c`;
    let location= data.location;
    document.querySelector('.city').innerHTML=`${location.name}, ${location.region}`;
    document.querySelector('.humidity').querySelector('.value').innerHTML=`${current.humidity}%`;
}

async function fetchData (){
    const URL = `${BASE_URL}/current.json?key=${API_KEY}&q=${query}`;
    let data = await fetch(URL);
    if(data.status===200){
        data = await data.json();
        console.log(data);
        updateData(data);
    }
}

search.addEventListener('click', (e) =>{
    let target=e.target.closest('form').querySelector('input');
    query=target.value;
    if(query) fetchData();
})
search.addEventListener('keydown', (e) =>{
    if(e.key ==='Enter'){
        let target=e.target.closest('form').querySelector('input');
        query=target.value;
        if(query) fetchData();
    }
})

