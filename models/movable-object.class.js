class MovableObject {
  x = 50;
  y = 150;
  img;
  imgCache = [];
  height = 300;
  width = 150;
  currentImg = 0;

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

  moveRight() {
    console.log("moving right");
  }

  moveLeft(px, interval) {
    setInterval(() => {
      this.x -= px;
    }, interval);
  }
}
