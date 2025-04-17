let size = 1;
let isPressed = false;
let color = "black";
let x = undefined;
let y = undefined;
let currentTool = "pencil"; // Default

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Elements
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const colorEl = document.getElementById("color");
const clearEl = document.getElementById("clear");

const lineBtn = document.getElementById("line");
const rectBtn = document.getElementById("rectangle");
const triangleBtn = document.getElementById("triangle");

// Create Pencil Button Dynamically
const pencilBtn = document.createElement("button");
pencilBtn.innerText = "Pencil";
pencilBtn.id = "pencil";
pencilBtn.style.margin = "4px";
document.querySelector("#Box .control-section:last-child").appendChild(pencilBtn);

// Events
canvas.addEventListener("mousedown", (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener("mouseup", (e) => {
  if (!isPressed) return;
  isPressed = false;

  const x2 = e.offsetX;
  const y2 = e.offsetY;

  if (currentTool === "line") {
    drawLine(x, y, x2, y2);
  } else if (currentTool === "rectangle") {
    drawRect(x, y, x2 - x, y2 - y);
  } else if (currentTool === "triangle") {
    drawTriangle(x, y, x2, y2);
  }

  x = undefined;
  y = undefined;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed && currentTool === "pencil") {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    drawCircle(x2, y2);
    drawLine(x, y, x2, y2);
    x = x2;
    y = y2;
  }
});

// Drawing functions
function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function drawRect(x, y, width, height) {
  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function drawTriangle(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y2);
  ctx.lineTo((x1 + x2) / 2, y1);
  ctx.lineTo(x2, y2);
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

// Tool Select
lineBtn.addEventListener("click", () => currentTool = "line");
rectBtn.addEventListener("click", () => currentTool = "rectangle");
triangleBtn.addEventListener("click", () => currentTool = "triangle");
pencilBtn.addEventListener("click", () => currentTool = "pencil");

// Color & Size
colorEl.addEventListener("input", (e) => color = e.target.value);

increaseBtn.addEventListener("click", () => {
  size++;
  updateSize();
});

decreaseBtn.addEventListener("click", () => {
  if (size > 1) size--;
  updateSize();
});

function updateSize() {
  sizeEl.innerText = size;
}

// Clear
clearEl.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
