const rectSize = 100;

var userName;
var userData = {};
var msg;

var host;

var socket; // the websocket

function preload() {
    host = window.location.host;

    fontBebas = loadFont('assets/BebasNeue-Regular.woff');
    userName = hex(random(1000000));

    // checking if dev or production enviroment

    if (location.hostname === "localhost" || location.hostname === "127.0.0.1"){
        socket = new WebSocket('ws://' + host);
    }else{
        socket = new WebSocket('wss://' + host);
    }
}

function setup() {
    // console.log(host);
    createCanvas(window.innerWidth, window.innerHeight);
    rectMode(CENTER);

    // socket connection listener:
    socket.onopen = sendIntro;
    // socket message listener:
    socket.onmessage = readMessage;
}

function draw() {
    background(0);
    textSize(16);

    fill(255);
    ellipse(mouseX, mouseY, frameCount % 50);

    noFill();
    stroke(255);
    rect(mouseX, mouseY, 100, 100);

    fill(255);
    stroke(255);
    line(0, mouseY, mouseX - rectSize / 2, mouseY);
    line(mouseX, 0, mouseX, mouseY - rectSize / 2);

    textFont(fontBebas)
    noStroke();
    text('User_' + userName, mouseX + rectSize / 1.5, mouseY - 16);
    text('X: ' + str(mouseX), mouseX + rectSize / 1.5, mouseY);
    text('Y: ' + str(mouseY), mouseX + rectSize / 1.5, mouseY + 16);

    userData.name = userName;
    userData.px = mouseX;
    userData.py = mouseY;

    sendMessage(JSON.stringify(userData))

    text(msg, 10, window.innerHeight / 2);
}

function sendIntro() {
    socket.send("Hello");
}

function readMessage(event) {
    msg = event.data; // read data from the onmessage event
}

async function sendMessage(message) {
    socket.send(message);
}

