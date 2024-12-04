let pages = []; // holds all items 
                // item: {id, front, back, letter, btn}
let images = []; // holds actively displayed imgs
let buffer = 100; // padding for generated imgs

let inventoryCount = 44; // total items
let nowDisplaying = false;
let currentPage = 0; 
let cnv;

function preload() {
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight -350);
  //noCanvas(); 

  // generate an item up to inventoryCount
  let element = select("#numHeader");
  for (let i = 1; i <= inventoryCount; i++) {
    let b = createButton(i.toString());
    b.id("button-" + i);
    element.child(b);
    b.mousePressed(loadImages);
    pages.push(new Item(
      i,

      /*
      // FOR LOADING IN GITHUB
      "/to-you/assets/photofront/item" + i + ".png",
      "/to-you/assets/photoback/item" + i + ".png",
      "/to-you/assets/letters/letter_" + i + ".jpg",
      */
      
      // FOR LOADING IN LOCAL
      "/assets/photofront/item" + i + ".png",
      "/assets/photoback/item" + i + ".png",
      "/assets/letters/letter_" + i + ".jpg",
      


      b)

    );
  }


}

function draw() {

  background("#f7f7f7");

  if (images.length > 2) {
    let img;

    blendMode(BLEND);
    tint(255, 255);
    // draw front image
    img = images[0];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/img[3], img[0].height/img[3]);

    blendMode(BLEND);
    tint(255, 127);
    // draw back image
    img = images[1];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/img[3], img[0].height/img[3]);

    tint(255, 255);
    blendMode(MULTIPLY);
    // draw letter image
    img = images[2];
    image(img[0], // image source
      img[1], img[2], // image position
      img[0].width/img[3], img[0].height/img[3]);
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
}

function doubleClicked(){
  let x = mouseX, y = mouseY; 

  // OPEN LINK FOR FRONT IMG WHEN DOUBLE CLICKED
  img = images[0];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
       {
        window.open(pages[currentPage-1].front); 
       }

  // OPEN LINK FOR BACK IMG WHEN DOUBLE CLICKED
  img = images[1];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
       {
        window.open(pages[currentPage-1].back); 
       }

  // OPEN LINK FOR LETTER WHEN DOUBLE CLICKED
  img = images[2];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
      {
        window.open(pages[currentPage-1].letter); 
      }
}

function loadImages(event) {
  releaseImages(); 

  //console.log(event.target);
  let element = event.target;
  //console.log(element.id); // returns id of button
  currentPage = int(element.id.substring(7));
  console.log(currentPage);
  //console.log(pages[currentPage-1]);
  let item = pages[currentPage-1];

  // add images to render
  images.push([loadImage(item.front),
    random(0 - buffer, width - buffer), 
    random(0 - buffer, height - buffer),
    randResizeVar()]
  );
  images.push([loadImage(item.back),
    random(0 - buffer, width - buffer), 
    random(0 - buffer, height - buffer),
    randResizeVar()]
  );
  images.push([loadImage(item.letter),
    random(0 - buffer, width - buffer), 
    random(0 - buffer, height - buffer), 
    randResizeVar()]
  );
}

function releaseImages() {
  let len = images.length;
  for (let i = 0; i < len; i++) images.pop(); 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 350);
}

function randResizeVar() {
  return random(1, 5); 
}