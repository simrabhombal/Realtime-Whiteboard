const socket = io(); // Connect to the server that serves the page

let canvas = document.querySelector("#board");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d"); //draw on canvas
let toolsArr = document.querySelectorAll(".tool");
let currentTool = "pencil";
let colorOptions = document.querySelector("#colorOptions");

for (let i = 0; i < toolsArr.length; i++) {
toolsArr[i].addEventListener("click", function (e) {
const toolName = toolsArr[i].id;
if (toolName == "pencil") {
currentTool = "pencil";
colorOptions.style.display = "flex";
toggleColorPopup();
// colorPicker.style.display = "block"; // Show color picker
    }
    
    
    if (toolName == "eraser") {
        currentTool = "eraser";
        tool.strokeStyle = "white";
        tool.lineWidth = 5;
    }
    else if (toolName == "stickynote") {
        currentTool = "sticky";
        createSticky();
    }
    else if (toolName == "download") {
        currentTool = "download";
        downloadFile();
    }
    else if (toolName == "upload") {
        currentTool = "upload";
        uploadFile();
    }
    else if (toolName == "undo") {
        currentTool = "undo";
        undoFN();
    }
    else if (toolName == "redo") {
        currentTool = "redo";
        redoFN();
    }

})
}

function toggleColorPopup() {
if (colorOptions.style.display === "flex") {
hideColorPopup();
} else {
showColorPopup();
}
}

// Function to show color popup
function showColorPopup() {
colorPopup.style.display = "flex";
}

// Function to hide color popup
function hideColorPopup() {
colorPopup.style.display = "none";
}

//tool begin path
// tool.beginPath();

// //move opencil to a point
// tool.moveTo(20,100); //start point
// tool.lineTo(400, 150); //end point
// tool.stroke();


// Handle color option selection
colorOptions.addEventListener("click", function (e) {
    if (e.target.classList.contains("color-option")) {
        let selectedColor = e.target.getAttribute("data-color");
        tool.strokeStyle = selectedColor;
        colorOptions.style.display = "none"; // Hide color options after selection
    }
});
let toolBar = document.querySelector(".toolbar");
let undoStack = [];
let redoStack = [];
let isDrawing = false;

canvas.addEventListener("mousedown", function (e) {
let sidx = e.clientX;
let sidy = e.clientY;
tool.beginPath();
let toolbarheight = getYDelta();
tool.moveTo(sidx, sidy - toolbarheight);
isDrawing = true;
socket.emit('draw', { x: sidx, y: sidy - toolbarheight, type: 'start' });
let pointDesc = {
x: sidx,
y: sidy - toolbarheight,
desc: "md"
}
undoStack.push(pointDesc);
socket.emit('draw', { x: sidx, y: sidy - toolbarheight, type: 'start' });
})

canvas.addEventListener("mousemove", function (e) {
if (isDrawing == false)
return;
let eidx = e.clientX;
let eidy = e.clientY;
let toolbarheight = getYDelta();
tool.lineTo(eidx, eidy - toolbarheight);
tool.stroke();
socket.emit('draw', { x: eidx, y: eidy - toolbarheight, type: 'draw' });
let pointDesc = {
x: eidx,
y: eidy - toolbarheight,
desc: "mm"
}
undoStack.push(pointDesc);
socket.emit('draw', { x: eidx, y: eidy - toolbarheight, type: 'draw' });
})

canvas.addEventListener("mouseup", function (e) {
isDrawing = false;
socket.emit('draw', { type: 'end' });
})

function getYDelta() {
let h = toolBar.getBoundingClientRect().height;
return h;
}

function createSticky() {
let stickyDiv = createOuterShell();
let textArea = document.createElement("textarea");
textArea.setAttribute("class", "text-area");
stickyDiv.appendChild(textArea);
}

function createOuterShell() {
let stickyDiv = document.createElement("div");
let navDiv = document.createElement("div");
let closeDiv = document.createElement("div");
let minimiseDiv = document.createElement("div");


stickyDiv.setAttribute("class", "sticky");
navDiv.setAttribute("class", "nav");

closeDiv.innerText = "X";
minimiseDiv.innerText = "-";

stickyDiv.appendChild(navDiv);
navDiv.appendChild(minimiseDiv);
navDiv.appendChild(closeDiv);

document.body.appendChild(stickyDiv);

let isMinimised = false;
closeDiv.addEventListener("click", function () {
    stickyDiv.remove();
})
minimiseDiv.addEventListener("click", function () {
    let textArea = stickyDiv.querySelector(".text-area");
    if (textArea) {
        textArea.style.display = isMinimised ? "block" : "none";
    }
    isMinimised = !isMinimised;
})

let isStickyDown = false;

navDiv.addEventListener("mousedown", function (e) {
    initialX = e.clientX;
    initialY = e.clientY;
    isStickyDown = true;
})
navDiv.addEventListener("mousemove", function (e) {
    if (isStickyDown == true) {
        let finalX = e.clientX;
        let finalY = e.clientY;

        let dx = finalX - initialX;
        let dy = finalY - initialY;

        let { top, left } = stickyDiv.getBoundingClientRect()

        stickyDiv.style.top = top + dy + "px";
        stickyDiv.style.left = left + dx + "px";
        initialX = finalX;
        initialY = finalY;
    }
})
navDiv.addEventListener("mouseup", function () {
    isStickyDown = false;
})
return stickyDiv;
}

let inputTag = document.querySelector(".input-tag")
function uploadFile() {
inputTag.click();

inputTag.addEventListener("change", function () {
    let data = inputTag.files[0];

    let img = document.createElement("img");
    let url = URL.createObjectURL(data);
    img.src = url;
    img.height = 100;

    img.setAttribute("class", "upload-img");

    let stickyDiv = createOuterShell();
    stickyDiv.appendChild(img); // Append image to the stickyDiv instead of document.body
})
}

function downloadFile(){
let a = document.createElement("a");
a.download = "file.jpeg";
let url = canvas.toDataURL("image/jpeg;base64");
a.href = url;


a.click();

a.remove();
}

function redraw(){
for(let i = 0; i < undoStack.length; i++){
let {x, y, desc} = undoStack[i];
if(desc == "md"){
tool.beginPath();
tool.moveTo(x, y);
}
else if(desc == "mm"){
tool.lineTo(x, y);
tool.stroke();
}
}
}

function undoFN(){


if(undoStack.length > 0){
    tool.clearRect(0, 0, canvas.width, canvas.height);
    redoStack.push(undoStack.pop());
    redraw();
    
}
}

function redoFN(){
if(redoStack.length > 0){
tool.clearRect(0, 0, canvas.width, canvas.height);
undoStack.push(redoStack.pop());
redraw();
}
}

socket.on('draw', function (data) {
if (data.type === 'start') {
tool.beginPath();
tool.moveTo(data.x, data.y);
} else if (data.type === 'draw') {
tool.lineTo(data.x, data.y);
tool.stroke();
} else if (data.type === 'end') {
// Additional logic for ending drawing action if needed
}
});