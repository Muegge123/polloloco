class Character extends MovableObject {
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  speed = 10;
  world;

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-2.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
      }
      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // laufen animation
        let i = this.currentImg % this.IMAGES_WALKING.length; // modulo
        let path = this.IMAGES_WALKING[i];
        this.img = this.imgCache[path];

        this.currentImg++;
      }
    }, 30);
  }

  jump() {}
}
