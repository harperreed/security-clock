let img1, newImg1, img2, newImg2; // Textures for spheres
let loadingNewImage1 = false, loadingNewImage2 = false; // Flags for loading textures
let x1 = 0, y1 = 0, x2 = 800, y2 = 800; // Initial positions
let xspeed1 = 2, yspeed1 = 2, xspeed2 = -2, yspeed2 = -2; // Initial speeds
let angle1 = 0, angle2 = 0; // Rotation angles
let sphereSize = 400; // Size of the spheres
let lastTextureChange1 = 0, lastTextureChange2 = 0; // Last texture change times
let imgUrl1 = '/proxy?url=http://192.168.120.54:11080/endpoint/@scrypted/webhook/public/54/d91ea50c4766676f/takePicture';
let imgUrl2 = '/proxy?url=http://192.168.120.54:11080/endpoint/@scrypted/webhook/public/53/3002be7ece2db4bc/takePicture'; // Use a different URL for a different texture

function preload() {
  img1 = loadImage(imgUrl1); // Load initial texture for sphere 1
  img2 = loadImage(imgUrl2); // Load initial texture for sphere 2
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke(); // Apply globally to avoid drawing outlines around shapes
}

function draw() {
  background(0); // Clear background

  // Load new texture for sphere 1 every 10 seconds
  if (millis() - lastTextureChange1 > 10000 && !loadingNewImage1) {
    loadingNewImage1 = true;
    loadImage(imgUrl1, (loadedImg) => {
      newImg1 = loadedImg;
      loadingNewImage1 = false;
    });
  }

  // Load new texture for sphere 2 every 10 seconds
  if (millis() - lastTextureChange2 > 10000 && !loadingNewImage2) {
    loadingNewImage2 = true;
    loadImage(imgUrl2, (loadedImg) => {
      newImg2 = loadedImg;
      loadingNewImage2 = false;
    });
  }

  // Swap textures if new ones are loaded
  if (newImg1 && !loadingNewImage1) {
    img1 = newImg1;
    newImg1 = null;
    lastTextureChange1 = millis();
  }
  if (newImg2 && !loadingNewImage2) {
    img2 = newImg2;
    newImg2 = null;
    lastTextureChange2 = millis();
  }

  // Update positions based on speed
  x1 += xspeed1;
  y1 += yspeed1;
  x2 += xspeed2;
  y2 += yspeed2;

  // Boundary collision for sphere 1
  if (x1 > width / 2 - sphereSize / 2 || x1 < -width / 2 + sphereSize / 2) xspeed1 *= -1;
  if (y1 > height / 2 - sphereSize / 2 || y1 < -height / 2 + sphereSize / 2) yspeed1 *= -1;

  // Boundary collision for sphere 2
  if (x2 > width / 2 - sphereSize / 2 || x2 < -width / 2 + sphereSize / 2) xspeed2 *= -1;
  if (y2 > height / 2 - sphereSize / 2 || y2 < -height / 2 + sphereSize / 2) yspeed2 *= -1;
  // Sphere collision detection and response
  let d = dist(x1, y1, x2, y2);
  if (d < sphereSize * 2) {
    // Simple collision response: reverse speeds
    xspeed1 *= -1;
    yspeed1 *= -1;
    xspeed2 *= -1;
    yspeed2 *= -1;
  }

  // Draw sphere 1
  push(); // Start a new drawing state
  translate(x1, y1);
  rotateX(angle1);
  rotateY(angle1 * 0.4);
  rotateZ(angle1 * 0.1);
  angle1 += 0.005;
  texture(img1);
    sphere(sphereSize);
    pop(); // Restore original state

    // Draw sphere 2
    push(); // Start a new drawing state
    translate(x2, y2);
    rotateX(angle2);
    rotateY(angle2 * 0.4);
    rotateZ(angle2 * 0.1);
    angle2 += 0.005;
    texture(img2);
    sphere(sphereSize);
    pop(); // Restore original state
  }

  // Adjust canvas size when the window is resized
  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
