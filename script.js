const canvas = document.getElementById('drawing-area');
const ctx = canvas.getContext('2d');
let path = [], redoStack = [];
let drawing = false;
let currentTool = 'pencil';
let currentColor = '#000000';
let brushSize = 5;

function setupcanva(){
    const rect = canvas.getBoundingClientRect();
    const dpi = window.devicePixelRatio;

    console.log(rect);
    console.log(dpi);

    canvas.width = rect.width * dpi;
    canvas.height = rect.height * dpi;
    ctx.scale(dpi, dpi);
    console.log(canvas.width, canvas.height);
}
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pencilButton').addEventListener('click', () => setActiveTool('pencil'));
    document.getElementById('erasorButton').addEventListener('click', () => setActiveTool('erasor'));
    document.getElementById('undoButton').addEventListener('click', () => undoLastAction('undo'));
    document.getElementById('redoButton').addEventListener('click', () => redoLastAction('redo'));
    document.getElementById('clearButton').addEventListener('click', () => clearCanvas('clear'));

    document.getElementById('colorPicker').addEventListener('change', (e) => {
        currentColor = e.target.value;
        setActiveTool('pencil');
    });
    document.getElementById('sizePicker').addEventListener('change', (e) => {
        brushSize = e.target.value;
    });

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mousemove', draw);

    setActiveTool('pencil');

    setupcanva();
});

function setActiveTool(tool) {
    currentTool = tool;
    document.querySelectorAll('.toolItem').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${tool}Button`).classList.add('active');

}

function draw(e){
    if (!drawing) return;
    const mousePos = getMousePos(e);
    path[path.length - 1].points.push(mousePos);
    redrawCanvas();
}
function redrawCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    path.forEach(drawPath);
}

function drawPath(path){
    ctx.beginPath();
    ctx.moveTo(path.points[0].x, path.points[0].y);
    for(let i = 0; i < path.points.length; i++){
        ctx.lineTo(path.points[i].x, path.points[i].y);
    }
    ctx.strokeStyle = path.color;
    ctx.lineWidth = path.width;
    ctx.stroke();
}
function getMousePos(e){
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);
    return { x, y };
}

function undoLastAction(){
    if(path.length > 0){
        redoStack.push(path.pop());
        redrawCanvas();
    }
}

function redoLastAction(){
    if(redoStack.length > 0){
        path.push(redoStack.pop());
        redrawCanvas();
    }
}

function startDrawing(e){
    drawing = true;
    const mousePos = getMousePos(e);

    path.push({
        color: currentTool === 'erasor' ? '#FFFFFF' : currentColor,
        width: brushSize,
        points: [mousePos]
    });

    redoStack = [];
}


function stopDrawing(){
    drawing = false;
}

function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    path = [];
    redoStack = [];
}