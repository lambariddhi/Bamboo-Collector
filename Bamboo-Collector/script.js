//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject, score = 0;
let panda;
let bamboo;
let font;
let sky;
let happy;
let sad;
let won = false;
let lost = false;
let music, win, lose;
let played = false;

/* PRELOAD LOADS FILES */
function preload(){
  panda = loadImage("assets/panda_p-removebg-preview.png");
  bamboo = loadImage("assets/bam.png");
  font = loadFont("assets/Pangolin/Pangolin-Regular.ttf");
  sky = loadImage("assets/sky.jpg");
  happy = loadImage("assets/panda_happy-removebg-preview.png");
  sad = loadImage("assets/sad-removebg-preview.png");
  music = loadSound("assets/04. Mii Plaza.mp3");
  win = loadSound("assets/success-fanfare-trumpets-6185.mp3");
  lose = loadSound("assets/tf_nemesis.mp3");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);
  textAlign(CENTER);
  textFont(font);
  //Create catcher 
  catcher = new Sprite(200,340,100,20,"k");
  catcher.color = color(95,158,160);
  catcher.image = panda;
  catcher.scale = 0.4;
  
  //Create falling object
  fallingObject = new Sprite(100,0,10);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.image = bamboo;
  fallingObject.scale = 0.15;
  fallingObject.direction = "down";

  happyPanda = new Sprite(-200, -200, 100, 100);
  sadPanda = new Sprite(-300, -300, 100, 100);
  music.play();
  music.loop();
}

/* DRAW LOOP REPEATS */
function draw() {
  background(sky);
  if (!won) {
    happyPanda.pos = {x:-200, y:-200};
  }
  if (!lost) {
    sadPanda.pos = {x:-300, y:-300};
  }
  // Draw directions to screen
  fill(0);
  textSize(12);
  text("Move the \ncatcher with the \nleft and right \narrow keys to \ncatch the falling \nobjects.\n\nScore 10 points\nto win!", width-55, 20);
  textSize(25);
  text("Score: " + score, 55, 30);
  //If falling object reaches bottom, move back to random position at the top.

  if (fallingObject.y >= height) {
    fallingObject.y = 0;
    fallingObject.x = random(50, width-50);
    fallingObject.vel.y = random(2,5);
    score--;
  }

  if (kb.pressing("left")) {
    catcher.vel.x = -3;
  }
  else if(kb.pressing("right")) {
    catcher.vel.x = 3;
  }
  else {
    catcher.vel.x = 0;
  }

  //Stop catcher at edges of screen
  
  if (catcher.x < 50) {
    catcher.x = 50;
  }

  else if (catcher.x > 350) {
    catcher.x = 350;
  }

  // If fallingObject collides with catcher, move back to random position at top

  if (fallingObject.collides(catcher)) {
    fallingObject.y = 0;
    fallingObject.x = random(50, width-50);
    fallingObject.vel.y = random(2,5);
    fallingObject.direction = "down";
    score++;
  }

  gameState();
}

function gameState() {
    if (score < 0 || score >= 10) {
        catcher.pos = {x:-100,y:-100};
        fallingObject.pos = {x:-200,y:-200};
        fallingObject.vel.y = 0;
        background(sky);

        textSize(20);

        if (score < 0) {
            text("You Lose!", width/2, height/2);
            lost = true;
            sadPanda.image = sad;
            sadPanda.x = width/2;
            sadPanda.y = height-80;
            sadPanda.scale = 0.3;
            if (!played) {
              lose.play();
              played = true;
            }
        }

        else {
            text("You Win!", width/2, height/2);
            won = true;
            happyPanda.image = happy;
            happyPanda.x = width/2;
            happyPanda.y = height-80;
            happyPanda.scale = 0.3;
            if (!played) {
              win.play();
              played = true;
            }
        }

        text("Click to restart.", width/2, height/2+25);
        music.stop();
        restart();
    }
}

function restart() {
    if (mouseIsPressed) {
        score = 0;
        catcher.pos = {x:width/2, y: height-60};
        fallingObject.pos = {x:100, y:0};
        fallingObject.vel.y = 3;
        fallingObject.direction = "down";
        won = false;
        lost = false;
        played = false;
        music.play();
        music.loop();
        win.stop();
        lose.stop();
    }
}
