//hide all popups when clicking, make set popup function

let backgroundOneImg, swedishFlagImg, eyeGlassesImg, fossilsOneImg,
	downArrowImg, leftArrowImg, upArrowImg, rightArrowImg, tree, floorOne, pageOne, pageTwo, numberLockLock, pageTwoCont;
//you can add your other images here
function preload() {
	backgroundOneImg = loadImage('imgs/wallOnefin.jpg');
	swedishFlagImg = loadImage('imgs/swedishflag.jpg');
	eyeGlassesImg = loadImage('imgs/eyeGlasses.jpg');
	fossilsOneImg = loadImage('imgs/fossilsOne.jpg');
	downArrowImg = loadImage('imgs/downArrow.jpg');
	leftArrowImg = loadImage('imgs/leftArrow.jpg');
	upArrowImg = loadImage('imgs/upArrow.jpg');
	rightArrowImg = loadImage('imgs/rightArrow.jpg');
	treeImg = loadImage('imgs/tree.jpg')
	floorOneImg = loadImage('imgs/floorOneB.jpg')
	pageOneImg = loadImage('imgs/swedishPageone.jpg')
	pageTwoImg = loadImage('imgs/secondPage.jpg')
	numberLockImg = loadImage('imgs/numberLocks.jpg')
	pageTwoContImg = loadImage('imgs/swedishPageTwonew.jpg')
}

let canSee = false;
let currentWall;
function setup() {
	createCanvas(windowWidth, windowHeight);
	// initialize coordWidthScaleFactor constant (needed in popup constructor)
	coordWidthScaleFactor = coordinateWidth / width;

	const swedishFlag = new Region(swedishFlagImg, 800, 83, 110, null, true, (region) => {
		statusText = "Sex!?";
		region.hide();
	});
	const eyeGlasses = new Region(eyeGlassesImg, 879, 438, 50, null, false, (region) => {
		statusText = "*You put on the glasses*";
		canSee = true;
		region.hide();
	//	startingWall.setConnectedWalls({left: treeWall});
	});
	const eyeTest = new Region(null, 281, 272, 95, 135, true, (region) => {
		statusText = "It sounds like a sheet of paper, but I guess you're referring to what's on the sheet of paper.";
	//	currentWall.setPopup(fossilsOne);
	});
	const blanket = new Region(null, 732, 433, 196, 88, true, (region) => {
		region.hide(); // this stops the region from being magnified on hover
		eyeGlasses.show();
		statusText = "Jinkies!";
	});
	const fossilsOne = new Popup(fossilsOneImg);
	//for each wall, need to put the image, regions, and popups
	let startingWall = new Wall(
		backgroundOneImg, // image
		[swedishFlag, eyeGlasses, eyeTest, blanket, fossilsOne], // regions
		[fossilsOne], // popups
	);
	let treeWall = new Wall(
		treeImg, 
		[],
		[]
	);
	const swedishBook = new Region(null, 350, 235, 80, 75, true, (region) => {
		if (canSee){
			statusText = "The language of the Swedish Chef";
			floorWall.setPopup(pageOne);
		} else {
			statusText = "There is a page here, but it is too blury to read"; 
		}
	});
	const swedishSecondPage = new Region(pageTwoImg, 190, 289, 60, 70, true, (region) => {
		if (canSee){
			statusText = "Did Greta Thunberg write this?";
			floorWall.setPopup(pageTwo);
		} else {
			statusText = "What are these squiggles?"; 
		}
	});
	const numberLock = new Region(null, 470, 315, 156, 85, true, (region) => {
		if (canSee){
			statusText = "What could be the combination?";
			floorWall.setPopup(numberLockLock);
			setTimeout(function() {
				let numbers = prompt("Enter the Combination", "x/x/x"); 		
				switch(numbers){
					case "8/5/6":
						statusText = "The lock unlocks!";
						startingWall.setConnectedWalls({left: treeWall});
						break;
					case "no":
						statusText = "Nothing happens... wrong combination";
						break;
				}
			}, 1250);
		} else {
			statusText = "Your foot is chained up!"; 
		}	
	});
	const pageOne = new Popup(pageOneImg);
	const pageTwo = new Popup(pageTwoContImg);
	const numberLockLock = new Popup(numberLockImg);

	floorWall = new Wall(
		floorOneImg,
		[swedishBook, numberLock, swedishSecondPage], 
		[pageOne, pageTwo],
	);

	startingWall.setConnectedWalls({down: floorWall})
	treeWall.setConnectedWalls({right: startingWall})
	floorWall.setConnectedWalls({up: startingWall})

//above- for every wall need to set the connected wall.


	currentWall = startingWall
}


const coordinateWidth = 1000;
const coordinateHeight = 2115*1000/3899; // about 542.44

let coordWidthScaleFactor;
let coordHeightScaleFactor;
let imageWidthScaleFactor;
let backgroundHeightScaleFactor;

let statusText = "You are trapped in a strange room. You will have to figure out how to get out.";
let currentPopup = null;

// popup scrolling from https://gist.github.com/companje/5478fff07a18a1f4806df4cf77ae1048
const zoom = .005; // zoom step per mouse tick 

function draw() {
	background(255, 255, 255);
	currentWall.draw()

	const backgroundHeight = currentWall.height;

	coordWidthScaleFactor = coordinateWidth / width;
	coordHeightScaleFactor = coordinateHeight / backgroundHeight;

	imageWidthScaleFactor = width / currentWall.image.width;
	backgroundHeightScaleFactor = backgroundHeight / currentWall.image.height;

	for (const region of currentWall.regions) {
		if (region.visible) {
			region.draw();
		}
	}

	if (currentWall.currentPopup != null) {
		currentWall.currentPopup.draw();
	}

	textSize(backgroundHeight / 30);
	textAlign(CENTER, TOP);
	text(statusText, width / 2, backgroundHeight + 10)

	// For debugging
	const coordinates = Math.round(getMouseX()) + ", " + Math.round(getMouseY());
	textSize(20);
	textAlign(LEFT, TOP);
	text(coordinates, 10, backgroundHeight + 10)
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
	if (currentWall && currentWall.currentPopup == null) {
		const x = getMouseX();
		const y = getMouseY();
		for (const region of currentWall.regions) {
			if (region.isWithin(x, y) && region.visible) {
				region.mouseOver = true;
			} else {
				region.mouseOver = false;
			}
		}
	}
}

function mousePressed() {
	const x = getMouseX();
	const y = getMouseY();
	if (currentWall.currentPopup == null) {

		let foundRegion = false;
		for (const region of currentWall.regions) {
			if (region.isWithin(x, y) && region.visible && region.clickCallback) {
				region.clickCallback(region);
				foundRegion = true;
			}
		}

		if (!foundRegion) {
			statusText = "";
		}
	} else {
		if (!currentWall.currentPopup.isWithin(x, y)) {
			currentWall.setPopup(null);
		}
	}
}

function mouseDragged() {
	if (currentWall.currentPopup) {
		currentWall.currentPopup.tox += getMouseX() - pmouseX * coordWidthScaleFactor;
		currentWall.currentPopup.toy += getMouseY() - pmouseY * coordHeightScaleFactor;

		currentWall.currentPopup.tox = Math.min(currentWall.currentPopup.tox, coordinateWidth - currentWall.currentPopup.width * 0.3);
		currentWall.currentPopup.toy = Math.min(currentWall.currentPopup.toy, coordinateHeight - currentWall.currentPopup.height * 0.3);
		currentWall.currentPopup.tox = Math.max(currentWall.currentPopup.tox, currentWall.currentPopup.width * -0.7);
		currentWall.currentPopup.toy = Math.max(currentWall.currentPopup.toy, currentWall.currentPopup.height * -0.7);
	}
}

function mouseWheel(event) {
	if (currentWall.currentPopup) {
	  const e = -event.delta;

	  if (e > 0) { // zoom in
	  	// if (currentWall.currentPopup.tow > width * 4) return; // min zoom
	    for (let i = 0; i < e; i++) {
	      if (currentWall.currentPopup.tow > width * 4) return; // max zoom
	      currentWall.currentPopup.tox -= zoom * (getMouseX() - currentWall.currentPopup.tox);
	      currentWall.currentPopup.toy -= zoom * (getMouseY() - currentWall.currentPopup.toy);
	      currentWall.currentPopup.tow *= zoom + 1;
	      currentWall.currentPopup.toh *= zoom + 1;
	    }
	  } 
	  
	  if (e < 0) { // zoom out
	    for (let i = 0; i < -e; i++) {
	      if (currentWall.currentPopup.tow < width / 8) return; // min zoom
	      currentWall.currentPopup.tox += zoom / (zoom + 1) * (getMouseX() - currentWall.currentPopup.tox); 
	      currentWall.currentPopup.toy += zoom / (zoom + 1) * (getMouseY() - currentWall.currentPopup.toy);
	      currentWall.currentPopup.toh /= zoom + 1;
	      currentWall.currentPopup.tow /= zoom + 1;
	    }
	  }

	  const minWidth = Math.min(currentWall.currentPopup.width * 0.3, width / 2);
	  const minHeight = Math.min(currentWall.currentPopup.height * 0.3, height / 2)
		currentWall.currentPopup.tox = Math.min(currentWall.currentPopup.tox, coordinateWidth - minWidth);
		currentWall.currentPopup.toy = Math.min(currentWall.currentPopup.toy, coordinateHeight - minHeight);
		currentWall.currentPopup.tox = Math.max(currentWall.currentPopup.tox, currentWall.currentPopup.width * -0.7);
		currentWall.currentPopup.toy = Math.max(currentWall.currentPopup.toy, currentWall.currentPopup.height * -0.7);
	}
}

class Wall {
	constructor(image, regions, popups) {
		this.image = image;
		this.regions = regions;
		this.popups = popups;
		this.connectedWalls = {left: null, right: null, up: null, down: null}
	}

	draw() {
		const scaleFactor = width / this.image.width;
		this.height = this.image.height * scaleFactor;
		image(this.image, 0, 0, width, this.height);	
	}

	setPopup(newPopup) {
		this.currentPopup = newPopup;
		for (const popup of this.popups) {
			if (popup != newPopup) {
				popup.hide();
			}
		}
	}

	setConnectedWalls(walls) {
		if (walls.left) {
			const leftArrow = new Region(leftArrowImg, 15, 252, 50, 40, true, (region) => {
				currentWall = this.connectedWalls.left;
			});
			this.regions.push(leftArrow);
			this.connectedWalls.left = walls.left;
		}
		if (walls.right) {
			const rightArrow = new Region(rightArrowImg, 915, 252, 50, 40, true, (region) => {
				currentWall = this.connectedWalls.right;
			});
			this.regions.push(rightArrow);
			this.connectedWalls.right = walls.right;
		}
		if (walls.up) {
			const upArrow = new Region(upArrowImg, 440, 10, 45, null, true, (region) => {
				currentWall = this.connectedWalls.up;
			});
			this.regions.push(upArrow);
			this.connectedWalls.up = walls.up;
		}
		if (walls.down) {
			const downArrow = new Region(downArrowImg, 440, 470, 45, null, true, (region) => {
				currentWall = this.connectedWalls.down;
			});
			this.regions.push(downArrow);
			this.connectedWalls.down = walls.down;
		}
	}
}

class Region {
	// x, y are the coordinates of top-left corner
	// Note: x, y, width, height are in terms of the grid
	constructor(image, x, y, width, height, visible, clickCallback) {
		this.image = image;
		this.x = x;
		this.y = y;
		if (width && height) {
			this.width = width;
			this.height = height;
		} else if (width) {
			this.width = width;
			this.height = width * (this.image.height / this.image.width);
		} else if (height) {
			this.height = height;
			this.width = height * (this.image.width / this.image.height);
		}

		this.visible = visible;
		this.clickCallback = clickCallback;

		this.mouseOver = false;
	}

	draw() {
		if (this.mouseOver) {
			// when hovering over region
			const magnifyFactor = 1.1;
			const actualRegionWidth = this.width * magnifyFactor / coordWidthScaleFactor;
			const actualRegionHeight = this.height * magnifyFactor / coordHeightScaleFactor;
			const actualX = this.x / coordWidthScaleFactor;
			const actualY = this.y / coordHeightScaleFactor;
			const actualXMagnified = actualX - (actualRegionWidth * (magnifyFactor - 1) / 2);
			const actualYMagnified = actualY - (actualRegionHeight * (magnifyFactor - 1) / 2);
			if (this.image != null) {
				// magnify the region's image
				image(this.image, actualXMagnified, actualYMagnified, actualRegionWidth, actualRegionHeight);
			} else {
				// magnify a region from the background image
				const sourceX = actualX / imageWidthScaleFactor;
				const sourceY = actualY / backgroundHeightScaleFactor;
				const sourceWidth = this.width / coordWidthScaleFactor / imageWidthScaleFactor;
				const sourceHeight = this.height / coordHeightScaleFactor / backgroundHeightScaleFactor;
				image(currentWall.image, actualXMagnified, actualYMagnified, actualRegionWidth, actualRegionHeight, sourceX, sourceY, sourceWidth, sourceHeight);
			}
		} else {
			if (this.image != null) {
				// when not hovering over region
				const actualRegionWidth = this.width / coordWidthScaleFactor;
				const actualRegionHeight = this.height / coordHeightScaleFactor;
				image(this.image, this.x / coordWidthScaleFactor, this.y / coordHeightScaleFactor, actualRegionWidth, actualRegionHeight);
			}
		}
	}

	isWithin(x, y) {
		return x >= this.x && x <= this.x + this.width &&
				   y >= this.y && y <= this.y + this.height;
	}

	show() {
		this.visible = true;
	}

	hide() {
		this.visible = false;
	}

}

class Popup extends Region {
	constructor(image) {
		super(image, 0, 0, null, coordinateHeight, false);
		this.x = ((width * coordWidthScaleFactor) - this.width) / 2;

		this.tow = this.width;
		this.toh = this.height;
		this.tox = this.x;
		this.toy = this.y;
	}

	draw() {
	  this.x = lerp(this.x, this.tox, .1);
	  this.y = lerp(this.y, this.toy, .1);
	  this.width = lerp(this.width, this.tow, .1); 
	  this.height = lerp(this.height, this.toh, .1);

		const w = this.width / coordWidthScaleFactor; // actualRegionWidth
		const h = this.height / coordHeightScaleFactor; // actualRegionHeight
		const x = this.x / coordWidthScaleFactor;
		const y = this.y / coordHeightScaleFactor;
		image(this.image, x, y, w, h);
	}
}

function getMouseX() {
	// gets mouse x coordinate in terms of grid
	return mouseX * coordWidthScaleFactor;
}

function getMouseY() {
	// gets mouse y coordinate in terms of grid
	return mouseY * coordHeightScaleFactor;
}
