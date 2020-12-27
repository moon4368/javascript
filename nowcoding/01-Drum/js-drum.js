//removeTranstion keyup이벤트
function removeTransition(event){
    //event 발생시 해당 html 태그를 받아옴
    const clickedKeyboard = document.querySelector(`div[data-key='${event.keyCode}']`)
    //키보드 입력받은 div class에 playing을 제거
    clickedKeyboard.classList.remove("playing");
    
}
//playSound keydown이벤트
function playSound(event){
    //event 발생시 해당 html태그를 받아옴
    const clickedKeyboard = document.querySelector(`div[data-key='${event.keyCode}']`),
        audio = document.querySelector(`audio[data-key='${event.keyCode}']`);
    //키보드 입력 받은 div class에 playing을 추가
    clickedKeyboard.classList.add("playing");
    //음악재생 currentTime을 0으로 세팅해서 여러개를 동시에 칠수 있게 해줌
    audio.currentTime=0;
    audio.play();    
}

function init(){
    //keydown시 window객체에서 playSound함수라는 이벤트 발생
    window.addEventListener('keydown',playSound);
    //keyup시 window객체에서 removeTransition함수라는 이벤트를 발생
    window.addEventListener('keyup',removeTransition);
}

init();