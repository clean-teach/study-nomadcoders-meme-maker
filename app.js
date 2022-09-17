const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.querySelector('#mode-btn');
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = lineWidth.value;
let isPainting = false,
    isFilling = false;

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
        modeBtn.innerText = 'fill';
    }else{
        isFilling = true;
        modeBtn.innerText = 'draw';
    }
};

const onCanvasClick = () => {
    if(isFilling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
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