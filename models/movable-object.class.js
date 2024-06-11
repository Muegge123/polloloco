class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHitTime = 0;
  bottles = 0;
  lastBottle = 0;
  coins = 0;
  lastCoin = 0;

  speedYBuffer = [];
  bufferSize = 5; // Anzahl der Frames, die im Puffer gespeichert werden sollen

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

  updateSpeedYBuffer() {
    // Fügen Sie den aktuellen `speedY` Wert zum Puffer hinzu
    this.speedYBuffer.push(this.speedY);

    // Entfernen Sie den ältesten `speedY` Wert, wenn der Puffer zu groß wird
    if (this.speedYBuffer.length > this.bufferSize) {
      this.speedYBuffer.shift();
    }
  }

  isColliding(obj) {
    let collisionX = this.x + this.width > obj.x && this.x < obj.x + obj.width;
    let collisionY =
      this.y + this.height > obj.y && this.y < obj.y + obj.height;

    if (collisionX && collisionY) {
      // Check if the collision is from above
      let isCollisionFromAbove =
        this.y + this.height <= obj.y + obj.height && this.speedY < 0;
      console.log("this.y + this.height ", this.y, this.height);
      console.log("obj.y + obj.height; ", obj.y, obj.height);
      console.log(this.speedY);

      if (isCollisionFromAbove) {
        console.log(this.speedY);
        // Handle the collision from above (e.g., make the enemy disappear)
        console.log("Collision from above detected");
        return "above";
      } else {
        // console.log("Side collision detected");
        return "side";
      }
    }

    return false;
  }
  /*
        // Alternativcode für diese function oben
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height &&
      obj.onCollisionCourse
      */
  /*
  isColliding(obj) {
    return (

      this.x + this.width > obj.x &&
      this.y + this.height > obj.y &&
      this.x < obj.x &&
      this.y < obj.y + obj.height
    );
  }
  */

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
    this.coins += 10;
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
