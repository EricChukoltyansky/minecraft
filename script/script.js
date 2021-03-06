// creating variables for continue use

const axe = document.querySelector(".axe");
const picaxe = document.querySelector(".picaxe");
const shovel = document.querySelector(".shovel");
const sword = document.querySelector(".sword");

const game = document.querySelector(".game-grid");

const grassInventory = document.querySelector(".inventory .grass");
const rockInventory = document.querySelector(".inventory .rock");
const soilInventory = document.querySelector(".inventory .soil");
const leavesInventory = document.querySelector(".inventory .leaves");
const woodInventory = document.querySelector(".inventory .wood");
const bushLeavesInventory = document.querySelector(".inventory .bushLeaves");
const sunInventory = document.querySelector(".inventory .sun");

const randomButton = document.querySelector(".tool-box--right-side button");
const entranceScreen = document.querySelector(".entrance-screen");

const instructionScreen = document.querySelector(".instruction-window");
const [instructionsButton, startGameButton] = document.querySelectorAll(
  ".entrance-screen button"
);

const openMainScreen = document.querySelectorAll(
  ".tool-box--right-side .btn"
)[1];

const inventory = {};
const objOfBoxes = {};

let material;
let currentTool;
let currentMaterial;

const materialObj = {
  axe: ["leaves", "wood", "bushLeaves"],
  picaxe: ["rock"],
  shovel: ["soil", "grass"],
  sword: ["sun"],
};

function worldScapeMaker(
  material,
  rowStart = 1,
  rowEnd = 20,
  columnStart = 1,
  columnEnd = 25
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let column = columnStart; column <= columnEnd; column++) {
      objOfBoxes[`${row}.${column}`].classList.add(material);
    }
  }
}

function landMaker(length = 25) {
  let cloudX = Math.floor(Math.random() * 5 + 1);
  let cloudY = Math.floor(Math.random() * 10 + 6);
  worldScapeMaker("grass", 14, 14, 1, length);
  worldScapeMaker("soil", 15, 20, 1, length);
  worldScapeMaker("cloud", 5, 5, 9, 13);
  worldScapeMaker("cloud", 4, 4, 10, 13);
  worldScapeMaker("cloud", 3, 3, 10, 11);
}

function treeMaker() {
  let treeX = Math.floor(Math.random() * 10 + 12);
  worldScapeMaker("wood", 10, 13, treeX, treeX);
  worldScapeMaker("leaves", 7, 9, treeX - 1, treeX + 1);
}

function rockMaker() {
  let rockX = Math.floor(Math.random() * 24 + 1);
  let rockY = Math.floor(Math.random() * 4 + 9);
  worldScapeMaker("rock", rockY, 13, rockX, rockX);
  worldScapeMaker("rock", rockY, 13, rockX, rockX);
  worldScapeMaker("rock", rockY, 13, rockX, rockX);
}

function bushMaker(x = 5) {
  let bushX = Math.floor(Math.random() * 5 + 3);
  worldScapeMaker("bushLeaves", 13, 13, bushX, bushX + 2);
  worldScapeMaker("bushLeaves", 12, 12, bushX + 1, bushX + 1);
}

function sunMaker(x = 3, y = 1) {
  worldScapeMaker("sun", y, y, x, x);
  worldScapeMaker("sun", y + 1, y + 1, x - 1, x + 1);
  worldScapeMaker("sun", y + 2, y + 2, x - 2, x + 2);
  worldScapeMaker("sun", y + 5, y + 5, x, x);
  worldScapeMaker("sun", y + 4, y + 4, x - 1, x + 1);
  worldScapeMaker("sun", y + 3, y + 3, x - 2, x + 2);
}

function basicWorldMaker() {
  landMaker();
  treeMaker();
  rockMaker();
  rockMaker();
  bushMaker();
  sunMaker();
}

function worldCleaner(columnEnd = 25) {
  for (let row = 1; row <= 20; row++) {
    for (let column = 1; column <= columnEnd; column++) {
      objOfBoxes[`${row}.${column}`].classList[1] &&
        objOfBoxes[`${row}.${column}`].classList.remove(
          `${objOfBoxes[`${row}.${column}`].classList[1]}`
        );
    }
  }
}

function collectTiles(event) {
  material = event.target.classList[1];
  if (materialObj[tool].includes(material)) {
    inventory[material]
      ? (inventory[material] += 1)
      : (inventory[material] = 1); //// updated inventory obj amounts
    event.target.classList.remove(material);
    Inventory();
  } else wrongChoice(event);
}

function Inventory() {
  for (let [material, amount] of Object.entries(inventory)) {
    switch (material) {
      case "grass":
        grassInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "rock":
        rockInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "soil":
        soilInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "leaves":
        leavesInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "wood":
        woodInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "sun":
        sunInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
      case "bushLeaves":
        bushLeavesInventory.innerHTML = `<h4>${amount}</h4>`;
        break;
    }
  }
}

function putMaterialBackOnGrid(event) {
  if (inventory[material]) {
    if (event.target.classList.length == 1) {
      event.target.classList.add(material);
      inventory[material] -= 1;
      Inventory();
    }
  }
}

function wrongChoice(event) {
  event.target.style.border = "1px solid red";
  event.target.style.border = "none";
}

function removeOtherEventListeners() {
  game.removeEventListener("click", collectTiles);
  game.removeEventListener("click", putMaterialBackOnGrid);
}

function backgroundReset() {
  axe.classList.contains("blue") && axe.classList.remove("blue");
  picaxe.classList.contains("blue") && picaxe.classList.remove("blue");
  shovel.classList.contains("blue") && shovel.classList.remove("blue");
  sword.classList.contains("blue") && sword.classList.remove("blue");
}

function toggleElementsHidder(el, hide = true) {
  hide ? (el.style.visibility = "hidden") : (el.style.visibility = "visible");
}

let indexOfBox = 0;

function gameCreator(
  rowStart = 1,
  rowEnd = 20,
  columnStart = 1,
  columnEnd = 25
) {
  for (let row = rowStart; row <= rowEnd; row++) {
    for (let column = columnStart; column <= columnEnd; column++) {
      let box = document.createElement("div");
      box.classList.add("box");
      game.appendChild(box);
      box.style.gridRow = row;
      box.style.gridColumn = column;
      objOfBoxes[`${row}.${column}`] = box;
      indexOfBox++;
    }
  }
}

function inventoryReset() {
  for (let material of Object.keys(inventory)) {
    // calibrate inventory
    inventory[material] = 0;
  }
  Inventory();
}

function materialReload() {
  for (let material of [
    "grass",
    "soil",
    "rock",
    "leaves",
    "wood",
    "bushLeaves",
    "sun",
  ]) {
    inventory[material]
      ? (inventory[material] += 1)
      : (inventory[material] = 1);
    Inventory();
  }
}

grassInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "grass";
  backgroundReset();
  grassInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

woodInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "wood";
  backgroundReset();
  woodInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

rockInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "rock";
  backgroundReset();
  rockInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

soilInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "soil";
  backgroundReset();
  soilInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

leavesInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "leaves";
  backgroundReset();
  leavesInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

bushLeavesInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "bushLeaves";
  backgroundReset();
  leavesInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

sunInventory.addEventListener("click", (event) => {
  removeOtherEventListeners();
  material = "sun";
  backgroundReset();
  sunInventory.style.opacity = 1;
  game.addEventListener("click", putMaterialBackOnGrid);
});

gameCreator();
basicWorldMaker();

axe.addEventListener("click", (e) => {
  tool = "axe";
  removeOtherEventListeners();
  backgroundReset();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectTiles);
});

picaxe.addEventListener("click", (e) => {
  tool = "picaxe";
  removeOtherEventListeners();
  backgroundReset();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectTiles);
});

shovel.addEventListener("click", (e) => {
  tool = "shovel";
  removeOtherEventListeners();
  backgroundReset();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectTiles);
});

sword.addEventListener("click", (e) => {
  tool = "sword";
  removeOtherEventListeners();
  backgroundReset();
  e.currentTarget.classList.add("blue");
  game.addEventListener("click", collectTiles);
});

randomButton.addEventListener("click", () => {
  inventoryReset();
  Inventory();
  worldCleaner();
  basicWorldMaker();
});

openMainScreen.addEventListener("click", () => {
  startGameButton.innerHTML = "return to game";
  toggleElementsHidder(entranceScreen, false);
});

startGameButton.addEventListener("click", () => {
  entranceScreen.style.opacity = 0;
  entranceScreen.style.transition = "all 1.5s";

  toggleElementsHidder(entranceScreen);

  entranceScreen.style.opacity = 1;

  toggleElementsHidder(instructionScreen);
});

instructionsButton.addEventListener("click", () => {
  toggleElementsHidder(instructionScreen, false);
});
