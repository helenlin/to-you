let pages = [];
let images = [];
let buffer = 100; // padding for generated images

let inventoryCount = 12;
let nowDisplaying = false;

function preload() {
  
  
}

function setup() {
  createCanvas(windowWidth-50, windowHeight -300);
  //noCanvas(); 
  let element = select("#numHeader");
  for (let i = 1; i <= inventoryCount; i++) {
    let b = createButton(i.toString());
    b.id("button-" + i);
    element.child(b);
    b.mousePressed(loadImages);
    pages.push(new Item(
      i,
      "/assets/photofront/item" + i + ".png",
      "/assets/photoback/item" + i + ".png",
      "/assets/letters/letter_" + i + ".jpg",
      b)
    );
  }


}

function draw() {

  background(255);

  if (images.length > 2) {
    let img; 

    blendMode(BLEND);
    tint(255, 255);
    // draw front image
    img = images[0];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/5, img[0].height/5);

    blendMode(BLEND);
    tint(255, 127);
    // draw back image
    img = images[1];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/5, img[0].height/5);
    

    tint(255, 255);
    blendMode(MULTIPLY);
    // draw letter image
    img = images[2];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/5, img[0].height/5);
    tint(255, 255);
    blendMode(BLEND);
  }
}

class Item {
  constructor(i, f, b, l, btn) {
    this.id = i;
    this.front = f; 
    this.back = b; 
    this.letter = l; 
    this.button = btn;
  }

  letter() {
    return this.letter;
  }
}

function loadImages(event) {
  releaseImages(); 

  //console.log(event.target);
  let element = event.target;
  //console.log(element.id); // returns id of button
  let number = int(element.id.substring(7));
  console.log(number);
  //console.log(pages[number-1]);
  let item = pages[number-1];

  // add images to render
  images.push([loadImage(item.front),
    random(0, width - buffer), 
    random(0, height - buffer)]
  );
  images.push([loadImage(item.back),
    random(0, width - buffer), 
    random(0, height - buffer)]
  );
  images.push([loadImage(item.letter),
    random(0, width - buffer), 
    random(0, height - buffer)]
  );
}

function releaseImages() {
  let len = images.length;
  for (let i = 0; i < len; i++) images.pop(); 
}

function windowResized() {
  resizeCanvas(windowWidth-50, windowHeight - 300);
}