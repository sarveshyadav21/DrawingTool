const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fill the screen
canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.7;

// Default settings
let drawing = false;
let brushColor = '#000000';
let brushSize = 5;
let erasing = false;

// Event listeners
document.getElementById('color-picker').addEventListener('input', function() {
    brushColor = this.value;
    erasing = false;
});

document.getElementById('brush-size').addEventListener('input', function() {
    brushSize = this.value;
});

document.getElementById('eraser').addEventListener('click', function() {
    erasing = true;
});

document.getElementById('clear-canvas').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    drawing = true;
    draw(e); // Start drawing immediately
}

function draw(e) {
    if (!drawing) return;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';

    if (erasing) {
        ctx.strokeStyle = '#fff';
    } else {
        ctx.strokeStyle = brushColor;
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Reset path to avoid lines between strokes
}

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    tempCanvas.getContext('2d').drawImage(canvas, 0, 0);
    canvas.width = window.innerWidth * 0.9;
    canvas.height = window.innerHeight * 0.7;
    ctx.drawImage(tempCanvas, 0, 0);
});
