class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  bottles = 0;
  lastBottle = 0;
  coins = 0;
  lastCoin = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 150;
  }

  isColliding(obj) {
    return (
      /*
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height &&
      obj.onCollisionCourse
      */
      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x &&
      this.y < obj.y + obj.height
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000; // in sekunden
    return timePassed < 0.75;
  }

  isDead() {
    return this.energy === 0;
  }

  gotBottle() {
    this.bottles += 5;
    if (this.bottles > 100) {
      this.bottles = 100;
    } else {
      this.lastBottle = new Date().getTime();
    }
  }

  gotCoin() {
    this.coins += 5;
    if (this.coins > 100) {
      this.coins = 100;
    } else {
      this.lastCoin = new Date().getTime();
    }
  }

  playAnimation(images) {
    let i = this.currentImg % images.length; // modulo
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImg++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }
}
