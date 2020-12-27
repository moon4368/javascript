import {
  Sheep
} from './sheep.js';

export class SheepController {
  constructor() {
    this.img = new Image();
    this.img.onload = () => this.loaded();

    this.img.src = 'sheep.png';
    //양이 들어갈 배열을 선언
    this.items = [];

    this.cur = 0;
    //현재 로드는 안되어 있음을 표시
    this.isLoaded = false;
  }

  resize(stageWidth, stageHeight) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
  }
  //이미지가 로드가 완료되면 양을 추가하는 메서드 실행
  loaded() {
    this.isLoaded = true;
    this.addSheep();
  }

  addSheep() {
    this.items.push(
      new Sheep(this.img, this.stageWidth),
    );
  }

  draw(ctx, t, dots) {
    //로딩이 완료 되었으면 실행
    if (this.isLoaded) {
      this.cur += 1;
      if (this.cur > 200) {
        this.cur = 0;
        this.addSheep();
      }

      for (let i = this.items.length - 1; i >= 0; i--) {
        const item = this.items[i];

        if (item.x < -item.stageWidth) {
          this.items.splice(i, 1);
        } else {
          item.draw(ctx, t, dots);
        }
      }
    }
  }
}