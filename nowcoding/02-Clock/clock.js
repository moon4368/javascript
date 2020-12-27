const hourHandler = document.querySelector(".hour-hand");
const minuteHandler = document.querySelector(".min-hand");
const secondHandler = document.querySelector(".second-hand");

setInterval(() => {
    let day = new Date();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();

    hourHandler.style.transform = `rotate(${90 + hours*30 + minutes/2}deg)`;
    minuteHandler.style.transform = `rotate(${90+(minutes*6)+(seconds/60)}deg)`;
    secondHandler.style.transform = `rotate(${90+(seconds*6)}deg)`;
},1000);


