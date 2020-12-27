export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;

    this.x = diameter + (Math.random() * (stageWidth - diameter));
    this.y = diameter + (Math.random() * (stageHeight - diameter));
  }

  // 움직이는 공을 그리기 위한 함수
  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;


    this.bounceWindow(stageWidth, stageHeight);

    this.bounceBlock(block);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "#fdd700";
    ctx.fill();

  }

  //공의 중심값이 중심이기 때문에
  //화면상에서 공의 반지름만큼 전체를 빼줘야 제대로 끝에 부딪히면 공이 튕김
  //그 화면상에서 공이 어디까지 갈수 있는지 정의하는 함수
  bounceWindow(stageWidth, stageHeight) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  //캔버스는 좌표로 움직이기 떄문에
  //좌표를 계산 할 수 있으면 편하게 사용할수 있다
  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) {
      const x1 = Math.abs(minX - this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min == min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min == min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}