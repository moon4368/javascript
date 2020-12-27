//doucment.querySelectorAll은 NodeList로 반환되는데 Nodelist는 배열이 아님
//그래서 Array.form을 써서 배열로 만들어 줌
const clickedKeyboards = Array.from(document.querySelectorAll('.key')); 

function playSound(event) { 
    //EventListener로 받아온 event의 DOM에서 찾고자 하는 키값을 가져옴
    const keyCode = event.keyCode;
    //받아온 키 값을 리터럴[backtick(`)]을 이용해 원하는 html 태그를 찾아옴
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const clickedKeyboard = document.querySelector(`div[data-key="${keyCode}"]`); 
    //해당 html의 클래스에 'playing'을 넣어줌
    clickedKeyboard.classList.add('playing'); 
    //해당 audio 태그에 존재하는 음악 파일을 재생
    audio.play(); 
}

function removeTransition(event) {
    //EventListener로 받아온 event에 target안에 존재하는 클래스 'playing'을 삭제
    event.target.classList.remove('playing'); 
}

function init(){
    //1.forEach를 이용해서 배열에서 값을 빼오는 방법
    // clickedKeyboards.forEach(clickedKeyboard =>
    //     clickedKeyboard.addEventListener('transitionend',removeTransition));

    //2.forEach를 이용해서 배열에서 값을 빼온후 addEventListener('trasitionend')대신
    //ontransitionend를 이용해서 이벤트를 발생 시키는 방법
    // clickedKeyboards.forEach(clickedKeyboard => 
    //     clickedKeyboard.ontransitionend = removeTransition);

    //3.for를 이용해서 배열에서 값을 빼오는 방법 
    for(let clickedKeyboard of clickedKeyboards){
        clickedKeyboard.addEventListener('transitionend',removeTransition);
    }
    
    window.addEventListener('keydown', playSound);
}

init();
