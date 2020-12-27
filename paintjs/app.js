const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");//more : HTML canvas MDN;
const colors = Array.from(document.querySelectorAll(".jsColor"));
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = '#2c2c2c';

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = '2.5';

let painting = false;
let filling = false;

//그리기 멈춤
function stopPainting() {
    painting = false;
}
//그리기 시작
function startPainting(event) {
    if (event.which === 3) {

    } else {
        painting = true;
    }
}

//마우스 움직임 캐치 Path 그리기
function onMouseMove(event) {
    //event DOM 객체에 접근해 보면
    //client X,Y 는 window객체의 좌표이고
    //offset X,Y는 해당 객체의 좌표임
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {//paintin === true; 
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

//색깔 변경
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

//선의 굵기 변경
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

//모드 변경
function handleModeClick(event) {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event) {
    if (filling) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleCM(event) {
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(event) {//more : a link MDN
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS";
    link.click();
}

function init() {
    if (canvas) {
        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", startPainting);
        canvas.addEventListener("mouseup", stopPainting);
        canvas.addEventListener("mouseleave", stopPainting);
        canvas.addEventListener("click", handleCanvasClick);
        canvas.addEventListener("contextmenu", handleCM);
    }
    colors.forEach(color => color.addEventListener("click", handleColorClick));

    if (range) {
        range.addEventListener("input", handleRangeChange);
    }

    if (mode) {
        mode.addEventListener("click", handleModeClick);
    }

    if (saveBtn) {
        saveBtn.addEventListener("click", handleSaveClick);
    }
}
init();
