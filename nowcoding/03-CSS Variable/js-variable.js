//input 태그들을 모두 받아옴
const effectController = document.querySelectorAll(".controls input");

//이벤트에서 받아온 작업 실행 , CSS property value 
function handleUpdate(){
    //style에 접근 해서 CSS variable 값 주기
    //dataset.sizing = 바꾸려는 데이터 값의 단위
    if(this.dataset.sizing != undefined)
    document.documentElement.style.setProperty(`--${this.name}`,this.value+this.dataset.sizing);
    else
    document.documentElement.style.setProperty(`--${this.name}`,this.value);
}

function init(){
    effectController.forEach(effectControll =>effectControll.addEventListener("change", handleUpdate));
    //mousemove 왜 필요한지 모르겠음
    effectController.forEach(effectControll =>effectControll.addEventListener("mousemove", handleUpdate));
}

init();