import { Point } from "./point.js";

export class Wave {
  constructor(index, totalPoints, color) {
    this.index = index;
    this.totalPoints = totalPoints;
    this.color = color;
    this.points = [];
  }
  //애니메이션을 그리기 위해 가장 중요한것은
  //내가 그리고자 하는 애니메이션의 좌표값을 가지고 오는것
  //그러기 위해서는 애니메이션의 크기를 알아야함
  //그래서 스테이지의 넓이와 높이를 가져오는게 중요!!!
  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    //현재 웨이브는 화면에 중간에 그려질 것이기 때문에
    //centerX & centerY를 정의
    this.centerX = stageWidth / 2;
    this.centerY = stageHeight / 2;

    this.pointGap = this.stageWidth / (this.totalPoints - 1);

    this.init();
  }

  init() {
    this.points = [];

    for (let i = 0; i < this.totalPoints; i++) {
      const point = new Point(
        this.index + i,
        this.pointGap * i,
        this.centerY,
      );
      this.points[i] = point;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;


    let prevX = this.points[0].x;
    let prevY = this.points[0].y;

    ctx.moveTo(prevX, prevY);

    for (let i = 0; i < this.totalPoints; i++) {
      if (i < this.totalPoints - 1) {
        this.points[i].update();
      }

      const cx = (prevX + this.points[i].x) / 2
      const cy = (prevY + this.points[i].y) / 2

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }
    ctx.lineTo(prevX, prevY);
    ctx.lineTo(this.stageWidth, this.stageHeight);
    ctx.lineTo(this.points[0].x, this.stageHeight);
    ctx.fill();
    ctx.closePath();

  }
}