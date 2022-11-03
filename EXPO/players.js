var host = '20.40.51.233:1235';
var socket;


connection = false;

function setup() {
  createCanvas(400, 400);

  socket = new WebSocket('wss://' + host);
  socket.onopen = () => connection = true;
  socket.onclose = () => connection = false;
}

function draw() {
  background("#2307AF");
  if (!mouseIsPressed) background("#FF0000"); //else fullscreen(true);
  if (connection) socket.send(JSON.stringify({status:mouseIsPressed}));
}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
}
