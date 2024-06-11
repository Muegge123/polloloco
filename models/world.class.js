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
    this.setWorld();
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);

    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);
    this.addToMap(this.bottlesbar);
    this.addToMap(this.coinsbar);
    this.addToMap(this.endbossbar);
    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.level.coins);

    this.ctx.translate(-this.camera_x, 0);

    // Kollisionserkennung bei jedem Frame
    this.checkCollisons();
    this.checkBottleContact();
    this.checkCoinContact();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisons() {
    this.level.enemies.forEach((enemy, index) => {
      let collisionType = this.character.isColliding(enemy);
      if (collisionType === "above") {
        //console.log("Enemy hit from above", index);
        this.removeChicken(index);
      } else if (collisionType === "side") {
        // verzögern damit nicht zu schnell energy abgezogen wird
        const currentTime = Date.now();
        if (currentTime - this.character.lastHitTime > 200) {
          //console.log("Side collision with character", this.character.energy);
          this.character.hit();
          this.character.lastHitTime = currentTime; // Aktualisieren des Zeitstempels
          this.statusbar.setPercentage(this.character.energy);
        }
      }
      if (this.character.energy <= 0) {
        //console.log("Game over");
      }
    });
  }

  checkBottleContact() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.gotBottle();
        this.bottlesbar.setPercentage(this.character.bottles);
        this.removeBottle(index);
      }
    });
  }

  checkCoinContact() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.gotCoin();
        this.coinsbar.setPercentage(this.character.coins);
        this.removeCoin(index);
      }
    });
  }

  removeBottle(index) {
    this.level.bottles.splice(index, 1);
  }

  removeCoin(index) {
    this.level.coins.splice(index, 1);
  }

  removeChicken(index) {
    this.level.enemies.splice(index, 1);
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
