//순서를 만들 수 있는 배열 만들기
//p태그의 순서대로 전체 배열
//형제 태그 이기 떄문에 순서를 매길 수 있을거라고 생각함.
const boxList = Array.from(document.querySelectorAll(`input + p`));


function contain(event){
    //순서를 만들기 위해 선택되는 태그를 담을 배열 생성
    const checkedList = Array.from(document.querySelectorAll(`input:checked + p`));
    //만약에 클릭 이벤트를 하는데 쉬프트 키가 눌려있다면
    if(event.shiftKey === true){
        //처음 체크하는 체크박스의 형제 p태그를 불러옴
        const param1 = checkedList[0];
        //두번째 체크하는 체크박스의 형제 p태그를 불러옴
        const param2 = checkedList[1];
        //처음 체크하는 체크박스의 형제 태그로 전체(Array)에서 순서(index)를 받음
        const find1 = boxList
        .findIndex((item) => item.innerHTML === param1.innerHTML);
        //두번쨰 체크하는 체크박스의 형제 태그로 전체(Array)에서 순서(index)를 받음
        const find2 = boxList
        .findIndex((item) => item.innerHTML === param2.innerHTML);
        //받은 두 index로 전체 순서로 지정한 boxList에서 두 index사이를 잘라낸
        //새로운 배열을 생성
        const list = boxList.slice(find1,find2+1);

        //새로운 배열에서 하나하나 꺼내서 
        //p요소마다 형제 input태그의 checked를 true로 바꿔줌
        for(let i=0; i<list.length; i++){
            list[i].previousElementSibling.checked = true;
        }
    }
}

function init(){
    document.addEventListener("click", contain);
}

init();


//1 첫번째 클릭 위치 검색 checked
//  순서를 어떻게 만드냐?
// 아래  p 태그로 위치를 만들까?
//2 두번째 클릭 위치 검색 
//: e.shiftkey가 true면 첫번째 와 두번째 위치 사이에 있는것도 전부 checked하는 메서드
//: e.shiftkey가 false면 그냥 내비두는 리턴 값
