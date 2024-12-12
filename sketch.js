let pages = []; // holds all items 
                // item: {id, front, back, letter, btn}
let images = []; // holds actively displayed imgs
let buffer = 100; // padding for generated imgs

let inventoryCount = 44; // total items
let nowDisplaying = false;
let currentPage = 0; 
let cnv;
let threeDCnv; // threeDCnv.stroke(); threeDCnv.image(); 
let modalHolder; 

let quotes = [
  '\“we touch things to assure ourselves of reality. we touch the objects of our love. we touch the things we form. our tactile experiences are elemental.\” – anni albers',
  '\“Every day, we interact with machines that are hard, with devices driven by abstract electrical and computational processes. They are produced in faraway places by unknown people, then sent to our doorstep in excessive packaging\” - lisa stark',
  '\"Memory itself is a kind of map, linked to textures, smells, songs, places, the act of remembering in and of itself a kind of haunting.\" - vanessa angélica aillarreal'
  ];
let currentQuote = 0;
let quoteHolder; 

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

      
      // FOR LOADING IN GITHUB
      "/to-you/assets/photofront/item" + i + ".png",
      "/to-you/assets/photoback/item" + i + ".png",
      "/to-you/assets/letters/letter_" + i + ".jpg",
      
      /*
      // FOR LOADING IN LOCAL
      "/assets/photofront/item" + i + ".png",
      "/assets/photoback/item" + i + ".png",
      "/assets/letters/letter_" + i + ".jpg",
      */


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

// Event for every time image is double clicked
function doubleClicked(){
  let x = mouseX, y = mouseY; 

  // OPEN LINK FOR FRONT IMG WHEN DOUBLE CLICKED
  img = images[0];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
       {
        let elem = document.getElementById("modal1"); 
        let openImage = document.createElement("img");
        openImage.setAttribute("src", pages[currentPage-1].front);
        openImage.setAttribute("height", img[0].height);
        openImage.setAttribute("width", img[0].width);
        openImage.setAttribute("alt", "Front of item " + currentPage);
        
        if (modalHolder != null) {
          elem.removeChild(modalHolder);
        }
        elem.appendChild(openImage);
        modalHolder = openImage;
        loadModal(); 
       }

  // OPEN LINK FOR BACK IMG WHEN DOUBLE CLICKED
  img = images[1];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
       {
        let elem = document.getElementById("modal1"); 
        let openImage = document.createElement("img");
        openImage.setAttribute("src", pages[currentPage-1].back);
        openImage.setAttribute("height", img[0].height);
        openImage.setAttribute("width", img[0].width);
        openImage.setAttribute("alt", "Back of item " + currentPage);
        
        if (modalHolder != null) {
          elem.removeChild(modalHolder);
        }
        elem.appendChild(openImage);
        modalHolder = openImage;
        loadModal(); 
       }

  // OPEN LINK FOR LETTER WHEN DOUBLE CLICKED
  img = images[2];
  if ((x <= img[1] + img[0].width/img[3]) &&
      (x >= img[1]) &&
      (y <= img[2] + img[0].height/img[3]) &&
      (y >= img[2]))
      {
        let elem = document.getElementById("modal1"); 
        let openImage = document.createElement("img");
        openImage.setAttribute("src", pages[currentPage-1].letter);
        openImage.setAttribute("height", img[0].height);
        openImage.setAttribute("width", img[0].width);
        openImage.setAttribute("alt", "Letter of item" + currentPage);
        
        if (modalHolder != null) {
          elem.removeChild(modalHolder);
        }
        elem.appendChild(openImage);
        modalHolder = openImage;
        loadModal(); 
      }
}

function loadModal() {
  let elem = document.getElementById("modal1"); 
  var instance = M.Modal.getInstance(elem);
  instance.open();
}

// Event for every time button is clicked
function loadImages(event) {
  // render quote
  console.log(loadCurrentQuote());

  // clear prev images
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

function loadCurrentQuote() {
  let q = quotes[currentQuote++];
  if (currentQuote >= quotes.length) currentQuote = 0;
  return q;
}