let backgroundOneImg, swedishFlagImg, eyeGlassesImg;
//you can add your other images here
function preload() {
	backgroundOneImg = loadImage('imgs/wallOnefin.jpg');
	swedishFlagImg = loadImage('imgs/swedishflag.jpg');
	eyeGlassesImg = loadImage('imgs/eyeGlasses.jpg');
}

let regions = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	backgroundOneImg.resize(width, 0);
	const swedishFlag = new Region(swedishFlagImg, 800, 83, 110);
	const eyeGlasses = new Region(eyeGlassesImg, 834, 438, 50);

	regions = [swedishFlag, eyeGlasses];
}

const coordinateWidth = 1000;
const coordinateHeight = 2115*1000/3899; // about 542.44
let coordWidthScaleFactor;
let coordHeightScaleFactor;

function draw() {
	const scaleFactor = width / backgroundOneImg.width;
	const imageHeight = backgroundOneImg.height * scaleFactor;
	image(backgroundOneImg, 0, 0, width, imageHeight);

	coordWidthScaleFactor = coordinateWidth / width;
	coordHeightScaleFactor = coordinateHeight / imageHeight;

	for (const region of regions) {
		region.draw();
	}
	// noLoop();
}

// function 

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
	console.log(Math.round(getMouseX()) + ", " + Math.round(getMouseY()));

	const x = getMouseX();
	const y = getMouseY();
	for (const region of regions) {
		if (region.isWithin(x, y)) {
			region.mouseOver = true;
		} else {
			region.mouseOver = false;
		}
	}
}

// function mousePressed() {
// 	const x = getMouseX();
// 	const y = getMouseY();
// 	for (const region of regions) {
		
// 	}
// }

class Region {
	// x, y are the coordinates of top-left corner
	// Note: x, y, and width are in terms of the grid
	constructor(image, x, y, width) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = width * (this.image.height / this.image.width);
		this.mouseOver = false;
	}

	draw() {
		if (this.mouseOver) {
			// when hovering over region
			const magnifyFactor = 1.1;
			const actualRegionWidth = this.width * magnifyFactor / coordWidthScaleFactor;
			const actualRegionHeight = this.height * magnifyFactor / coordHeightScaleFactor;
			let actualX = this.x / coordWidthScaleFactor;
			let actualY = this.y / coordHeightScaleFactor;
			actualX = actualX - (actualRegionWidth * (magnifyFactor - 1) / 2);
			actualY = actualY - (actualRegionHeight * (magnifyFactor - 1) / 2);
			image(this.image, actualX, actualY, actualRegionWidth, actualRegionHeight);
		} else {
			// when not hovering over region
			const actualRegionWidth = this.width / coordWidthScaleFactor;
			const actualRegionHeight = this.height / coordHeightScaleFactor;
			image(this.image, this.x / coordWidthScaleFactor, this.y / coordHeightScaleFactor, actualRegionWidth, actualRegionHeight);
		}
	}

	isWithin(x, y) {
		return x >= this.x && x <= this.x + this.width &&
				   y >= this.y && y <= this.y + this.height;
	}
}

function getMouseX() {
	return mouseX * coordWidthScaleFactor;
}

function getMouseY() {
	return mouseY * coordHeightScaleFactor;
}