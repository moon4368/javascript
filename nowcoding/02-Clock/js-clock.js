//시침 역할하는 Div선택
const hourHand = document.querySelector(".hour-hand");
//분침 역할하는 Div선택
const minHand = document.querySelector(".min-hand");
//초침 역할하는 Div선택
const secHand = document.querySelector(".second-hand");

const hourHandler = function (hours,minutes){
     //0deg = 9시 , 1시간에 30도씩 1분에 30/60 도씩
    hourHand.style.transform=`rotate(${90 + hours*30 + minutes/2}deg)`;
    // hourHand.setAttribute('style',`transform : rotate(${90 + hours*30 + minutes/2}deg)`);
}

const minHandler = function (minutes,seconds){
    //1분에 6도씩 1초에 6/360도
    minHand.style.transform=`rotate(${90+(minutes*6)+(seconds/60)}deg)`;
    // minHand.setAttribute('style',`transform : rotate(${90+(minutes*6)+(seconds/60)}deg)`);
}

const secHandler = function (seconds){
    secHand.style.transform=`rotate(${90+(seconds*6)}deg)`;
    secHand.style.height='4px';
    secHand.style.background='red';
    // secHand.setAttribute('style',`transform : rotate(${90+seconds*6})deg`);
}

//현재 시간에 몇도에 있어야 하는지 계산하는 함수 호출
function setDate(){
//새로운 날짜 객체 Date()를 받음
let date = new Date();
//객체에서 시간만 불러옴 시침은 1시간에 30도씩++
let hours = date.getHours();
//객체에서 분만 불러옴 분침은 1분에 6도씩++
let minutes = date.getMinutes();
//객체에서 초만 불러옴 초침은 1초에 6도씩++
let seconds = date.getSeconds();

hourHandler(hours,minutes);
minHandler(minutes,seconds);
secHandler(seconds);

}

function init(){
    setInterval(setDate,1000);
}

init();