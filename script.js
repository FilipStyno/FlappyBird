
//plocha
let board = document.getElementById("board");
let boardWidth = 360;
let boardHeight = 640;
let context;

//ptak
let birdWidth = 34;
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//trubky
let pipeArray = [];
let pipeWidth =  64;
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//fyzika
let velocityX = -1; //trubky se budou pohybovat doleva rychlosti -1

window.onload = function() {
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //pouzito pro vymalovani na plochu

    //nahrani obrazku
    birdImg = new Image();
    birdImg.src = "./png/flappybird.png";
    birdImg.onload = function() {
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeImg = new Image();
    topPipeImg.src = "./png/toppipe.png";

    bottomPipeImg = new Image();
    bottomPipeImg.src = "./png/bottompipe.png";

    requestAnimationFrame(update); //updatuje hru
    setInterval(placePipes, 1500); //polozi trubku kazdych 1.5 sekund
}

function update() {
    requestAnimationFrame(update); //updatuje hru
    context.clearRect(0, 0, board.width, board.height); //maze stary snimek tak aby se snimky nestackovali

    // vykresleni ptak
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    // trubky
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; //posouva trubky doleva definovanou rychlosti
        console.log("Top Pipe X: " + pipeArray[0].x + " Y: " + pipeArray[0].y);
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height); //vykresluje horni trubku
    }
}

function placePipes() {

    //(0-1) * pipeHeight/2.
    // 0 -> -128 (pipeHeight/4)
    // 1 -> -128 - 256 (pipeHeight/4 - pipeHeight/2) = -3/4 pipeHeight
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeImg,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeImg,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}