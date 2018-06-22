
// Setup Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Grab button variables
const btnUpload = document.getElementById('inp-file');  // Open File Button
const btnAdd = document.getElementById('btn-add');  // Add new Block Button

const inpX = document.getElementById('inpX');   // Position x field
const inpy = document.getElementById('inpy');   // Position y field
const inpW = document.getElementById('inpW');   // Width field
const inpH = document.getElementById('inpH');   // Height Field

// All buttons that effect block position and size
const btnXup = document.getElementById('btn-x-up'); 
const btnXdown = document.getElementById('btn-x-down');
const btnYup = document.getElementById('btn-y-up');
const btnYdown = document.getElementById('btn-y-down');
const btnWup = document.getElementById('btn-w-up');
const btnWdown = document.getElementById('btn-w-down');
const btnHup = document.getElementById('btn-h-up');
const btnHdown = document.getElementById('btn-h-down');

const formResizeCanvas = document.getElementById('form-resizeCanvas');
const inpResizeWidth = document.getElementById('inp-resizeCanvasWidth');
const inpResizeHeight = document.getElementById('inp-resizeCanvasHeight');

var imgHolder = document.getElementById('img-holder');
let img = new Image();
let imgOffsetWidth = 0;
let imgOffsetHeight = 0;

// Intervals to set and clear
let yDownInterval = 0;
let yUpInterval = 0;
let xUpInterval = 0;
let xDownInterval = 0;
let heightIntervalUp = 0;
let heightIntervalDown = 0;
let widthIntervalUp = 0;
let widthIntervalDown = 0;

// When file is selected
btnUpload.addEventListener('change', function(e){
        loadImg(e);
});


// Load image into <img> element
function loadImg(e){
        const reader = new FileReader();                
        reader.onload = function(){
                imgHolder.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        setTimeout(setCanvas, 1000);
}

// Resize canvas to dimensions of image
function setCanvas(w,h){
        canvas.width = imgHolder.width;
        canvas.height = imgHolder.height;

        loadImageToCanvas();
}

// Load image to canvas
function loadImageToCanvas(){
        img.onload = function(){
        ctx.drawImage(img, 0,0);
      }
    img.src = imgHolder.src;
}

// Resize Image from input fields
function resizeCanvas(w, h){
    console.log('resizing: ', w, h)
    canvas.width = w;
    canvas.height = h;
    draw(w, h);
}

// Event Listener for resizing canvas
formResizeCanvas.addEventListener('submit', function(e){
    e.preventDefault();
    imgOffsetWidth = inpResizeWidth.value;
    imgOffsetHeight = inpResizeHeight.value;
    resizeCanvas(imgOffsetWidth, imgOffsetHeight);
});

// Add new block to canvas
btnAdd.addEventListener('click', function(){
        state.boxArr.push(new Box());
        draw();
        console.log(state);
});

// Update all fields to represent 1 block's properties at a time
function showBoxData(){
        let box = state.boxArr[0];
        inpX.value = box.x;
        inpY.value = box.y;
        inpW.value = box.w;
        inpH.value = box.h;
}

// Set listeners to move block forward on x axis
btnXup.addEventListener('mousedown', function(e){
        xUpInterval = setInterval(function(){
               let box = state.boxArr[0];
                box.x += 1;
                if(box.x + box.w >= canvas.width){
                        box.x = canvas.width - box.w;
                        console.log('out')
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnXup.addEventListener('mouseup', function(e){
                clearInterval(xUpInterval);
});

// Move block backwards
btnXdown.addEventListener('mousedown', function(e){
        xDownInterval = setInterval(function(){
               let box = state.boxArr[0];
                box.x -= 1;
                if(box.x <= 0){
                        box.x = 0;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnXdown.addEventListener('mouseup', function(e){
                clearInterval(xDownInterval);
});

// Move block's y axis upward
btnYup.addEventListener('mousedown', function(e){
        yUpInterval = setInterval(function(){
               let box = state.boxArr[0];
                box.y -= 1;
                if(box.y  <= 0){
                        box.y = 0;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnYup.addEventListener('mouseup', function(e){
                clearInterval(yUpInterval);
})

//  Move block's y axis downward
btnYdown.addEventListener('mousedown', function(e){
        yInterval = setInterval(function(){
               let box = state.boxArr[0];
                box.y += 1;
                if(box.y + box.h >= canvas.height){
                        box.y = canvas.height - box.h;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnYdown.addEventListener('mouseup', function(e){
                clearInterval(yInterval);
});

// Increase Block Height
btnHup.addEventListener('mousedown', function(e){
        heightIntervalUp = setInterval(function(){
               let box = state.boxArr[0];
                box.h += 1;
                if(box.h >= canvas.height){
                        box.y = canvas.height;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnHup.addEventListener('mouseup', function(e){
                clearInterval(heightIntervalUp);
});

// Decrease Block Height
btnHdown.addEventListener('mousedown', function(e){
        heightIntervalDown = setInterval(function(){
               let box = state.boxArr[0];
                box.h -= 1;
                if(box.h <= 5){
                        box.h = 5;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnHdown.addEventListener('mouseup', function(e){
                clearInterval(heightIntervalDown);
});

// Increase Block Width
btnWup.addEventListener('mousedown', function(e){
        widthIntervalDown = setInterval(function(){
               let box = state.boxArr[0];
                box.w += 1;
                if(box.w >= canvas.width){
                        box.w = canvas.width;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnWup.addEventListener('mouseup', function(e){
                clearInterval(widthIntervalDown);
});

// Decrease Block Width
btnWdown.addEventListener('mousedown', function(e){
        widthIntervalUp = setInterval(function(){
               let box = state.boxArr[0];
                box.w -= 1;
                if(box.w <= 5){
                        box.w = 5;
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnWdown.addEventListener('mouseup', function(e){
                clearInterval(widthIntervalUp);
});



function draw(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        if(imgOffsetWidth && imgOffsetHeight){
            ctx.drawImage(img, 0, 0, imgOffsetWidth, imgOffsetHeight);    
        } else {
            console.log('else')
            ctx.drawImage(img, 0,0);    
        }
        
        state.boxArr.forEach(function(el){
                ctx.fillStyle = el.style;
                ctx.fillRect(el.x, el.y, el.w, el.h);
        })

}

class Box{
        constructor(){
                this.x = 0;
                this.y = 0;
                this.w = 100;
                this.h = 25;
                this.selected = false;
                this.style = "rgba(255,0,255, 0.5)";
        }
}

let state = {
        boxArr: []
}
	