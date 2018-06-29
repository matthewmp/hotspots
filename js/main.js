var txt;
window.onload = function(){
    // Setup Canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


    // Grab box variables
    const btnUpload = document.getElementById('inp-file');  // Open File Button
    const btnAdd = document.getElementById('btn-add');  // Add new Block Button

    const inpX = document.getElementById('inpX');   // Position x field
    const inpY = document.getElementById('inpY');   // Position y field
    const inpW = document.getElementById('inpW');   // Width field
    const inpH = document.getElementById('inpH');   // Height Field

    // Inputs for toolbar that affect key settings
    const inpKey = document.getElementById('inpKey');
    const inpText = document.getElementById('inpText');
    const inpItem = document.getElementById('inpItem');

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

    // Set All Form
    const formSetAll = document.getElementById('set-all');

    // Key Textarea
    const keysTextClose = document.getElementById('keysTextClose');
    const keysTextBox = document.getElementById('keysTextBox');
    const keysTextArea = document.getElementById('keysTextArea');
    const btnKeys = document.getElementById('btnKeys');
    const btnLoadKeys = document.getElementById('btnLoadKeys');

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

    // Table Variables
    let table = document.getElementById('key-table');
    let tableGrab = document.getElementById('table-grab');
    let tableMin =  document.getElementById('table-min');
    let tbody = document.getElementById('tbody');
    let tableRow = document.getElementById('tableRow');
    let keyHolderWrapper = document.getElementById('keyHolderWrapper');

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
    function showBoxData(el){
            // state.boxArr.forEach(function(box){
                    // if(box.selected){
                            inpX.value = el.x;//box.x;
                            inpY.value = el.y;//box.y;
                            inpW.value = el.w;//box.w;
                            inpH.value = el.h;//box.h;
                            inpText.value = el.text;
                            inpKey.value = el.key;
                            inpItem.value = el.item;
                   // }
            //})
            
    }

    // Set listeners to move block forward on x axis
    btnXup.addEventListener('mousedown', function(e){
            e.preventDefault();
           state.boxArr.forEach(function(box){
                    if(box.selected){                        
                            box.x += 1;
                            if(box.x + box.w >= canvas.width){
                                    box.x = canvas.width - box.w;
                            }
                            showBoxData();

                    }
            });
    });

    // Move block backwards
    btnXdown.addEventListener('mousedown', function(e){
            state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.x -= 1;
                            if(box.x <= 0){
                                    box.x = 0;
                            }
                            showBoxData();
                    }
            });
    });

    // Move block's y axis upward
    btnYup.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.y -= 1;
                            if(box.y  <= 0){
                                    box.y = 0;
                            }
                            showBoxData();
                    }
            });
    });

    //  Move block's y axis downward
    btnYdown.addEventListener('mousedown', function(e){
            state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.y += 1;
                            if(box.y + box.h >= canvas.height){
                            box.y = canvas.height - box.h;
            }
            showBoxData();
                    }        
            });
    });

    // Increase Block Height
    btnHup.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.h += 1;
                            if(box.h >= canvas.height){
                                    box.y = canvas.height;
                            }
                            showBoxData();
                    }
            });
    });

    // Decrease Block Height
    btnHdown.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.h -= 1;
                            if(box.h <= 5){
                                    box.h = 5;
                            }
                            showBoxData();
                    }
            });
    });

    // Increase Block Width
    btnWup.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.w += 1;
                            if(box.w >= canvas.width){
                                    box.w = canvas.width;
                            }
                            showBoxData();
                    }
            });
    });

    // Decrease Block Width
    btnWdown.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.w -= 1;
                            adjustResizeBoxes(box);
                            if(box.w <= 5){
                                    box.w = 5;
                            }
                            showBoxData();
                    }
            });    
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
            multiSelectResize: false
    }

    let resizeObj = {
            xStart: 0,
            yStart: 0,
            xDiff: 0,
            yDiff: 0,
            element: '',
            getDiff: function(x,y){
                    return {x: x - this.xStart, y: y - this.yStart}
            }
    }


    window.addEventListener('keypress', function(e){
            if(e.keyCode === 115){
                    keyBoardObj.multiSelect = true;
            } 
            else if(e.keyCode === 114){
                    keyBoardObj.multiSelectResize = true;
            }
    });

    window.addEventListener('keyup', function(){
            keyBoardObj.multiSelect = false;
    });

    canvas.addEventListener('mousedown', drag);
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

                            showBoxData(el);
                            canvas.addEventListener('mousemove', moveBox);
                    }
            });
    }

    canvas.addEventListener('mousedown', resizeTop);
    function resizeTop(e){
            var rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            state.boxArr.forEach(function(el){
                    
                    if(x >= el.resize.top.x && x < (el.resize.top.x + el.resize.top.w) && y >= el.resize.top.y && y < el.resize.top.y + el.resize.top.h){
                            if(keyBoardObj.multiSelect){
                                    activateResizeMulti();        
                            }

                            resizeObj.xStart = e.clientX;
                            resizeObj.yStart = e.clientY;
                            el.activateResize();
                            resizeObj.element = el;
                            canvas.addEventListener('mousemove', resizeBoxHeight);
                    } 
                    else if(x >= el.resize.right.x && x < (el.resize.right.x + el.resize.right.w) && y >= el.resize.right.y && y < el.resize.right.y + el.resize.right.h){
                            if(keyBoardObj.multiSelect){
                                    activateResizeMulti();        
                            }

                            resizeObj.xStart = e.clientX;
                            resizeObj.yStart = e.clientY;
                            el.activateResize();
                            resizeObj.element = el;
                            canvas.addEventListener('mousemove', resizeBoxWidth);
                    }
            })
    }

    function activateResizeMulti(){
            state.boxArr.forEach(function(el){
                    if(el.selected){
                            el.activateResize();
                    }
            })
    }

    function resizeBoxHeight(e){
            var rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            
            let elWidth = resizeObj.element.x + resizeObj.element.w;
            let elHeight = resizeObj.element.y + resizeObj.element.h;

            resizeObj.xEnd = e.clientX;
            resizeObj.yEnd = e.clientY;
            resizeObj.xDiff = resizeObj.xEnd - resizeObj.xStart;
            resizeObj.yDiff = resizeObj.yEnd - resizeObj.yStart;
            resizeObj.xStart = e.clientX;
            resizeObj.yStart = e.clientY;

            state.boxArr.forEach(function(el, ind){
                    if(el.resizeActive){
                        el.y += resizeObj.yDiff;
                        el.resize.top.y += resizeObj.yDiff;
                        el.h -= resizeObj.yDiff;
                        if(el.h < 5){
                                el.h = 5;
                        }
                    adjustResizeBoxes(el);
                    showBoxData(el);
                    } 
            });
    }

    function resizeBoxWidth(e){
            var rect = canvas.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            resizeObj.xEnd = e.clientX;
            resizeObj.yEnd = e.clientY;
            resizeObj.xDiff = resizeObj.xEnd - resizeObj.xStart;
            resizeObj.yDiff = resizeObj.yEnd - resizeObj.yStart;
            resizeObj.xStart = e.clientX;
            resizeObj.yStart = e.clientY;

            state.boxArr.forEach(function(el, ind){
                    if(el.resizeActive){
                        el.resize.right.x += resizeObj.xDiff;
                        el.w += resizeObj.xDiff;
                        if(el.w < 5){
                                el.w = 5;
                        }
                    adjustResizeBoxes(el) 
                    showBoxData(el); 
                    } 
            });
    }

    function resetResizeActive(){
            state.boxArr.forEach(function(el){
                    el.deactivateResize();
            });
    }

    canvas.addEventListener('mouseup', function(){
            canvas.style.cursor = '';
            mousePosObj.active = false;
            canvas.removeEventListener('mousemove', moveBox);

            canvas.removeEventListener('mousemove', resizeBoxWidth);
            canvas.removeEventListener('mousedown', resizeTop);
            canvas.removeEventListener('mousemove', resizeBoxHeight);
            resetResizeActive();
            canvas.addEventListener('mousedown', resizeTop);
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
                    if(el.selected && !el.resizeActive){
                            el.x += mousePosObj.xDiff;
                            el.y += mousePosObj.yDiff;
                            moveResizeBoxes(el, mousePosObj.xDiff, mousePosObj.yDiff);
                            adjustResizeBoxes(el);
                            keepInBounds(el);

                            showBoxData(el);
                    }
           });
    };

    /* Functions for Resize Boxes */

    // Draw Resize Boxes
    function resizeBoxDraw(){
            state.boxArr.forEach(function(el){
                    ctx.fillStyle = el.resizeStyle;
                    ctx.fillRect(el.resize.top.x, el.resize.top.y, el.resize.top.w, el.resize.top.h)
                    // ctx.fillRect(el.resize.bottom.x, el.resize.bottom.y, el.resize.bottom.w, el.resize.bottom.h)
                    // ctx.fillRect(el.resize.left.x, el.resize.left.y, el.resize.left.w, el.resize.left.h)
                    ctx.fillRect(el.resize.right.x, el.resize.right.y, el.resize.right.w, el.resize.right.h)  
            })
            
    }

    // Move Resize Boxes
    function moveResizeBoxes(el, xDiff, yDiff){
            el.resize.top.x += xDiff;
            el.resize.top.y += yDiff;
            // el.resize.bottom.x += xDiff;
            // el.resize.bottom.y += yDiff;
            el.resize.right.x += xDiff;
            el.resize.right.y += yDiff;
            // el.resize.left.x += xDiff;
            // el.resize.left.y += yDiff;
    }

    // Reposition Resize Boxes While Adjusting
    function adjustResizeBoxes(el){
            el.resize.top.y = el.y - 4;
            el.resize.top.x = el.x + (el.w / 2);
            el.resize.right.y = el.y + (el.h / 2) - 4;
            el.resize.right.x = el.x + el.w - 4;
    }

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

    /*===========  TABLE =========== */

    tableGrab.addEventListener('mousedown', grabTable);
    window.addEventListener('mouseup', function(){
        window.removeEventListener('mousemove', moveTable);
    })

    // When Table is Clicked to Move
    function grabTable(){
        window.addEventListener('mousemove', moveTable);       
    }

    function moveTable(e){
        let x = e.clientX;
        let y = e.clientY;
        keyHolderWrapper.style.left = e.clientX - 125 + 'px';
        keyHolderWrapper.style.top = e.clientY - 20 + 'px';
    }


    // Key Concept Table Components
    function buildKeyComponents(item, key, text){
        var tr = document.createElement('tr');
        for(let i = 0; i < arguments.length; i++){
            var td = document.createElement('td');
            td.innerText = arguments[i];
            tr.appendChild(td);
            tr.classList = 'key';
            tr.addEventListener('click', function(e){
                e.stopPropagation();
                console.log('click')
            }, true)

            tbody.appendChild(tr);
        }
        
        // return tr;
    }

    // Minimize Table
    tableMin.addEventListener('click', function(e){
        if(!tbody.classList.value){
            tbody.classList.value = 'hidden';
            this.innerText = '>';
        } else {
            tbody.classList.value = '';
            this.innerText = '<';
        }
    });

    keysTextClose.addEventListener('click', function(){
        keysTextBox.style.display = 'none';
    });

    btnKeys.addEventListener('click', function(){
       keysTextBox.style.display = 'block'; 
    });

    
    btnLoadKeys.addEventListener('click', function(){
        let txt = keysTextArea.value;
        txt.split('\n').forEach(function(el, ind){
        let key = el.slice(0,3)
        let text = el.slice(3).trim();
        state.keysArr.push({
                key,
                text
            });
        });
        loadKeysToTable();
    });

    function loadKeysToTable(){
        state.keysArr.forEach(function(el){
            let tr = document.createElement('tr');
            tr.classList = 'tableRow'
            let key = document.createElement('td');
            key.id = 'tdKey';
            let txt = document.createElement('td');
            txt.id = 'tdText';

            key.innerText = el.key;
            txt.innerText = el.text;

            tr.appendChild(key);
            tr.appendChild(txt);
            tbody.appendChild(tr);
        });
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
                    adjustResizeBoxes(el);
                    resizeBoxDraw(el);
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
                    this.text = '';
                    this.key = '';
                    this.item = '';
                    this.style = "rgba(255,0,255, 0.5)",
                    this.resizeActive = false,
                    this.resizeStyle = "rgba(0,200,255,0.8)",
                    this.resize = {
                            top: {
                                    w: 8,
                                    h: 8,
                                    x: (this.x + this.w) / 2,
                                    y: this.y - 4
                            },
                            // bottom: {
                            //         w: 8,
                            //         h: 8,
                            //         x: (this.x + this.w) / 2,
                            //         y: (this.y + this.h) - 4 / 2
                            // },
                            // left: {
                            //         w: 8,
                            //         h: 8,
                            //         x: this.x - 4,
                            //         y: (this.y + this.h) / 2
                            // },
                            right: {
                                    w: 8,
                                    h: 8,
                                    x: this.x + this.w - 4,
                                    y: ((this.y + this.h) / 2) - 4
                            }

                    }
            }

            select(){
                    this.selected = true;
                    this.style = "rgba(0,150,250,0.5)";
            }

            deSelect(){
                    this.selected = false;
                    this.style = "rgba(255,0,255, 0.5)";
            }

            activateResize(){
                    this.resizeActive =  true;
                    this.resizeStyle = "rgba(0,255,150,0.8)"
            }

            deactivateResize(){
                    this.resizeActive = false;
                    this.resizeStyle = "rgba(0,200,255,0.8)"
            }
    }

    let state = {
            boxArr: [],
            keysArr: []
    }
            
    draw();
}