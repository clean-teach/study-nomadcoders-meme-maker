const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
let isPainting = false;

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
};

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mousedown", startPainting);
document.addEventListener("mouseup", cancelPainting);
// canvas.addEventListener("mouseleave", cancelPainting);