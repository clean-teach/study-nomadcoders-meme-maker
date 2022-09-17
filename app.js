const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.querySelector('#mode-btn');
const destroyBtn = document.querySelector('#destroy-btn');
const eraserBtn = document.querySelector('#eraser-btn')

let isPainting = false,
    isFilling = false;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

const handleMouseMove = event => {
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX, event.offsetY);
};
const startPainting = () => {
    isPainting = true;
};
const cancelPainting = () => {
    isPainting = false;
    ctx.beginPath();
};

const onLineWidthChange = event => {
    ctx.lineWidth = event.target.value;
};
const setPaintColor = (color) => {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
};
const onColorChange = event => {
    setPaintColor(event.target.value);
};
const onColorOptionChange = event => {
    const colorValue = event.target.dataset.color;
    setPaintColor(colorValue);
    color.value = colorValue;
};

const onModeClick = () => {
    if(isFilling){
        isFilling = false;
        modeBtn.innerText = 'Fill';
    }else{
        isFilling = true;
        modeBtn.innerText = 'Draw';
    }
};

const onCanvasClick = () => {
    if(isFilling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
};

const onDestroyClick = () => {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
const onEraserClick = () => {
    ctx.strokeStyle = 'white';
    isFilling = false;
    modeBtn.innerText = 'Fill';
};

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", startPainting);
document.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
// canvas.addEventListener("mouseleave", cancelPainting);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach(colorOption => colorOption.addEventListener('click', onColorOptionChange));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);