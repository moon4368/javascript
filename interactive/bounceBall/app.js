import {
  Ball
} from './ball.js';
import {
  Block
} from './block.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    window.addEventListener('resize', this.resize.bind(this));
    this.resize();

    this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15);
    this.block = new Block(700, 30, 300, 450);

    window.requestAnimationFrame(this.animate.bind(this));

  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    //애니메이션이라는건 계속 생성하는건데 기존것이 남음 생성만 하기떄문에
    //그래서 항상 이전것들을 지워주는 작업이 필요함
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.block.draw(this.ctx)
    this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block);

  }

}

function init() {
  window.onload = () => new App();
}

init();