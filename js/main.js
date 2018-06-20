
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
const btnYup = document.getElementById('btn-y-up');
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
        console.log(e)
        interval = setInterval(function(){
               let box = state.boxArr[0];
                box.x += 1;
                if(box.x + box.w >= canvas.width){
                        box.x = canvas.width - box.w;
                        console.log('out')
                }
                showBoxData();
                draw(); 
        })
        
});

btnXup.addEventListener('mouseup', function(e){
                clearInterval(interval);
})

function draw(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width, canvas.height);
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