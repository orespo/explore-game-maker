"use strict";

const gameEngine = new GameEngine();
let mainRec = new Rectangle(150, 200, 10, 10, gameEngine);
let mines = generateMines(30);

function mainLoop() {
  updatePlayerSpeed(mainRec);
  gameEngine.clear();
  mainRec.draw();
  for (const mine of mines) {
    if (mainRec.isCollides(mine)) {
      gameEngine.playSound("coin", "../../assets/sounds");
    }
    mine.draw();
  }
}

function generateMines(amount) {
  const mines = [];
  for (let i = 0; i < amount; i += 1) {
    const x = Math.random() * gameEngine.getScreenWidth();
    const y = Math.random() * gameEngine.getScreenHeight();
    mines.push(new Ball(x, y, 50, gameEngine, [200, 0, 0, 255]));
  }
  return mines;
}

function updatePlayerSpeed(player) {
  let vx = 0;
  let vy = 0;
  let factor = 1;
  if (gameEngine.isKeyHeld(" ")) {
    factor = 5;
  }
  if (gameEngine.isKeyHeld("ArrowRight")) {
    vx += factor;
  }
  if (gameEngine.isKeyHeld("ArrowLeft")) {
    vx += -factor;
  }
  if (gameEngine.isKeyHeld("ArrowUp")) {
    vy += factor;
  }
  if (gameEngine.isKeyHeld("ArrowDown")) {
    vy += -factor;
  }
  player.setSpeed(vx, vy);
}

gameEngine.startMainLoop(mainLoop);
