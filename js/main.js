let state = {};
let ouptXML;
let updateBoxKeys;
window.onload = function(){
    // Setup Canvas
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Grab box variables
    const btnUpload = document.getElementById('inp-file');  // Open File Button
    const btnAdd = document.getElementById('btn-add');  // Add new Block Button
    const btnMinus = document.getElementById('btn-minus');  // Remove Block Button

    const inpX = document.getElementById('inpX');   // Position x field
    const inpY = document.getElementById('inpY');   // Position y field
    const inpW = document.getElementById('inpW');   // Width field
    const inpH = document.getElementById('inpH');   // Height Field
    const inpXskew = document.getElementById('inpXskew');

    // Grab Toolbar
    const header = document.getElementById('header');
    const toolbar = document.getElementById('toolbar-header');

    // All buttons that effect box position and size
    const btnXup = document.getElementById('btn-x-up'); 
    const btnXdown = document.getElementById('btn-x-down');
    const btnYup = document.getElementById('btn-y-up');
    const btnYdown = document.getElementById('btn-y-down');
    const btnWup = document.getElementById('btn-w-up');
    const btnWdown = document.getElementById('btn-w-down');
    const btnHup = document.getElementById('btn-h-up');
    const btnHdown = document.getElementById('btn-h-down');
    const btnXSup = document.getElementById('btn-xSkew-up');
    const btnXSdown = document.getElementById('btn-xSkew-down');
    const btnYSup= document.getElementById('btn-ySkew-up');
    const btnYSdown= document.getElementById('btn-ySkew-down');

    // All buttons that affect box key info
    const btnItem = document.getElementById('btnItem');
    const btnKey = document.getElementById('btnKey');
    const btnText = document.getElementById('btnText');
    const btnUpdateKeys = document.getElementById('btnUpdateKeys');

    // Inputs that affect box key info
    const inpItem = document.getElementById('inpItem');
    const inpKey = document.getElementById('inpKey');
    const inpText = document.getElementById('inpText');    

    // Resize elements
    const formResizeCanvas = document.getElementById('form-resizeCanvas');
    const inpResizeWidth = document.getElementById('inp-resizeCanvasWidth');
    const inpResizeHeight = document.getElementById('inp-resizeCanvasHeight');

    // Export Button
    var btnExport = document.getElementById('btnExport');

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
    let keyTable = document.getElementById('keyTable');
    let tableGrab = document.getElementById('table-grab');
    let tableMin =  document.getElementById('table-min');
    let toolbarMin = document.getElementById('toolbarMin');
    let tbody = document.getElementById('tbody');
    let tableRow = document.getElementById('tableRow');
    let keyHolderWrapper = document.getElementById('keyHolderWrapper');

    // Set default padding for flash app
    let xPadding = 0;
    let yPadding = 0;

    // Padding inputs and buttons
    var inpPaddingY = document.getElementById('inpPaddingY');
    var inpPaddingX = document.getElementById('inpPaddingX');
    var btnPaddingY = document.getElementById('btnPaddingY');
    var btnPaddingX = document.getElementById('btnPaddingX');

    // Ouput Text Area for XML
    var xmlOutputWrapper = document.getElementById('xmlOutputWrapper');
    var taXML = document.getElementById('taXML');
    var xCloseXML = document.getElementById('xCloseXML');

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

    // Remove block from canvas
    btnMinus.addEventListener('click', function(){
            let delIndexArr = [];
            state.boxArr.forEach(function(el, ind){
                if(el.selected){
                    delIndexArr.push(ind);
                }
            });

            delIndexArr.forEach(function(el){
                state.boxArr.splice(el, 1)
            })
    });

    // Update all fields to represent 1 block's properties at a time
    function showBoxData(){
            state.boxArr.forEach(function(box){

                    if(box.selected){
                            inpX.value = box.x;//box.x;
                            inpY.value = box.y;//box.y;
                            inpW.value = box.w;//box.w;
                            inpH.value = box.h;//box.h;
                            inpText.value = box.text;
                            inpKey.value = box.key;
                            inpItem.value = box.item;
                            inpXskew.value = box.xSkew;
                   }
            })
            inpPaddingX.value = xPadding;
            inpPaddingY.value = yPadding;
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

    // Increase xSkew
    btnXSup.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.xSkew += 1;
                            adjustResizeBoxes(box);
                            showBoxData();
                    }
            });    
    });

    // Decrease xSkew
    btnXSdown.addEventListener('mousedown', function(e){
           state.boxArr.forEach(function(box){
                    if(box.selected){
                            box.xSkew -= 1;
                            adjustResizeBoxes(box);
                            showBoxData();
                    }
            });    
    });

    // Set Item #
    btnItem.addEventListener('click', function(e){
        state.boxArr.forEach(function(el){
            if(el.selected){
                el.item = inpItem.value;
            }
        })
    });

    // Set Key #
    btnKey.addEventListener('click', function(e){
        state.boxArr.forEach(function(el){
            if(el.selected){
                el.key = inpKey.value;
            }
        })
    });

    // Set Box Text
    btnText.addEventListener('click', function(e){
        state.boxArr.forEach(function(el){
            if(el.selected){
                el.text = inpText.value;
            }
        })
    });

    // Set padding
    btnPaddingX.addEventListener('click', function(e){
        xPadding = inpPaddingX.value;
        showBoxData();
    });

    btnPaddingY.addEventListener('click', function(e){
        yPadding = inpPaddingY.value;
        showBoxData();
    });

    // Export button open XML output
    btnExport.addEventListener('click', function(){
        outputXML();
    });

    btnUpdateKeys.addEventListener('click', function(){
        updateBoxKeys();
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
                    
                    header.style.top = e.clientY - (toolbar.offsetHeight / 2) - 10 + 'px';
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
                    showBoxData();
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
                    showBoxData(); 
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
            showBoxData();
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

                            showBoxData();
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
            el.resize.top.y = el.y + (el.xSkew / 2);
            el.resize.top.x = el.x + (el.w / 2);
            el.resize.right.y = el.y + (el.h / 2) - 4 + (el.xSkew);
            el.resize.right.x = el.x + el.w - 8;
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
            }, true)

            tbody.appendChild(tr);
        }
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

    // Minimize Toolbar
        toolbarMin.addEventListener('click', function(e){
        if(!toolbarFormWrapper.classList.value){
            toolbarFormWrapper.classList.value = 'hidden';
            this.innerText = '>';
        } else {
            toolbarFormWrapper.classList.value = '';
            this.innerText = '<';
        }
    });

    // Close Key Input Box
    keysTextClose.addEventListener('click', function(){
        keysTextBox.style.display = 'none';
    });

    // Show Key Input Box
    btnKeys.addEventListener('click', function(){
       keysTextBox.style.display = 'block'; 
    });

    // Parse keys into state
    btnLoadKeys.addEventListener('click', function(){
        state.keysArr.length = 0;
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
        keysTextArea.value = '';
        keysTextBox.style.display = 'none';
    });

    // Load all keys to keyTable
    function loadKeysToTable(){
        // Clear Tabel
        tbody.innerHTML = '';

        state.keysArr.forEach(function(el, ind){
            let tr = document.createElement('tr');
            tr.classList = 'tableRow'
            let key = document.createElement('td');
            key.classList = 'tdKey';
            let txt = document.createElement('td');
            txt.classList = 'tdText';
            let itemNum = document.createElement('td');
            itemNum.classList = 'tdItem';

            itemNum.innerText = ind + 1;
            key.innerText = el.key;
            txt.innerText = el.text;

            tr.appendChild(itemNum);
            tr.appendChild(key);
            tr.appendChild(txt);
            tbody.appendChild(tr);
        });
    }

    // Handle event when key row is clicked
    keyTable.addEventListener('dblclick', function(e){
        if(e.target.parentElement.classList[0] === 'tableRow'){
            let item = e.target.parentElement.childNodes[0].innerText;
            let key = e.target.parentElement.childNodes[1].innerText;
            let text = e.target.parentElement.childNodes[2].innerText;

            state.boxArr.forEach(function(el){
                if(el.selected){
                    el.item = item;
                    el.key = key;
                    el.text = text;
                    showBoxData(el);
                }
            });
        }
    });

    // Update keys of boxes with newly uploaded key data
    updateBoxKeys = function(){  
        state.boxArr.forEach(function(box, ind){
            box.key = retrieveItemKey(parseInt(box.item) - 1);
        });
    }

    function retrieveItemKey(itemNum){
        var rows = document.getElementsByClassName('tableRow');
        return rows[itemNum].children[1].innerText;
    }

//  Draw, State, Box Class
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
                    // Set Skew
                   
                    //ctx.fillRect(el.x, el.y, el.w, el.h);
                    ctx.beginPath();
                    // Move to upper left corner to begin drawing of block
                    ctx.moveTo(el.x, el.y);
                    // Draw line across the top right corner of block
                    ctx.lineTo((el.x + el.w), (el.y + el.xSkew));
                    // Draw line from top right to bottom right corner of block
                    ctx.lineTo((el.x + el.w), (el.y + el.h + el.xSkew));
                    // Draw line from bottom right to bottom left corner of block
                    ctx.lineTo(el.x, (el.y + el.h));
                    //ctx.lineTo(el.y);
                    ctx.closePath();
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 2;
                    ctx.stroke();
                    ctx.fill();
                    adjustResizeBoxes(el);
                    resizeBoxDraw(el);
                    ctx.strokeStyle = '#fff';
                    ctx.font="10px arial";
                    ctx.strokeText(el.key, el.x + 2, el.y + 10);
                    ctx.strokeText(el.item, (el.x + el.w) - 20, el.y + 10);
            });
            window.requestAnimationFrame(draw);
    }

    class Box{
            constructor(){
                    this.x = 0,
                    this.y = 0,
                    this.w = 100,
                    this.h = 25,
                    this.xSkew = 0,
                    this.vSkew = 0,

                    this.selected = false,
                    this.text = '',
                    this.key = '',
                    this.item = '',
                    this.style = "rgba(255,0,255, 0.5)",
                    this.resizeActive = false,
                    this.resizeStyle = "rgba(255,255,0,0.8)",
                    this.resize = {
                            top: {
                                    w: 8,
                                    h: 8,
                                    x: (this.x + this.w) / 2,
                                    y: this.y + this.xSkew - 4
                            },
                            right: {
                                    w: 8,
                                    h: 8,
                                    x: this.x + this.w - 4,
                                    y: ((this.y + this.h) / 2) + this.xSkew - 4
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
                    this.resizeStyle = "rgba(255,255,0,0.8)"
            }
    }


//  XML Output Code

    outputXML = function(){
    const xmlHeader = 
    `
    <xml version="1.0">
    <hotspots>

    <!-- X = Left/Right -->
    <!-- Y = Up/Down -->
    <!-- All points are relative to the initial Xpos & ypos -->
    <!--" sname = system choice key -->
    `

    var output = '';
    output += xmlHeader;

    var ouputArr = state.boxArr.sort(function(a,b){
        return parseInt(a.item) - parseInt(b.item);
    });

    ouputArr.forEach((el, ind) => {
        var ypos = el.y + parseInt(yPadding) + 2;
        var xpos = el.x + parseInt(xPadding) + 2;
        let hsItem = 
        `
        <!-- Item ${el.item} - ${el.text} -->
        <spot sid="${ind + 1}" sname="${el.key}" width="0" height="0" xpos="${xpos}" ypos="${ypos}">
        <corner xax="${el.w}" yax="0">2</corner>
        <corner xax="${el.w}" yax="${el.h}">2</corner>
        <corner xax="0"  yax="${el.h}">4</corner>
        </spot>
        `

        output += hsItem;
    });

    let tail = 
    `
        </hotspots>
          <img width="${canvas.width}px" height="${canvas.height}px" xpadding="0px" ypadding="0px" url="images/Cell_1.jpg"></img>
          <choices all="" none="None are unique"></choices>
          <selectall sid="820"></selectall>
          <nothing sid="543"></nothing>

          <select max="55" min="1" color="0x33FF00" maxMessage="You have selected the maximum number of one choice, you can change your choice by unselecting the previous area and making a new selection."></select>
        </xml>
    `

    output += tail;
    xmlOutputWrapper.classList="";
    taXML.innerText = '';
    taXML.innerText = output;

    }

// Close XML output div
xCloseXML.addEventListener('click', function(){
    xmlOutputWrapper.classList = 'hidden'
})






    // Initialize state
    state = {
            boxArr: [],
            keysArr: []
    }
            
    draw();
}


