let drawBoolean = true;
let eraseBoolean = false;
let gridColumns = 50;

const grid = document.querySelector('.grid');
const slider = document.querySelector('input[type="range"]');
const rangeLabel = document.querySelector('#rangeLabel');
const erase = document.querySelector('#erase');
const draw = document.querySelector('#draw');
const reset = document.querySelector('#reset');

//initializes a new grid with varying amounts of columns and divs
function createGrid() {
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
    for(let i = 0; i < slider.value * slider.value; i++){
        const gridElement = document.createElement('div')
        gridElement.classList.add('grid-element')
        gridElement.addEventListener('mousedown', mouseDown);
        window.addEventListener('mouseup', mouseUp);
        grid.appendChild(gridElement);
    }
}
//creates the default grid with 50 columns
createGrid();

//sets the range label to display range value
rangeLabel.textContent = slider.value + 'x' + slider.value;
//upon slider input, sets rangeLabel to new value and calls createGrid()
slider.addEventListener('input', () => {
    toggleDraw();
    rangeLabel.textContent = slider.value +'x' + slider.value;
    createGrid();
});

// gets current color from color input element 
function getCurrentColor() {
    return document.querySelector('#color').value;
};

// gets all curent grid elements
function getAllGridElements() {
    return document.querySelectorAll('.grid-element');
};

//draws on etch-a-sketch grid only when mouse is down 
function mouseDown(e) {
    // if draw mode is active, sets e's background color to current color. Else, eraser mode is on 
    // and set background color to white
    if(drawBoolean === true){
        e.target.style.backgroundColor = getCurrentColor();
    } else {
        e.target.style.backgroundColor = 'white'
    }
    //adds event listener to every grid element only when mouse is down
    getAllGridElements().forEach((element) => {
        element.addEventListener('mouseenter', mouseEnter);
    });
};
// allows mouse drags to draw on board
function mouseEnter(e) {
    if(drawBoolean === true){
        e.target.style.backgroundColor = getCurrentColor();
    } else {
        e.target.style.backgroundColor = 'white'
    }
};
//removes 'mouseenter' event when mouse is up
function mouseUp() {
    getAllGridElements().forEach((element) => {
        element.removeEventListener('mouseenter', mouseEnter)
    });
};

//when page is loaded, sets draw button's background color to indicate draw mode is active
draw.style.backgroundColor = 'dodgerblue'

function toggleDraw() {
    //true/false values used in mouseDown and mouseEnter
    drawBoolean = true;
    eraseBoolean = false;
    //toggles draw's background color on and erase's background color off
    draw.style.backgroundColor = 'dodgerblue'
    erase.style.backgroundColor = '#222'
};

draw.addEventListener('click',toggleDraw);

erase.addEventListener('click', () => {
    //true/false values used in mouseDown and mouseEnter
    drawBoolean = false;
    eraseBoolean = true;
    //toggle draw's background color off and erase's background color on
    draw.style.backgroundColor = '#222'
    erase.style.backgroundColor = 'dodgerblue'
});

//resets etch-a-sketch grid when button is clicked by creating a new grid
reset.addEventListener('click', () => {
    toggleDraw();
    createGrid();
});








