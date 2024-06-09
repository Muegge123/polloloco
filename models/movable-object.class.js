class MovableObject {
  x = 0;
  y = 150;
  img;
  imgCache = [];
  height = 300;
  width = 150;
  currentImg = 0;
  otherDirection = false;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imgCache[path] = img;
    });
  }

  playAnimation(images) {
    let i = this.currentImg % this.IMAGES_WALKING.length; // modulo
    let path = images[i];
    this.img = this.imgCache[path];
    this.currentImg++;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft(px, interval) {
    setInterval(() => {
      this.x -= px;
    }, interval);
  }
}
