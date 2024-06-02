class Cloud extends MovableObject {
  height = 320;
  width = 420;

  /*
  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = 100 + Math.random() * 500;
    this.y = 0;
    this.moveLeft(0.15, 1000 / 60);
  }
*/
  constructor(imagePath) {
    super().loadImage(imagePath);
    this.x = 0 + Math.random() * 500;
    this.y = 0;
    this.speed = 0.1 + 0.3 * Math.random();
    this.moveLeft(this.speed, 1000 / 60);
  }
}
