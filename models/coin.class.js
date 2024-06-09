class Coin extends MovableObject {
  height = 100;
  width = 100;
  IMAGES_WALKING = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 200 + Math.random() * 2000; // bottles zufällig verteilen mit Abstand zum Character
    this.y = 75 + Math.random() * 120;
    //this.speed = 0.3 + 0.8 * Math.random();
    //this.moveLeft(this.speed, 1000 / 60); // moveLeft function aufrufen aus moveable-object
    this.loadImages(this.IMAGES_WALKING); // images walking laden
    this.animate(); // Bilder durchrotieren
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
