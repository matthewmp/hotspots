
// Setup Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Grab button variables
const btnUpload = document.getElementById('inp-file');
const btnAdd = document.getElementById('btn-add');
const range = document.getElementById('range');
const inpX = document.getElementById('inpX');
const inpy = document.getElementById('inpy');
const inpW = document.getElementById('inpW');
const inpH = document.getElementById('inpH');
const btnXup = document.getElementById('btn-x-up');
const btnXdown = document.getElementById('btn-x-down');
const btnYup = document.getElementById('btn-y-up');
const btnYdown = document.getElementById('btn-y-down');
const btnWup = document.getElementById('btn-w-up');
const btnHup = document.getElementById('btn-h-up');

var imgHolder = document.getElementById('img-holder');

btnUpload.addEventListener('change', function(e){
        loadImg(e);
});



function loadImg(e){
        const reader = new FileReader();                
        reader.onload = function(){

                imgHolder.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);

        setTimeout(setCanvas, 1000);

}


function setCanvas(w,h){
        canvas.width = imgHolder.width;
        canvas.height = imgHolder.height;

        loadImageToCanvas();
}
let img = new Image();
function loadImageToCanvas(){
     
        img.onload = function(){
        ctx.drawImage(img, 0,0);
      }
    img.src = imgHolder.src;
}

btnAdd.addEventListener('click', function(){
        state.boxArr.push(new Box());
        draw();
        console.log(state);
});

function showBoxData(){
        let box = state.boxArr[0];
        inpX.value = box.x;
        inpY.value = box.y;
        inpW.value = box.w;
        inpH.value = box.h;
}

range.addEventListener('change', function(e){
        console.log(this.value);
        state.boxArr[0].w = this.value;
        showBoxData();
        draw();
});


let interval = 0;
btnXup.addEventListener('mousedown', function(e){
        interval = setInterval(function(){
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
let yInterval = 0;
btnYup.addEventListener('mousedown', function(e){
        yInterval = setInterval(function(){
               let box = state.boxArr[0];
                box.y += 1;
                if(box.y + box.h >= canvas.height){
                        box.y = canvas.height - box.h;
                        console.log('out')
                }
                showBoxData();
                draw(); 
        }, 20)      
});

btnYup.addEventListener('mouseup', function(e){
                clearInterval(yInterval);
})

// btnYup.addEventListener('mousedown', function(e){
//         yInterval = setInterval(function(){
//                let box = state.boxArr[0];
//                 box.y += 1;
//                 if(box.y + box.h >= canvas.height){
//                         box.y = canvas.height - box.h;
//                         console.log('out')
//                 }
//                 showBoxData();
//                 draw(); 
//         }, 20)      
// });

// btnYup.addEventListener('mouseup', function(e){
//                 clearInterval(yInterval);
// })

btnXup.addEventListener('mouseup', function(e){
                clearInterval(interval);
})

function draw(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.drawImage(img, 0,0);
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
	
