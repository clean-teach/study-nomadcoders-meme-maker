const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;

const colors = [
    "#ff3838",
    "#ffb8b8",
    "#c56cf0",
    "#ff9f1a",
    "#fff200",
    "#32ff7e",
    "#7efff5",
    "#18dcff",
    "#7d5fff",
  ];

let moveToX = 0, moveToY = 0;

const handleClick = (event) => {
    const color = Math.floor(Math.random() * colors.length);
    ctx.beginPath();
    ctx.strokeStyle = colors[color];
    moveToX = event.offsetX;
    moveToY = event.offsetY;
};
const handleMouseMove = (event) => {
    ctx.moveTo(moveToX, moveToY);
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
};

canvas.addEventListener("click", handleClick);
canvas.addEventListener("mousemove", handleMouseMove);