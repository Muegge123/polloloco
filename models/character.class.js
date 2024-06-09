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
  walking_sound = new Audio("audio/walking.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-2.png");
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > -619) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;
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
