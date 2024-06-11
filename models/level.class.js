class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelEndX = 2250;
  bottles;
  coins;
  statusbar;
  bottlesbar;
  endbossbar;
  coinsbar;

  constructor(
    enemies,
    clouds,
    backgroundObjects,
    bottles,
    coins,
    statusbar,
    bottlesbar,
    endbossbar,
    coinsbar
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
    this.statusbar = statusbar;
    this.bottlesbar = bottlesbar;
    this.endbossbar = endbossbar;
    this.coinsbar = coinsbar;
  }
}
