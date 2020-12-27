var setInter
startTimer();

function timer(sec){
clearInterval(setInter);
var hour,min,second
var now = new Date();
hour = now.getHours()*3600;
min = now.getMinutes()*60;
second = now.getSeconds();
var totalsec = hour + min + second;
var endsec = totalsec + sec;
var leftsec = endsec - totalsec;
displayEndTime(endsec);
setInter = setInterval(function(){
displayTimeLeft(leftsec);
if(leftsec === 0){
clearInterval(setInter);
}
leftsec--;
},1000)
}

function displayTimeLeft(leftsec){
var hour,min,sec
hour = parseInt(leftsec/3600);
tmp = parseInt(leftsec%3600);
min = parseInt(tmp/60);
if(min <10){
min = "0"+min;
}
sec = parseInt(tmp%60);
if(sec <10 ){
sec = "0"+sec;
}
var printTime = min + ":"+sec;
var timeleft = document.querySelector(".display__time-left");
timeleft.innerHTML = `${printTime}`
}

function displayEndTime(endsec){
var hour,min,sec
hour = parseInt(endsec/3600);
tmp = parseInt(endsec%3600);
min = parseInt(tmp/60);
if(min <10){
min = "0"+min;
}
sec = parseInt(tmp%60);
if(sec <10 ){
sec = "0"+sec;
}
var printTime ="Be Back At" + hour +":" +min;
var timeend = document.querySelector(".display__end-time");
timeend.innerHTML = `${printTime}`; 
}

function startTimer(){
var buttons = document.querySelectorAll(".timer__button");
var forms = document.querySelector("#custom");
var formsinput = document.querySelector("#custom>input")
forms.addEventListener("submit",function(e){
e.preventDefault();
var entertime = parseInt((formsinput.value)*60);
timer(entertime);
formsinput.value = "";
})
for(var i = 0 ; i<buttons.length; i++){
buttons[i].addEventListener("click",function(e){
var clicktime = parseInt(e.target.dataset.time);
timer(clicktime);
})
}
}

