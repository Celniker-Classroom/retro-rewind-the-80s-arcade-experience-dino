//Write up:
//I created my game by mixing mechanics from two classic 80s games, Donkey Kong and Super Mario Bros.
//The player controls a dinosaur that must navigate through 4 levels of platforms to reach a carcass at the end of each level. 
//Just like Super Mario Bros, it is a platforming game with varying difficulties. However, instead of a continuous scroller, it switches and resets at each level like Donkey Kong.
//I think having the level reset is good for quick, modular level design. 
//Though 4 levels are included in the base game it is possible to design a level purely through inputting parameters
//into the createPlatform function, which allows for infinite, quick and easy level design possibilities.

await Canvas();
world.gravity.y = 30;

let score = 0;
// Background music 
let bgMusic = new Audio('images/song.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.5;
function startMusic(){
	try { bgMusic.play().catch(()=>{}); } catch (e) {}
}
function stopMusic(){
	bgMusic.pause();
	bgMusic.currentTime = 0;
}
let gameoversound = new Audio('images/gameoverrr.mp3');
function playGameOverSound(){
	gameoversound.pause();
	gameoversound.currentTime = 0;
	try { gameoversound.play().catch(()=>{}); } catch (e) {}
}

let levelsCleared = 0;

let meat = new Sprite();
meat.img = 'images/Meat.png';
meat.scale = 1;
meat.physics = STATIC;
meat.physicsEnabled = true;
meat.layer = 4;
meat.visible = false;

let carcass = new Sprite();
carcass.img = 'images/Carcass.png';
carcass.scale = 1;
carcass.physics = STATIC;
carcass.layer = 4;
carcass.visible = false;

let gameOver = new Sprite();
	gameOver.img = 'images/Game Over.png';
	gameOver.scale = 7;
	gameOver.y = -35;
	gameOver.physics = STATIC;
	gameOver.physicsEnabled = false;
	gameOver.layer = 5;

let startScreen = new Sprite();
startScreen.img = 'images/StartGame.png';
startScreen.scale = 8;
startScreen.physics = STATIC;
startScreen.physicsEnabled = false;
startScreen.layer = 5;

let dino = new Sprite();
dino.x = -300;
dino.y = 150;
dino.width = 40;
dino.height = 40;
dino.friction = 0;
dino.physics = DYNAMIC;
dino.addAnis('images/Spritesheet.png', '128x128', {
	idle: { frames: [0] },
	run: { frames: [0, 1], frameDelay: 8 }
});
dino.changeAni('idle');
let platforms = [];
let platformHitboxes = [];
let groundHitbox;
let ground = new Sprite();
ground.img = 'images/Ground1.png';
ground.image.scale = 4;
ground.x = -350;
ground.y = 250;
ground.width = 650;
ground.height = 80;
ground.rotation = 0;
ground.physics = STATIC;
ground.image.offset.x = 90;
groundHitbox = createHitbox(ground, true);

const platformTemplate = {
  img: 'images/Platform.png',
  width: 548,
  height: 119,
  physics: STATIC,
  rotation: 0
};

const platformTemplate2 = {
  img: 'images/Platform2.png',
  width: 548,
  height: 119,
  physics: STATIC,
  rotation: 0
};

function createPlatform(sprite, x, y, scale){
	let clone = new Sprite()
	clone.x = x;
	clone.y = y;
	clone.width = 290 * scale;
	clone.height = 55 * scale;
	if (sprite.img) clone.img = sprite.img;
	if (sprite.color) clone.color = sprite.color;
	if (sprite.friction) clone.friction = sprite.friction;
	clone.image.scale = scale;
	clone.physics = sprite.physics;
	clone.rotation = sprite.rotation;
	createHitbox(clone);
	platforms.push(clone);
	return clone;
}

function createHitbox(sprite, isGround = false){
	let hitbox = new Sprite();
	hitbox.color = 'blue';
	hitbox.x = sprite.x;
	hitbox.y = sprite.y;
	hitbox.width = sprite.width + 10;
	hitbox.height = sprite.height + 20;
	hitbox.physics = STATIC;
	hitbox.overlaps(allSprites);
	if (!isGround) {
		platformHitboxes.push(hitbox);
	}
	hitbox.visible = false;
	return hitbox;
}

function createPrey(sprite, x, y){
	let clone = new Sprite();
	clone.x = x;
	clone.y = y;
	clone.img = sprite.img;
	clone.physics = sprite.physics;
	clone.rotation = sprite.rotation;
	return clone;
}

function resetLevel(){
	// Remove all platforms
	meat.physicsEnabled = true;
	dino.x = -300;
	dino.y = 150;
	carcass.visible = false;
	for (let platform of platforms){
		platform.delete();
	}
	platforms = [];
	
	// Remove all platform hitboxes
	for (let hitbox of platformHitboxes){
		hitbox.delete();
	}
	platformHitboxes = [];
}

//Level 1 Platforms
function createLevel1(){
	score = 0;
	resetLevel();
	createPlatform(platformTemplate, -200, 80, 0.5);
	createPlatform(platformTemplate, 200, -25, 0.7);
	createPlatform(platformTemplate, 0, -150, 0.3);
	createPlatform(platformTemplate, 400, -150, 0.3);
	createPlatform(platformTemplate, -300, -150, 0.5);
	createPlatform(platformTemplate, 550, 100, 0.3);
	carcass.x = -300;
	carcass.y = -180;
	carcass.visible = true;
	meat.x = 550;
	meat.y = 80
	meat.visible = true;
}

function createLevel2(){
	resetLevel();
	createPlatform(platformTemplate, -100, 100, 0.3);
	createPlatform(platformTemplate, 100, 50, 0.5);
	createPlatform(platformTemplate, 300, 0, 0.4);
	createPlatform(platformTemplate, -300, -50, 0.4);
	createPlatform(platformTemplate, 0, -200, 0.6);
	carcass.x = 0;
	carcass.y = -230;
	carcass.visible = true;
	meat.x = 300;
	meat.y = -20;
	meat.visible = true;
}

function createLevel3(){
	resetLevel();
	createPlatform(platformTemplate, -400, 100, 0.3);
	createPlatform(platformTemplate, -100, 50, 0.2);
	createPlatform(platformTemplate, 200, -50, 0.1);
	createPlatform(platformTemplate, -200, -50, 0.2);
	createPlatform(platformTemplate, 0, -200, 0.1);
	carcass.x = 0;
	carcass.y = -230;
	carcass.visible = true;
	meat.x = 200;
	meat.y = -70;
	meat.visible = true;
}

function createLevel4(){
	resetLevel();
	createPlatform(platformTemplate, -400, 100, 0.2);
	createPlatform(platformTemplate, -100, 50, 0.1);
	createPlatform(platformTemplate, 200, -50, 0.2);
	createPlatform(platformTemplate, -200, -50, 0.3);
	createPlatform(platformTemplate, 0, -200, 0.4);
	createPlatform(platformTemplate, 300, -100, 0.2);
	carcass.x = 300;
	carcass.y = -120;
	carcass.visible = true;
	meat.x = 40;
	meat.y = 20;
	meat.visible = true;
}

let state = 'start';
let loadNextLevel = true;
gameOver.visible = false;

q5.update = function () {
	// Game logic for gameplay
	dino.visible = true;
	ground.visible = true;
	if (state === 'win') {
		resetLevel();
		background('black');
		textSize(50);
		fill('white');
		textAlign(CENTER);
		text('You Win! Score: ' + score + ' \nPress Space to Restart', 0, 0);
		if (kb.presses('space')) {
			state = 'level1';
			dino.x = -300;
			dino.y = 150;
			loadNextLevel = true;
			startMusic();
		}
		dino.visible = false;
		ground.visible = false;
	}
	if (state === 'level1' || state === 'level2' || state === 'level3' || state === 'level4') {
		if (dino.collides(meat)){
			meat.visible = false;
			meat.physicsEnabled = false;
			score += 50;
		}
		startScreen.visible = false;
		background('skyblue');
		dino.rotation = 0;
		//uses the hitboxes to determine if the dinosaur is on a surface, allowing it to jump
		let isOnSurface = platformHitboxes.some(hb => dino.overlapping(hb)) || dino.overlapping(groundHitbox);
		//directionals
		if (kb.presses('w') && isOnSurface) {
			dino.vel.y = -12;
		}

		if (kb.pressing('a')){
			dino.vel.x = -7;
		}
		if (kb.pressing('d')) {
			dino.vel.x = 7;
		}
		else if (!kb.pressing('a') && !kb.pressing('d')) {
			dino.vel.x = 0;
		}
		//set the direction the dinosaur is facing
		if (dino.vel.x > 0.1) {
			dino.scale.x = 1;
		}
		else if (-0.1 < dino.vel.x && dino.vel.x < 0.1) {
			dino.scale.x = dino.scale.x;
		}
		else {
			dino.scale.x = -1;
		}

		//control animation based on movement
		if (Math.abs(dino.vel.x) > 0.1) {
			// Play run animation when moving
			if (dino.ani.name !== 'run') {
				dino.changeAni('run');
			}
		} else {
			// Show idle frame when not moving
			if (dino.ani.name !== 'idle') {
				dino.changeAni('idle');
			}
		}

		if (dino.y > 260){
			state = 'gameOver';
		}
		// checks if the next level should be generated
		if (state === 'level1'){
			if (loadNextLevel){
				createLevel1();
				loadNextLevel = false;
			}
		}
		else if (state === 'level2'){
			if (loadNextLevel){
				createLevel2();
				loadNextLevel = false;
			}
		}
		else if (state === 'level3'){
			if (loadNextLevel){
				createLevel3();
				loadNextLevel = false;
			}
		}
		else if (state === 'level4'){
			if (loadNextLevel){
				createLevel4();
				loadNextLevel = false;
			}
		}
		// checks for level finish to reset the level
		if (dino.collides(carcass)){
			loadNextLevel = true;
			levelsCleared += 1;
			score += 100;
			if (state === 'level1'){
				state = 'level2';
			}
			else if (state === 'level2'){
				state = 'level3';
			}
			else if (state === 'level3'){
				state = 'level4';
			}
			else if (state === 'level4'){
				state = 'win';
			}
		}
	}
	else if (state === 'start') {
		background('skyblue');
		startScreen.visible = true;
		if (kb.presses('space')) {
			state = 'level1';
			startMusic();
		}
			
		dino.visible = false;
		ground.visible = false;
	}
	else if (state === 'gameOver') {
		resetLevel();
		background('black');
		playGameOverSound();
		stopMusic();
		gameOver.visible = true;
		meat.visible = false;
		ground.visible = false;
		dino.visible = false;
		textSize(30);
		fill('white');
		textAlign(CENTER);
		text('Score: ' + score, 0, 250);
		if (kb.presses('space')) {
			state = 'level1';
			dino.x = -300;
			dino.y = 150;
			loadNextLevel = true;
			gameOver.visible = false;
			startMusic();
		}
	}
};

// Borders of the game
let w = 1360;
let h = 600;
let thickness = 10;


let topWall = new Sprite(0, -h/2, w, thickness, 'static');
topWall.color = 'green';
topWall.strokeWeight = 0;

let bottomWall = new Sprite(0, h/2, w, thickness, 'static');
bottomWall.color = 'green';
bottomWall.strokeWeight = 0;

let leftWall = new Sprite(-w/2, 0, thickness, h, 'static');
leftWall.color = 'green';
leftWall.strokeWeight = 0;

let rightWall = new Sprite(w/2, 0, thickness, h, 'static');
rightWall.color = 'green';
rightWall.strokeWeight = 0;