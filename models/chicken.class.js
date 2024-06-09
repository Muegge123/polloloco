class Chicken extends MovableObject {
  y = 345;
  height = 100;
  width = 100;
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = 150 + Math.random() * 500; // hühnchen zufällig verteilen mit Abstand zum Character
    this.speed = 0.3 + 0.8 * Math.random();
    this.moveLeft(this.speed, 1000 / 60); // moveLeft function aufrufen aus moveable-object
    this.loadImages(this.IMAGES_WALKING); // images walking laden
    this.animate(); // Bilder durchrotieren für Beinbewegung
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }
}
