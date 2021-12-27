//hide all popups when clicking, make set popup function

let backgroundOneImg, swedishFlagImg, eyeGlassesImg, fossilsOneImg;
//you can add your other images here
function preload() {
	backgroundOneImg = loadImage('imgs/wallOnefin.jpg');
	swedishFlagImg = loadImage('imgs/swedishflag.jpg');
	eyeGlassesImg = loadImage('imgs/eyeGlasses.jpg');
	fossilsOneImg = loadImage('imgs/fossilsOne.jpg');
}

let regions = [];
let popups = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	const swedishFlag = new Region(swedishFlagImg, 800, 83, 110, null, true, (region) => {
		statusText = "sweden is bae";
		region.hide();
	});
	const eyeGlasses = new Region(eyeGlassesImg, 879, 438, 50, null, false, (region) => {
		statusText = "jinkies";
	});
	const eyeTest = new Region(null, 281, 272, 95, 135, true, (region) => {
		statusText = "20/20 vision";
		setPopup(fossilsOne);
	});
	const blanket = new Region(null, 732, 433, 196, 88, true, (region) => {
		region.hide(); // this stops the region from being magnified on hover
		eyeGlasses.show();
		statusText = "You found some glasses";
	});
	const fossilsOne = new Popup(fossilsOneImg);

	regions = [swedishFlag, eyeGlasses, eyeTest, blanket, fossilsOne];
	popups = [fossilsOne];
}

const coordinateWidth = 1000;
const coordinateHeight = 2115*1000/3899; // about 542.44

let coordWidthScaleFactor;
let coordHeightScaleFactor;
let imageWidthScaleFactor;
let backgroundHeightScaleFactor;

let statusText = "";
let currentPopup = null;

function draw() {
	background(255, 255, 255);
	const scaleFactor = width / backgroundOneImg.width;
	const backgroundHeight = backgroundOneImg.height * scaleFactor;
	image(backgroundOneImg, 0, 0, width, backgroundHeight);

	coordWidthScaleFactor = coordinateWidth / width;
	coordHeightScaleFactor = coordinateHeight / backgroundHeight;

	imageWidthScaleFactor = width / backgroundOneImg.width;
	backgroundHeightScaleFactor = backgroundHeight / backgroundOneImg.height;

	for (const region of regions) {
		if (region.visible) {
			region.draw();
		}
	}

	if (currentPopup != null) {
		currentPopup.draw();
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
	if (currentPopup == null) {
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
}

function mousePressed() {
	if (currentPopup == null) {
		const x = getMouseX();
		const y = getMouseY();

		let foundRegion = false;
		for (const region of regions) {
			if (region.isWithin(x, y) && region.clickCallback) {
				region.clickCallback(region);
				foundRegion = true;
			}
		}

		if (!foundRegion) {
			statusText = "";
		}
	} else {
		setPopup(null);
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
				image(backgroundOneImg, actualXMagnified, actualYMagnified, actualRegionWidth, actualRegionHeight, sourceX, sourceY, sourceWidth, sourceHeight);
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
				   y >= this.y && y <= this.y + this.height && this.visible;
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
	}

	draw() {
		this.x = ((width * coordWidthScaleFactor) - this.width) / 2;

		const actualRegionWidth = this.width / coordWidthScaleFactor;
		const actualRegionHeight = this.height / coordHeightScaleFactor;
		image(this.image, this.x / coordWidthScaleFactor, this.y / coordHeightScaleFactor, actualRegionWidth, actualRegionHeight);
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

function setPopup(newPopup) {
	currentPopup = newPopup;
	for (const popup of popups) {
		if (popup != newPopup) {
			popup.hide();
		}
	}
}