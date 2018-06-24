
// Setup Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


// Grab box variables
const btnUpload = document.getElementById('inp-file');  // Open File Button
const btnAdd = document.getElementById('btn-add');  // Add new Block Button

const inpX = document.getElementById('inpX');   // Position x field
const inpy = document.getElementById('inpy');   // Position y field
const inpW = document.getElementById('inpW');   // Width field
const inpH = document.getElementById('inpH');   // Height Field

// Grab Toolbar
const header = document.getElementById('header');
const toolbar = document.getElementById('toolbar-header');

// All buttons that effect block position and size
const btnXup = document.getElementById('btn-x-up'); 
const btnXdown = document.getElementById('btn-x-down');
const btnYup = document.getElementById('btn-y-up');
const btnYdown = document.getElementById('btn-y-down');
const btnWup = document.getElementById('btn-w-up');
const btnWdown = document.getElementById('btn-w-down');
const btnHup = document.getElementById('btn-h-up');
const btnHdown = document.getElementById('btn-h-down');

// Resize elements
const formResizeCanvas = document.getElementById('form-resizeCanvas');
const inpResizeWidth = document.getElementById('inp-resizeCanvasWidth');
const inpResizeHeight = document.getElementById('inp-resizeCanvasHeight');

// Image Variables
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
    canvas.width = w;
    canvas.height = h;
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
});

// Update all fields to represent 1 block's properties at a time
function showBoxData(){
        state.boxArr.forEach(function(box){
                if(box.selected){
                        inpX.value = box.x;
                        inpY.value = box.y;
                        inpW.value = box.w;
                        inpH.value = box.h;
                }
        })
        
}

// Set listeners to move block forward on x axis
btnXup.addEventListener('mousedown', function(e){
        xUpInterval = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){                        
                                box.x += 1;
                                if(box.x + box.w >= canvas.width){
                                        box.x = canvas.width - box.w;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnXup.addEventListener('mouseup', function(e){
                clearInterval(xUpInterval);
});

// Move block backwards
btnXdown.addEventListener('mousedown', function(e){
        xDownInterval = setInterval(function(){
                state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.x -= 1;
                                if(box.x <= 0){
                                        box.x = 0;
                                }
                                showBoxData();
                        }
                })
                
        }, 20)      
});

btnXdown.addEventListener('mouseup', function(e){
                clearInterval(xDownInterval);
});

// Move block's y axis upward
btnYup.addEventListener('mousedown', function(e){
        yUpInterval = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.y -= 1;
                                if(box.y  <= 0){
                                        box.y = 0;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnYup.addEventListener('mouseup', function(e){
                clearInterval(yUpInterval);
})

//  Move block's y axis downward
btnYdown.addEventListener('mousedown', function(e){
        yInterval = setInterval(function(){
                state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.y += 1;
                                if(box.y + box.h >= canvas.height){
                                box.y = canvas.height - box.h;
                }
                showBoxData();
                        }        
                });
        }, 20)      
});

btnYdown.addEventListener('mouseup', function(e){
                clearInterval(yInterval);
});

// Increase Block Height
btnHup.addEventListener('mousedown', function(e){
        heightIntervalUp = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.h += 1;
                                if(box.h >= canvas.height){
                                        box.y = canvas.height;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnHup.addEventListener('mouseup', function(e){
                clearInterval(heightIntervalUp);
});

// Decrease Block Height
btnHdown.addEventListener('mousedown', function(e){
        heightIntervalDown = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.h -= 1;
                                if(box.h <= 5){
                                        box.h = 5;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnHdown.addEventListener('mouseup', function(e){
                clearInterval(heightIntervalDown);
});

// Increase Block Width
btnWup.addEventListener('mousedown', function(e){
        widthIntervalDown = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.w += 1;
                                if(box.w >= canvas.width){
                                        box.w = canvas.width;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnWup.addEventListener('mouseup', function(e){
                clearInterval(widthIntervalDown);
});

// Decrease Block Width
btnWdown.addEventListener('mousedown', function(e){
        widthIntervalUp = setInterval(function(){
               state.boxArr.forEach(function(box){
                        if(box.selected){
                                box.w -= 1;
                                if(box.w <= 5){
                                        box.w = 5;
                                }
                                showBoxData();
                        }
                });
        }, 20)      
});

btnWdown.addEventListener('mouseup', function(e){
                clearInterval(widthIntervalUp);
});


// Toolbar Movements
let toolbarObj = {
        xStart: 0,
        yStart: 0,
        selected: false,
        getDiff: function(x,y){
                return {x: x - this.xStart, y: y - this.yStart}
        }

}

toolbar.addEventListener('mousedown', function(e){
        selectToolbar(e);
});

toolbar.addEventListener('mouseup', function(){
        toolbarObj.selected = false;
        window.removeEventListener('mousemove', moveToolBar);
        window.addEventListener('mousemove', moveToolBar);
});

function selectToolbar(e){
        toolbarObj.xStart = e.clientX;
        toolbarObj.yStart = e.clientY;
        toolbarObj.selected = true;
}

function moveToolBar(e){
        if(toolbarObj.selected){                
                let diff = toolbarObj.getDiff(e.clientX, e.clientY);
                
                header.style.top = e.clientY - (toolbar.offsetHeight / 2) + 'px';
                header.style.left = e.clientX - (toolbar.offsetWidth / 2) + 'px';
        }
}

window.addEventListener('mousemove', moveToolBar);











// Click Events
let mousePosObj = {
        xStart: 0,
        xEnd: 0,
        yStart: 0,
        yEnd: 0,
        xDiff: 0,
        yDiff: 0,
        active: false,
        element: ''
}

let keyBoardObj = {
        multiSelect: false,
}


canvas.addEventListener('mousedown', drag);
window.addEventListener('keypress', function(e){
        if(e.keyCode === 115){
                keyBoardObj.multiSelect = true;
        }
});

window.addEventListener('keyup', function(){
        keyBoardObj.multiSelect = false;
})
function drag(e){
        var rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        state.boxArr.forEach(function(el, ind){
                if(!keyBoardObj.multiSelect){
                        el.deSelect();        
                }
                
                let elWidth = el.x + el.w;
                let elHeight = el.y + el.h;
                if(x >= el.x && x <= elWidth && y >= el.y && y <= elHeight){
                        canvas.style.cursor = 'pointer';
                        el.select();
                        mousePosObj.xStart = e.clientX;
                        mousePosObj.yStart = e.clientY;
                        mousePosObj.active = true;
                        mousePosObj.element = el;
                        canvas.addEventListener('mousemove', moveBox);
                }
        });
}

canvas.addEventListener('mouseup', function(){
        canvas.style.cursor = '';
        mousePosObj.active = false;
        canvas.removeEventListener('mousemove', moveBox);
});

function moveBox(e){
        var rect = canvas.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        
                let elWidth = mousePosObj.element.x + mousePosObj.element.w;
                let elHeight = mousePosObj.element.y + mousePosObj.element.h;
                
                mousePosObj.xEnd = e.clientX;
                mousePosObj.yEnd = e.clientY;
                mousePosObj.xDiff = mousePosObj.xEnd - mousePosObj.xStart;
                mousePosObj.yDiff = mousePosObj.yEnd - mousePosObj.yStart;
                mousePosObj.xStart = e.clientX;
                mousePosObj.yStart = e.clientY;

                state.boxArr.forEach(function(el, ind){
                        if(el.selected){
                        el.x += mousePosObj.xDiff;
                        el.y += mousePosObj.yDiff;

                        keepInBounds(el);
                }
               
       });
};



// Keep box in boundaries of canvas
function keepInBounds(el){
        if(el.x + el.w >= canvas.width){
                el.x = canvas.width - el.w;
        }
        else if(el.x <= 0){
                el.x = 0;
        }
        if(el.y >= canvas.height - el.h){
                el.y = canvas.height - el.h;
        }
        else if(el.y <= 0){
                el.y = 0;
        }
}


function draw(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        if(imgOffsetWidth && imgOffsetHeight){
            ctx.drawImage(img, 0, 0, imgOffsetWidth, imgOffsetHeight);    
        } else {           
            ctx.drawImage(img, 0,0);    
        }
        
        state.boxArr.forEach(function(el){
                ctx.fillStyle = el.style;
                ctx.fillRect(el.x, el.y, el.w, el.h);
        });
        window.requestAnimationFrame(draw);
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

        select(){
                this.selected = true;
                this.style = "rgba(0,150,250,0.5)";
        }

        deSelect(){
                this.selected = false;
                this.style = "rgba(255,0,255, 0.5)";
        }
}

let state = {
        boxArr: []
}
        
draw();