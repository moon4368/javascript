export class Sun {
  constructor() {
    this.radius = 200;

    //해가 움직일 좌표를 60개로 쪼갬
    this.total = 60;
    this.gap = 1 / this.total;
    this.originPos = [];
    this.pos = [];
    for (let i = 0; i < this.total; i++) {
      const pos = this.getCirclePoint(this.radius, this.gap * i);
      this.originPos[i] = pos;
      this.pos[i] = pos;
    }
    //fps정의
    this.fps = 30;
    this.fpsTime = 1000 / this.fps;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;

    this.x = this.stageWidth - this.radius - 140;
    this.y = this.radius + 100;
  }

  draw(ctx, t) {
    if (!this.time) {
      this.time = t;
    }
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      this.updatePoints();
    }
    ctx.fillStyle = '#ffb200';
    ctx.beginPath();
    let pos = this.pos[0];
    ctx.moveTo(pos.x + this.x, pos.y, this.y);
    for (let i = 1; i < this.total; i++) {
      const pos = this.pos[i];
      ctx.lineTo(pos.x + this.x, pos.y + this.y);
    }
    ctx.fill();
  }

  updatePoints() {
    for (let i = 1; i < this.total; i++) {
      const pos = this.originPos[i];
      this.pos[i] = {
        x: pos.x + this.ranInt(5),
        y: pos.y + this.ranInt(5)
      }
    }
  }

  ranInt(max) {
    return Math.random() * max;
  }

  //원 위의 좌표를 가져오려면 지름의 비율에서
  //사인과 코사인함수를 사용해서 가져올 수 있고
  //거기에 반지름을 곱하면 좌표가 나옴
  getCirclePoint(radius, t) {
    const theta = Math.PI * 2 * t;

    return {
      x: (Math.cos(theta) * radius),
      y: (Math.sin(theta) * radius)
    }
  }
}