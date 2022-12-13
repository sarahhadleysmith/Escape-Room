//hide all popups when clicking, make set popup function

let backgroundOneImg, swedishFlagImg, eyeGlassesImg, fossilsOneImg,
	downArrowImg, leftArrowImg, upArrowImg, rightArrowImg, tree, floorOne, pageOne, pageTwo, numberLockLock, pageTwoCont, boarImg, pImg, infoImg, boarMemeImg, info2Img, floorTwoImg, wikiImg, swedishLetterImg, mineralSheet, boarPaintImg, thirdWallImg, wallFourImg, andesiteImg, dioriteImg, basaltImg, calciteImg, calciteCompImg, helpTwoImg, helpThreeImg, floorThreeImg, wheelImg, mineralPaperImg, mineralPaperPaperImg, wallFiveImg, exitDoorImg, quartzRoomImg, floorFourImg, colorLockImg, exitImg, blackScreenImg; //put commas in between the these 
//you can add your other images here
function preload() {
	backgroundOneImg = loadImage('imgs/wallOnefin.jpg');
	swedishFlagImg = loadImage('imgs/swedishFlag.jpg');
	eyeGlassesImg = loadImage('imgs/eyeGlasses.jpg');
	fossilsOneImg = loadImage('imgs/fossilsOne.jpg');
	downArrowImg = loadImage('imgs/downArrow.jpg');
	leftArrowImg = loadImage('imgs/leftArrow.jpg');
	upArrowImg = loadImage('imgs/upArrow.jpg');
	rightArrowImg = loadImage('imgs/rightArrow.jpg');
	treeImg = loadImage('imgs/wallTwoGalena.jpg')
	floorOneImg = loadImage('imgs/floorOneB.jpg')
	pageOneImg = loadImage('imgs/swedishPageone.jpg')
	pageTwoImg = loadImage('imgs/secondPage.jpg')
	numberLockImg = loadImage('imgs/numberLocks.jpg')
	pageTwoContImg = loadImage('imgs/newSwedish.jpg')
	boarImg = loadImage('imgs/boarPainting.jpg')
	pImg = loadImage('imgs/rgb.JPG')
//	boarTwoImg = loadImage('imgs/boar.jpg')
//	creeperImg = loadImage('imgs/rgb.jpg')
	infoImg = loadImage('imgs/computerPassword.JPG')
	boarMemeImg = loadImage('imgs/boarMeme2.jpg')
	info2Img = loadImage('imgs/info.JPG')
	floorTwoImg = loadImage('imgs/floorTwoResize.jpg')
	wikiImg = loadImage('imgs/galenaWiki.JPG')
	swedishLetterImg = loadImage('imgs/swedishLetter.JPG')
	mineralSheetImg = loadImage('imgs/mineralPaperPaper.jpg')
	boarPaintImg = loadImage('imgs/boarPaint.jpg')
	thirdWallImg = loadImage('imgs/thirdWall.jpg')
	wallFourImg = loadImage('imgs/wallFour.jpg')
	andesiteImg = loadImage('imgs/Andesite.PNG')
	dioriteImg = loadImage('imgs/Diorite.PNG')
	basaltImg = loadImage('imgs/Basalt.PNG')
	calciteImg = loadImage('imgs/Calcite.PNG')
	calciteCompImg = loadImage('imgs/McCalcite.jpg')
	helpTwoImg = loadImage('imgs/help3.JPG')
	helpThreeImg = loadImage('imgs/helpTwo.JPG')
	floorThreeImg = loadImage('imgs/floorThree.jpg')
	wheelImg = loadImage('imgs/wheel.jpg')
	mineralPaperImg = loadImage('imgs/mineralPaper.jpg')
	mineralPaperPaperImg = loadImage('imgs/mineralSheet.jpg')
	wallFiveImg = loadImage('imgs/WallFiveTwo.jpg')
	exitDoorImg = loadImage('imgs/exitDoor.jpg')
	quartzRoomImg = loadImage('imgs/quartzRoom2.jpg')
	floorFourImg = loadImage('imgs/floorFour3.jpg')
	colorLockImg = loadImage('imgs/colorLock.jpg')
	exitImg = loadImage('imgs/exit.jpg')
	blackScreenImg = loadImage('imgs/blackScreen.jpg')
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
		statusText = "I can't see anything without my glasses!"; 
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
	const boar = new Region(boarImg, 629, 190, 137, 137, true, (region) => {
		statusText = "Is that boar named Galena?";
		region.hide();
	});

	

	const boarMem = new Region(boarMemeImg, 90, 100, 225, 177, true, (region) => {
		statusText = "Boar Vessel 600-500 BC Estruscan Ceramic";
	});

	const boars = new Region(boarPaintImg, 350, 100, 200, 200, true, (region) => {
		statusText = "Why so many boars?";
	});


	/*const creeper = new Region(creeperImg, 600, 120, 212, 212, true, (region) => {
	//	region.hide(); // this stops the region from being magnified on hover
		statusText = "Kristoffer Zetterstrand, RGB, pixels on screen.";
		region.hide();
		treeWall.setPopup(info);
		
	});
	*/
	

	let treeWall = new Wall(
		treeImg, 
		[boar, boarMem, boars],
		[],
	);
	const swedishBook = new Region(null, 350, 235, 80, 75, true, (region) => {
		if (canSee){
			statusText = "The language of the Swedish Chef";
			floorWall.setPopup(pageOne);
		} else {
			statusText = "I've held books before. They don't exactly do it for me."; 
		}
	});
	const swedishSecondPage = new Region(pageTwoImg, 190, 289, 60, 70, true, (region) => {
		if (canSee){
			statusText = "Did Greta Thunberg write this?";
			floorWall.setPopup(pageTwo);
		} else {
			statusText = "It sounds like a sheet of paper, but I guess you're referring to what's on the sheet of paper."; 
		}
	});
	const numberLock = new Region(null, 470, 315, 156, 85, true, (region) => {
		if (canSee){
			statusText = "You can't stand up until you unlock this. What could be the combination?";
			floorWall.setPopup(numberLockLock);
			setTimeout(function() {
				let numbers = prompt("Enter the Combination", "x/x/x"); 		
				switch(numbers){
					case "8/5/6":
						statusText = "The lock unlocks! You can now get up and open the door to your left.";
						startingWall.setConnectedWalls({left: treeWall});
						break;
					case "no": 
						statusText = "yes";
						break;
					default:
						statusText = "Nothing happens... wrong combination";
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


	const galenaWiki = new Region(null, 440, 388, 145, 55, true, (region) => {
		floorTwo.setPopup(wiki);
		statusText = "A wiki page?"; 
	});

	const wiki = new Popup(wikiImg);

	const swedishLetter = new Region(null, 692, 165, 129, 50, true, (region) => {
		floorTwo.setPopup(swedishLetterPop);
		statusText = "If only we knew Swedish"; 
	});

	const mineralPage = new Region(null, 238, 227, 100, 70, true, (region) => {
		floorTwo.setPopup(mineral);
		statusText = "This could be helpful if we suck at identifying minerals."; 
	});

	const swedishLetterPop = new Popup(swedishLetterImg);

	const mineral = new Popup(mineralSheetImg);

	floorTwo = new Wall(
		floorTwoImg, 
		[galenaWiki, swedishLetter, mineralPage],
		[wiki, swedishLetterPop, mineral],
	);


	//keys//
	var drawerKey = false;
	var chestKey = false;
	var exitKey = false; 

	const painting = new Region(pImg, 350, 20, 250, 250, true, (region) => {
		statusText = "This was hidden behind the painting.";
		wallThree.setPopup(newInfo);
	});

	const info2 = new Region(info2Img, 278, 240, 57, 30, true, (region) => {
		statusText = "Kristoffer Zetterstrand, RGB, pixels on screen.";
		wallThree.setPopup(newinfo22);
	});

	const mcPage = new Region(null, 486, 339, 30, 6, true, (region) => {
		statusText = "Someone must have printed this out."; 
		wallThree.setPopup(mineralAnde);
	});

	const dioritePage = new Region(null, 470, 347, 50, 6, true, (region) => {
		statusText = "Someone must have printed this out."; 
		wallThree.setPopup(mineralDiorite);
	});

	const basaltPage = new Region(null, 474, 353, 45, 8, true, (region) => {
		statusText = "Someone must have printed this out."; 
		wallThree.setPopup(mineralBasalt);
	});

	const calcitePage = new Region(null, 474, 361, 55, 7, true, (region) => {
		statusText = "Someone must have printed this out."; 
		wallThree.setPopup(mineralCalcite);
	});

	const numberLockTwo = new Region(null, 669, 252, 156, 97, true, (region) => {
		statusText = "You will have to enter the PIN to unlock the computer and see what is on the screen.";
		setTimeout(function() {
			let letters = prompt("PIN"); 		
				switch(letters){
					case "3834":
						statusText = "Looks like they were playing minecraft.";
						wallThree.setPopup(testPop);
						break;
					default:
						statusText = "Wrong PIN. You know that a PIN is 4 numbers right?"
				}
			}, 1250);
			
	});

	const helpOne = new Region(null, 708, 390, 130, 25, true, (region) => {
		if (drawerKey){
			statusText = "The drawer unlocks! You find a new key in this drawer. You put it in you pocket. ";
			chestKey = true;
		} else {
			statusText = "The top drawer is locked."
		}
		
	});

	const helpTwo = new Region(null, 710, 422, 130, 25, true, (region) => {
		statusText = "Why would someone print out a URL? Was coding a link using JavaScript really that difficult..."; 
		wallThree.setPopup(helpTwoLink);
	});

	const helpThree = new Region(null, 707, 450, 130, 25, true, (region) => {
		statusText = "These websites would be useful if we need help identifying a mineral."; 
		wallThree.setPopup(helpThreeLink);
	});
	

	const newInfo = new Popup(infoImg);

	const newinfo22 = new Popup(info2Img);

	const mineralAnde = new Popup(andesiteImg);

	const mineralDiorite = new Popup(dioriteImg);

	const mineralBasalt = new Popup(basaltImg);

	const mineralCalcite = new Popup(calciteImg);

	const testPop = new Popup(calciteCompImg);

	const helpTwoLink = new Popup(helpTwoImg);

	const helpThreeLink = new Popup(helpThreeImg);


	wallThree = new Wall(
		wallFourImg, 
		[painting, info2, mcPage, dioritePage, basaltPage, calcitePage, numberLockTwo, helpTwo, helpThree, helpOne],
		[newinfo22, newInfo, mineralAnde, mineralDiorite, mineralBasalt, mineralCalcite, helpTwoLink, helpThreeLink],
	);

	const wheelWheel = new Region(null, 442, 220, 165, 90, true, (region) => {
		statusText = "This looks like a puzzle key with a middle wheel that is supposed to spin."; 
		floorThree.setPopup(wheel);
	});

	const mPaper = new Region(mineralPaperImg, 175, 135, 61, 74, true, (region) => {
		statusText = "Looks like a sheet with the chemical formulas of minerals.";
		floorThree.setPopup(mineralPaperPaperp);
	});

	const wheel = new Popup(wheelImg);
	const mineralPaperPaperp = new Popup(mineralPaperPaperImg);

	floorThree = new Wall(
		floorThreeImg, 
		[wheelWheel, mPaper],
		[wheel, mineralPaperPaperp],
	);

	const exitDoor = new Region(exitDoorImg, 570, 111, 250, 431, true, (region) => {
		statusText = "This is the exit!";
		if (exitKey){
			statusText = "You open the door and exit!";
			wallFive.setPopup(end);
			setTimeout(function() {
				prompt("If you email your address to sarsar at sarahhadleysmith@gmail.com, she will mail you a small holiday present.");
			}, 1250);

		} else if (drawerKey && chestKey){
			statusText = "I've got the key to my castle in the air, but whether I can unlock the door remains to be seen." 
		} else if (drawerKey){
			statusText = "The door refuses and resists any key which does not belong to that door!"
		} else {
			statusText = "The exit door is locked! Isn't that a safety hazard."
		}
	});

	const exitSign = new Region(exitImg, 628, 36, 136, 48, true, (region) => { 
		statusText = "Almost out!"
	});

	var redBooks = 0; 

	const book1 = new Region(null, 86, 96, 18, 70, true, (region) => { 
	});

	const book2 = new Region(null, 104, 101, 10, 70, true, (region) => { 
	});

	const book3 = new Region(null, 119, 96, 15, 70, true, (region) => { 
	});

	const book4 = new Region(null, 147, 97, 10, 65, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book5 = new Region(null, 86, 189, 18, 70, true, (region) => { 
	});

	const book6 = new Region(null, 110, 188, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book7 = new Region(null, 131, 188, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book8 = new Region(null, 143, 189, 10, 70, true, (region) => { 
	});

	const book9 = new Region(null, 155, 189, 10, 70, true, (region) => { 
	});

	const book10 = new Region(null, 167, 189, 10, 70, true, (region) => { 
	});

	const book11 = new Region(null, 178, 189, 10, 70, true, (region) => { 
	});

	const book12 = new Region(null, 190, 189, 15, 70, true, (region) => { 
	});

	const book13 = new Region(null, 204, 186, 15, 70, true, (region) => { 
	});

	const book14 = new Region(null, 219, 186, 15, 70, true, (region) => { 
	});

	const book15 = new Region(null, 234, 192, 15, 70, true, (region) => { 
	});

	const book16 = new Region(null, 252, 190, 15, 70, true, (region) => { 
	});

	const book17 = new Region(null, 271, 190, 15, 70, true, (region) => { 
	});

	const book18 = new Region(null, 289, 188, 10, 70, true, (region) => { 
	});

	const book19 = new Region(null, 300, 188, 10, 70, true, (region) => { 
	});

	const book20 = new Region(null, 314, 188, 10, 70, true, (region) => { 
	});

	const book21 = new Region(null, 333, 186, 10, 70, true, (region) => { 
	});

	const book22 = new Region(null, 88, 273, 10, 70, true, (region) => { 
	});

	const book23 = new Region(null, 100, 271, 10, 70, true, (region) => { 
	});

	const book24 = new Region(null, 112, 271, 10, 70, true, (region) => { 
	});

	const book25 = new Region(null, 125, 275, 16, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book26 = new Region(null, 143, 269, 16, 70, true, (region) => { 
	});

	const book27 = new Region(null, 163, 271, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book28 = new Region(null, 163, 270, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book29 = new Region(null, 245, 270, 14, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book30 = new Region(null, 260, 272, 10, 70, true, (region) => { 
	});

	const book31 = new Region(null, 272, 272, 10, 70, true, (region) => { 
	});

	const book32 = new Region(null, 285, 272, 10, 70, true, (region) => { 
	});

	const book33 = new Region(null, 296, 268, 15, 70, true, (region) => { 
	});

	const book34 = new Region(null, 311, 268, 10, 70, true, (region) => { 
	});

	const book35 = new Region(null, 323, 273, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book36 = new Region(null, 334, 268, 10, 70, true, (region) => { 
	});

	const book37 = new Region(null, 219, 368, 16, 70, true, (region) => { 
	});

	const book38 = new Region(null, 243, 364, 10, 70, true, (region) => { 
	});

	const book39 = new Region(null, 255, 362, 18, 70, true, (region) => { 
	});

	const book40 = new Region(null, 272, 365, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book41 = new Region(null, 285, 367, 18, 70, true, (region) => { 
	});

	const book42 = new Region(null, 304, 362, 10, 70, true, (region) => { 
	});

	const book43 = new Region(null, 315, 362, 10, 70, true, (region) => { 
	});

	const book44 = new Region(null, 327, 362, 10, 70, true, (region) => { 
	});

	const book45 = new Region(null, 336, 362, 10, 70, true, (region) => { 
	});

	const book46 = new Region(null, 90, 449, 18, 70, true, (region) => { 
	});

	const book47 = new Region(null, 111, 449, 12, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book48 = new Region(null, 132, 449, 10, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book49 = new Region(null, 145, 449, 10, 70, true, (region) => { 
	});

	const book50 = new Region(null, 155, 449, 10, 70, true, (region) => { 
	});

	const book51 = new Region(null, 167, 453, 10, 70, true, (region) => { 
	});

	const book52 = new Region(null, 177, 457, 10, 70, true, (region) => { 
	});

	const book53 = new Region(null, 188, 451, 15, 70, true, (region) => { 
	});

	const book54 = new Region(null, 203, 454, 15, 70, true, (region) => { 
	});

	const book55 = new Region(null, 217, 450, 15, 70, true, (region) => { 
	});

	const book56 = new Region(null, 234, 450, 17, 70, true, (region) => { 
		redBooks += 1;
		if (redBooks == 12){
			statusText = "The bookcase opens to a secret room!";
			wallFive.setPopup(qRoom);
		}
	});

	const book57 = new Region(null, 254, 452, 15, 70, true, (region) => { 
	});

	const qRoom = new Popup(quartzRoomImg);

	const end = new Popup(blackScreenImg);

	wallFive = new Wall(
		wallFiveImg, 
		[exitDoor, exitSign, book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15, book16, book17, book18, book19, book20, book21, book22, book23, book24, book25, book26, book27, book28, book29, book30, book31, book32, book33, book34, book35, book36, book37, book38, book39, book40, book41, book42, book43, book44, book45, book46, book47, book48, book49, book50, book51, book52, book53, book54, book55, book56, book57],
		[qRoom, end],
	);

		
	const chestOne = new Region(null, 570, 82, 285, 110, true, (region) => {
		statusText = "There is a strange lock on this chest. You should type out the correct colors in each row."; 
		floorFour.setPopup(colorLock);
			setTimeout(function() {
				let numbers = prompt("Enter the correct colors in order", "x, x, x, x, x, x"); 		
				switch(numbers){
					case "yellow, blue, purple, green, purple, red":
						statusText = "The lock unlocks! There is a key inside! I wonder what this key opens?";
						drawerKey = true;
						break;
					default:
						statusText = "Nothing happens. That must be the wrong combination.";
				}
			}, 1250);
	});

	const chestTwo = new Region(null, 225, 320, 295, 120, true, (region) => {
		if (chestKey){
			statusText = "The chest opens! There is another key in this chest. You take it.";
			exitKey = true;
		} else if (drawerKey){
			statusText = "You have a key, but it does not seem to be for this chest..."
		} else {
			statusText = "This chest is locked."
		}
	});

	const colorLock = new Popup(colorLockImg);

	floorFour = new Wall(
		floorFourImg, 
		[chestOne, chestTwo],
		[colorLock],
	);


	startingWall.setConnectedWalls({down: floorWall})
	treeWall.setConnectedWalls({right: startingWall, down: floorTwo, left: wallThree})
	floorWall.setConnectedWalls({up: startingWall})
	floorTwo.setConnectedWalls({up: treeWall})
	wallThree.setConnectedWalls({right: treeWall, down: floorThree, left: wallFive})
	floorThree.setConnectedWalls({up: wallThree})
	wallFive.setConnectedWalls({right: wallThree, down: floorFour})
	floorFour.setConnectedWalls({up: wallFive})

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
