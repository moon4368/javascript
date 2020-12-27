export class Hill {
  //한개가 아니라 여러개의 언덕을 받아올 수 있도록 
  //색상과 속도 언덕에 포인트 개수를 파라미터로 받아옴
  constructor(color, speed, total) {
    this.color = color;
    this.speed = speed;
    this.total = total;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.points = [];
    //포인트 개수를 스테이지 넓이로 딱맞게 나누지 않고
    //좀 더 넓게 간격을 정해줌
    this.gap = Math.ceil(this.stageWidth / (this.total - 2));

    for (let i = 0; i < this.total; i++) {
      this.points[i] = {
        x: i * this.gap,
        y: this.getY()
      };
    }
  }

  //실제 언덕을 캔버스에 그림
  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    let cur = this.points[0];
    let prev = cur;

    //언덕위에 배치할 것들을 위해 좌표를 저장해 둠
    let dots = [];

    //새로운 언덕을 배열 앞에 추가해줌(안그러면 언덕이 잘림)

    if (cur.x > -this.gap) {
      this.points.unshift({
        x: -(this.gap * 2),
        y: this.getY()
      });
    }
    //화면의 일정영역을 벗어나면 배열에서 빼줘서 배열을 관리
    else if (cur.x > this.stageWidth + this.gap) {
      this.points.splice(-1);
    }

    ctx.moveTo(cur.x, cur.y);

    let prevCx = cur.x;
    let prevCy = cur.y;

    //배열을 가져와서 곡선을 그림
    for (let i = 1; i < this.points.length; i++) {
      cur = this.points[i];
      //그려질 때 x좌표에 speed를 더해서 움직이게 함
      cur.x += this.speed;
      const cx = (prev.x + cur.x) / 2;
      const cy = (prev.y + cur.y) / 2;
      //곡선을 그리는 메서드
      ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);

      //나중에 언덕에서 움직이는 것들을 넣기 위해 dots라는 배열에 넣어줌
      dots.push({
        x1: prevCx,
        y1: prevCy,
        x2: prev.x,
        y2: prev.y,
        x3: cx,
        y3: cy,
      });

      prev = cur;
      prevCx = cx;
      prevCy = cy;
    }

    ctx.lineTo(prev.x, prev.y);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();

    return dots;
  }

  //언덕의 Y좌표를 랜덤으로 지정
  //stage의 높이를 8로 나누고 높이를 랜덤하게 리턴하게 만듬
  getY() {
    const min = this.stageHeight / 8;
    const max = this.stageHeight - min;
    return min + Math.random() * max;

  }
}