const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const lineWidth = document.querySelector('#line-width');
const color = document.querySelector('#color');
const colorOptions = Array.from(document.getElementsByClassName('color-option'));
const modeBtn = document.querySelector('#mode-btn');
const destroyBtn = document.querySelector('#destroy-btn');
const eraserBtn = document.querySelector('#eraser-btn');
const fileInput = document.querySelector('#file');
const textInput = document.querySelector('#text');
const saveBtn = document.querySelector('#save');

let isPainting = false,
    isFilling = false;

canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";

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

const onFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.src = url;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        fileInput.value = null;
    };
};

const onDoubledClick = (event) => {
    const txt = textInput.value;
    if(txt !== ''){
        ctx.save();
        ctx.lineWidth = 1;
        ctx.font = 'normal 36px "Press Start 2P"';
        ctx.fillText(txt, event.offsetX, event.offsetY);
        ctx.restore();
    }
};

const onSaveBtn = () => {
    const url = canvas.toDataURL();
    const a = document.createElement('a');
    a.href = url;
    a.download = 'canvas-img.jpg';
    a.click();
};

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", startPainting);
document.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
// canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("dblclick", onDoubledClick);

lineWidth.addEventListener('change', onLineWidthChange);
color.addEventListener('change', onColorChange);

colorOptions.forEach(colorOption => colorOption.addEventListener('click', onColorOptionChange));

modeBtn.addEventListener('click', onModeClick);
destroyBtn.addEventListener('click', onDestroyClick);
eraserBtn.addEventListener('click', onEraserClick);

fileInput.addEventListener('change', onFileChange);

saveBtn.addEventListener('click', onSaveBtn);