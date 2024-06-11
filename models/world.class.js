class World {
  character = new Character();
  level = level1;

  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  statusbar = new Statusbar();
  bottlesbar = new Bottlesbar();
  endbossbar = new Endbossbar();
  coinsbar = new Coinsbar();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisons();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    // ------- ab hier fixe Objekte in sich bewegender world wie statusbar
    this.ctx.translate(-this.camera_x, 0); // Einfügestelle für statusbar zurück schieben (im Koordinatensystem)
    this.addToMap(this.statusbar);
    this.addToMap(this.bottlesbar);
    this.addToMap(this.coinsbar);
    this.addToMap(this.endbossbar);
    this.ctx.translate(this.camera_x, 0); // Einfügestelle wieder auf aktuelle camera_x schieben
    // ------- hier Ende fixe Objekte
    this.addToMap(this.character);

    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);

    // Kollisionserkennung mit Flaschen und Coins in requestAnimation Frame gezogen --> wird dann jedes Mal wenn gedrawt wird aufgerufen
    this.checkBottleContact();
    this.checkCoinContact();

    // draw wird immer wieder aufgerufen durch requesAnimationFram
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisons() {
    setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusbar.setPercentage(this.character.energy);
          console.log("collision with character ", this.character.energy);
        }
        if (this.character.energy <= 0) {
          console.log("is game over");
        }
      });
    }, 200);
  }

  checkBottleContact() {
    setInterval(() => {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.character.gotBottle();
          this.bottlesbar.setPercentage(this.character.bottles);
          console.log(
            "bottle geschnappt bottles-status ",
            this.character.bottles
          );
          this.removeBottle(index);
        }
        if (this.character.bottles <= 0) {
        }
      });
    }, 200);
  }

  checkCoinContact() {
    setInterval(() => {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.character.gotCoin();
          this.coinsbar.setPercentage(this.character.coins);
          console.log("coin geschnappt bottles-status ", this.character.coins);
          this.removeCoin(index);
        }
        if (this.character.coins <= 0) {
        }
      });
    }, 200);
  }

  removeBottle(index) {
    this.level.bottles.splice(index, 1);
  }

  removeCoin(index) {
    this.level.coins.splice(index, 1);
  }

  addObjectsToMap(objects) {
    objects.forEach((obj) => {
      this.addToMap(obj);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
