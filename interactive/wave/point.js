//wave 를 그린다는건 'wave'를 그린다기 보다는
//간격을 가진 좌표를 하나씩 만들어서
//좌표의 Y값을 아래위로 이동시키고
//각각의 좌표를 하나의 선으로 연결하는 방식으로 생각
//그 선들을 곡선으로 바꾸고
//각각의 좌표들을 위아래로 움직이면 움직이는 웨이브가 만들어짐
//그래서 좌표를 구하는 point클래스를 만듬

export class Point {
  constructor(index, x, y) {
    this.x = x;
    this.y = y;
    this.fixedY = y;
    this.speed = 0.1;
    this.cur = index;
    //얼마만큼 움직일 것인가에 대한 Max값
    this.max = Math.random() * 10 + 150;

  }

  update() {
    // 현재값을 항상 speed 만큼 증가시키고
    this.cur += this.speed;
    //sine함수를 써서 아래위로 움직일수 있도록 만들어줌
    //more : Math.sin MDN , sine graph
    this.y = this.fixedY + (Math.sin(this.cur) * this.max);
  }
}