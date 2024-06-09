class Level {
  enemies;
  clouds;
  backgroundObjects;
  levelEndX = 2250;
  bottles;
  coins;

  constructor(enemies, clouds, backgroundObjects, bottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.bottles = bottles;
    this.coins = coins;
  }
}
