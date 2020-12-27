export class Sheep {
  //양이 끝에서 나와야 하니 stageWidth를 받음
  constructor(img, stageWidth) {
    this.img = img;

    //frame 정의
    //sheep.png 파일의 프레임이 8
    this.totalFrame = 8;
    //현재 프레임
    this.curFrame = 0;
    //이미지의 크기는 양 그림 한장의 넓이와 높이
    this.imgWidth = 360;
    this.imgHeight = 300;
    //그려질 양의 크기는 레티나 디스플레이를 고려해 절반으로 정의
    this.sheepWidth = 180;
    this.sheepHeight = 150;

    this.sheepWidthHalf = this.sheepWidth / 2;
    this.x = stageWidth + this.sheepWidth;
    this.y = 0;
    //속도는 랜덤으로 정의
    this.speed = Math.random() * 2 + 1;

    //FPS를 24로 정의
    this.fps = 24;
    //FPS time 정의 실제로 timestamp와 비교값이 됨
    this.fpsTime = 1000 / this.fps;
  }

  draw(ctx, t, dots) {
    //this.time이 없으면 timestamp파라미터를 
    //내가 정의한 this.time에 넣어줌
    if (!this.time) {
      this.time = t;
    }
    //fps시간과 타임스탬프로 정의 한 시간을 비교해서
    //그 시간에 도달했을 때만 프레임을 증가시켜줌
    //프레임을 증가시키는 속도를 시간에 맞춰서 조절
    const now = t - this.time;
    if (now > this.fpsTime) {
      this.time = t;
      //현재 프레임을 1씩 증가 시켜줌
      this.curFrame += 1
      //현재 프레임이 그림의 프레임을 넘어가면 0으로 리셋
      if (this.curFrame == this.totalFrame) {
        this.curFrame = 0;
      }
    }

    this.animate(ctx, dots);
  }

  //양의 중심점을 하단 가운데로 잡아야 언덕의 곡선을 따라감
  animate(ctx, dots) {
    this.x -= this.speed; //캔버스에 정의한 넓이의 끝x값에서 정의한 속도 값만큼 빼줌
    const closet = this.getY(this.x, dots);//x값에 따른 y값을 측정하고 가장 근사치인 y값을 리턴
    this.y = closet.y;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(closet.rotation);
    //drawImage() 메서드를 통해 양을 그리기
    ctx.drawImage(
      this.img,
      this.imgWidth * this.curFrame,
      0,
      this.imgWidth,
      this.imgHeight,
      -this.sheepWidth,//양의 중심점을 중앙 하단으로 하기위해 중심의 x값을 -양의 넓이의 절반
      -this.sheepHeight + 20,// 양의 중심정을 중앙 하단으로 하기 위해 중심의 y값 +20은 그림의 여백 떄문에 넣음
      this.sheepWidth,
      this.sheepHeight
    )
    //저장했던 캔버스를 복귀
    ctx.restore();
  }
  //어떤 곡선이 x값에 해당하는지 확인
  getY(x, dots) {
    for (let i = 1; i < dots.length; i++) {
      if (x >= dots[i].x1 && x <= dots[i].x3) {//x가 dots배열안에 있는 처음 값과 끝값 사이에 존재할 때
        return this.getY2(x, dots[i]);
      }
    }

    return {
      y: 0,
      rotation: 0
    };
  }

  //x값과 가장 근사한 값의 곡선의 좌표를 가져옴
  getY2(x, dot) {
    const total = 200; //곡선을 200개의 촘촘한 비율로 정의
    let pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, 0);
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = this.getPointOnQuad(dot.x1, dot.y1, dot.x2, dot.y2, dot.x3, dot.y3, t);

      if (x >= prevX && x <= pt.x) {
        return pt;
      }

      prevX = pt.x;
    }

    return pt;
  }

  //Bezier Curve의 비율 t에 따른 좌표를 찾는 공식
  //quadratic Beizer curve.
  //조절점 p0,p1,p2가 주어졌을 떄.
  //베지에 곡선은 p0와 p1으로 정의된 1차 베지에 곡선위의 점과
  //p1,p2로 정의한 1차 베지에 곡선위의 점을 선형 보간한 것으로 생각 할수 있다
  //2차 베지에 곡선
  //https://ko.wikipedia.org/wiki/%EB%B2%A0%EC%A7%80%EC%97%90_%EA%B3%A1%EC%84%A0
  getQuadValue(p0, p1, p2, t) {
    return (1 - t) * (1 - t) * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
  }
  //비율값 찾기
  getPointOnQuad(x1, y1, x2, y2, x3, y3, t) {
    const tx = this.quadTangent(x1, x2, x3, t);
    const ty = this.quadTangent(y1, y2, y3, t);
    //각도를 구하는 함수 atan2()
    //quadTangent가 수직을 구하는 공식이니까 
    //수평으로 만들려면 90도를 더해줘야함
    //atan2의 리턴값이 deg가 아니라 radian이라서
    //일반적으로 쓰는 90deg를 radian으로 변환
    const rotation = -Math.atan2(tx, ty) + (90 * Math.PI / 180);
    return {
      x: this.getQuadValue(x1, x2, x3, t),
      y: this.getQuadValue(y1, y2, y3, t),
      rotation: rotation
    }
  }

  //양의 언덕위의 위치에 따라 기울기를 표한하고 싶음
  //곡선위 좌표의 수직으로 된 기울기를 찾는 공식
  quadTangent(a, b, c, t) {
    return 2 * (1 - t) * (b - a) + 2 * (c - b) * t;
  }
}