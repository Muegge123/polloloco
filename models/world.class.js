class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  canvas;
  ctx;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // character drawen
    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.width,
      this.character.height
    );

    // enemies drawen
    let x = 200;
    this.enemies.forEach((enemy) => {
      x += 50;
      this.ctx.drawImage(enemy.img, x, enemy.y, enemy.width, enemy.height);
    });

    // draw wird immer wieder aufgerufen durch requesAnimationFram
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
}
