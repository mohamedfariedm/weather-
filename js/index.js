let responce;
let lastCity;
let city,temp,icon,condition,speed,umperalla,direction;
let month=["January" ,"February" ,"March" ,"April" ,"May"  ,"June" ,"July" ,"August" ,"September" ,"October" ,"November" ,"December"];
let day=["Sunday","Monday","Tuesday","Wednesday", "Thursday", "Friday", "Saturday" ];
city= document.getElementById("city");
temp= document.getElementById("temp");
icon= document.getElementById("icon");
condition= document.getElementById("condition");
speed= document.getElementById("speed");
umperalla= document.getElementById("umperalla");
direction= document.getElementById("direction");
let serchIcon=document.getElementById("serch-icon");
let browserDay=document.getElementById("day");
let browsermonth=document.getElementById("month");
let secDay=document.querySelectorAll(".sec-day");
let thirdDay=document.querySelectorAll(".third-day");
function cityName(){
    city.innerHTML=responce.location.name;
}
function cityIcon(){
    icon.setAttribute("src","https:"+responce.current.condition.icon);
}
function cityCondition(){
    condition.innerHTML=responce.current.condition.text;
}
function cityTemp(){
    temp.innerHTML=responce.current.temp_c+" C";
}
function windSpead(){
    speed.innerHTML=responce.current.wind_mph+"km/h";
}
function windUmperalla(){
    umperalla.innerHTML=responce.current.wind_kph+"%";
}
function windDirection(){
    let direct;
    console.log(responce.current.wind_dir)
    switch (responce.current.wind_dir[0]) {
        case "E":
            direct="East";
            break;
        case "N":
            direct="North";
            break;
        case "S":
            direct="South";
            break;
        case "W":
            direct="Weast";
            break;
    }
    direction.innerHTML=direct;
}
function prowserDate() {
    let date=new Date();
    browserDay.innerHTML=day[date.getDay()];
    browsermonth.innerHTML=date.getDate()+" "+month[date.getMonth()];
}

function nextDay(Day,i){
    let date=new Date();
    date.setDate(date.getDate()+i)
    Day[0].innerHTML=day[date.getDay()];
    Day[1].setAttribute("src","https:"+responce.forecast.forecastday[i].day.condition.icon);
    Day[2].innerHTML=responce.forecast.forecastday[i].day.maxtemp_c+" c";
    Day[3].innerHTML=responce.forecast.forecastday[i].day.mintemp_c+" c";
    Day[4].innerHTML=responce.forecast.forecastday[i].day.condition.text;
}

// console.log(day[date.getDay()] )//name of day
// console.log(month[date.getMonth()])//name of month
// console.log(date.getDate())//number of day in the month
// date.setDate(date.getDate()+1)// tomorrow
function show(){
cityName();
cityIcon();
cityCondition();
cityTemp();
windSpead();
windUmperalla();
windDirection();
prowserDate();
nextDay(secDay,1);
nextDay(thirdDay,2);
}
async function serchApi(term){
var data=await fetch(`https://api.weatherapi.com/v1/search.json?key=da9b131d88484659b04233829230408&q=${term}`);
var finalRes=await data.json();
if(finalRes.length==0){
    return lastCity ;
}else{
    lastCity=finalRes[0].name
    return lastCity;
}
}
async function getdata(term){
var data=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=da9b131d88484659b04233829230408&q=${term}&days=3&aqi=no&alerts=no`);
responce=await data.json();
}

serchIcon.addEventListener("input",async function(){
    if(this.value.length>=3){
    Api= await serchApi(this.value);
    await getdata(Api);
    show();
    }
})
async function statApp(){
    await getdata("cairo");
    show();
}
statApp();







