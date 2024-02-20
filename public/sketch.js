let img; // Variable to store the image

function preload() {
  // Load your image - replace 'image.jpg' with the path to your image file
  let imgUrl = '/proxy?url=http://192.168.120.54:11080/endpoint/@scrypted/webhook/public/54/d91ea50c4766676f/takePicture'

  img = loadImage(imgUrl, img => console.log('Image loaded'), err => console.error('Error loading image:', err));
}

function setup() {
  // Create canvas to fill the window and resize with it
  createCanvas(windowWidth, windowHeight);
  noLoop(); // Prevent draw() from looping
}

function draw() {
  // background(0); // Set background color
  clear()

  // Calculate the best fit size while maintaining aspect ratio
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;
  let renderWidth, renderHeight;

  if (imgAspect > canvasAspect) {
    // Image is wider than canvas
    renderWidth = width;
    renderHeight = width / imgAspect;
  } else {
    // Image is taller than canvas
    renderWidth = height * imgAspect;
    renderHeight = height;
  }

  // Center the image
  let x = (width - renderWidth) / 2;
  let y = (height - renderHeight) / 2;

  // Apply glitch effect with adjusted dimensions
  for (let i = 0; i < renderHeight; i += int(random(5, 20))) {
    let sx = 0;
    let sy = (i / renderHeight) * img.height;
    let sw = img.width;
    let sh = int(random(5, 20)) / renderHeight * img.height;
    let dx = int(random(-50, 50)) + x;
    let dy = i + y;
    let dw = renderWidth;
    let dh = int(random(5, 20));

    image(img, dx, dy, dw, dh, sx, sy, sw, sh);
  }
  displayTime();
}

function displayTime() {
  let now = new Date(); // Get current time
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  // Format the time as HH:MM:SS
  let timeStr = nf(hours, 2) + ':' + nf(minutes, 2) ;

  // Text background
  fill(0, 0, 0, 77); // Semi-transparent black background (30% opacity)
  let padding = 10; // Padding around the text for the background rectangle
  let textWidth2 = textWidth(timeStr) + padding * 2; // Calculate the width of the text + padding
  let textHeight = textSize() + padding; // Calculate the height based on text size + padding
  rect(0, height - textHeight, textWidth2, textHeight); // Draw the rectangle at the lower left

  // Text properties
  fill(255); // White text color
  noStroke();
  textSize(180); // Adjust as needed
  textAlign(LEFT, BOTTOM); // Align text to the bottom left

  // Position the text over the background rectangle
  text(timeStr, padding, height - padding); // Adjust positioning as needed
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  draw(); // Redraw the image when the window is resized
}
