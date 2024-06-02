class MovableObject {
  x = 220;
  y = 180;
  img;
  height = 300;
  width = 150;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    console.log("moving left");
  }
}
