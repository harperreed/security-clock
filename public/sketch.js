let img; // To hold the texture
let x = 0, y = 0, z = 0; // Position
let xspeed = 1, yspeed = 1, zspeed = 1; // Speed
let angle = 0; // Rotation angle
let boxSize = 500; // Size of the cube
let lastTextureChange = 0; // Last time the texture was changed

let imgUrl = '/proxy?url=http://192.168.120.54:11080/endpoint/@scrypted/webhook/public/54/d91ea50c4766676f/takePicture'

function preload() {

  img = loadImage(imgUrl); // Replace 'texture.jpg' with your file path
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  // Initial position in the center
  x = 0;
  y = 0;
}

function draw() {
  clear(); // Makes the background clear

  // Check if 10 seconds have passed to refresh the texture
  if (millis() - lastTextureChange > 10000) {
    console.log(imgUrl)
    img = loadImage(imgUrl); // Load new texture
    lastTextureChange = millis(); // Update last texture change time

  }

  // Update position based on speed
  x += xspeed;
  y += yspeed;

  // Check for canvas boundaries and reverse speed if hitting an edge
  if (x > width / 2 - boxSize / 2 || x < -width / 2 + boxSize / 2) xspeed *= -1;
  if (y > height / 2 - boxSize / 2 || y < -height / 2 + boxSize / 2) yspeed *= -1;

  // Move to current position
  translate(x, y);

  // Apply rotation
  rotateX(angle);
  rotateY(angle * 0.4);
  rotateZ(angle * 0.1);

  // Increment angle for continuous rotation
  angle += 0.05;

  // Apply texture and draw cube
  texture(img);
  box(boxSize); // Draw the cube
}

// Adjust canvas size when the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
