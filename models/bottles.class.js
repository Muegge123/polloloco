class Bottle extends MovableObject {
  height = 120;
  width = 120;
  IMAGES_WALKING = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.x = -500 + Math.random() * 2500; // bottles zufällig verteilen mit Abstand zum Character
    this.y = 50 + Math.random() * 300;
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
