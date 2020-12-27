import {
  Hill
} from './hill.js';

import {
  SheepController
} from './sheepController.js';

import {
  Sun
} from './sun.js';

class App {
  constructor() {
    //캔버스를 바디에 넣어줌
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);


    //hills 배열에 Hill instance들 추가
    //속도는 뒤에 있는 언덕일수록 느리게 만들면 3d같은 효과를 얻을수 있음.
    //뒤에 있는 언덕일 수록 좌표를 추가해서 좀더 촘촘하게 만듬
    this.hills = [
      new Hill('#fd6bea', 0.2, 12),
      new Hill('#ff59c2', 0.5, 8),
      new Hill('#ff4674', 1.4, 6)
    ];
    this.sun = new Sun();

    //양들을 관리할 컨트롤러를 새로 인스턴스
    this.SheepController = new SheepController();



    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    requestAnimationFrame(this.animate.bind(this));
  }

  //스크린 사이즈를 가져오기 위해 리사이즈 이벤트를 걸어줌
  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    //캔버스의 사이즈를 2배로 해줘서 레티나 디스플레이에서도 선명하게 보이게
    this.canvas.width = this.stageWidth * 2;
    this.canvas.height = this.stageHeight * 2;
    this.ctx.scale(2, 2);
    this.sun.resize(this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.hills.length; i++) {
      this.hills[i].resize(this.stageWidth, this.stageHeight);
    }

    this.SheepController.resize(this.stageWidth, this.stageHeight);
  }
  //Parameter t = fps를 위한 timestamp 
  animate(t) {
    //canvas를 지워주는 코드
    requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.sun.draw(this.ctx, t);

    let dots;
    for (let i = 0; i < this.hills.length; i++) {
      dots = this.hills[i].draw(this.ctx);
    }

    this.SheepController.draw(this.ctx, t, dots);
  }
}

function init() {
  window.onload = () => new App();
}

init();