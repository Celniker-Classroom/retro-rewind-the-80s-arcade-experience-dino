await Canvas();
world.gravity.y = 30;

let dino = new Sprite();
dino.x = -500;
dino.y = 250;
dino.friction = 0;
dino.img = '🦖';
let hitboxes = [];
let ground = new Sprite();
ground.img = 'images/Ground1.png';
ground.image.scale = 4;
ground.x = -250;
ground.y = 275;
ground.width = 600;
ground.height = 80;
ground.rotation = 0;
ground.physics = STATIC;
ground.addCollider(0, -100, 600, 80, 'rectangle');
createHitbox(ground, 0, 250, 1500, 100);

const platformTemplate = {
  img: 'images/Platform.png',
  width: 548,
  height: 119,
  physics: STATIC,
  rotation: 0
};

function createPlatform(sprite, x, y, scale){
	let clone = new Sprite()
	clone.x = x;
	clone.y = y;
	clone.width = 270 * scale;
	clone.height = 55 * scale;
	if (sprite.img) clone.img = sprite.img;
	if (sprite.color) clone.color = sprite.color;
	if (sprite.friction) clone.friction = sprite.friction;
	clone.image.scale = scale;
	clone.physics = sprite.physics;
	clone.rotation = sprite.rotation;
	createHitbox(clone, x, y, clone.width, clone.height);
	return clone;
}

function createHitbox(sprite, x, y, width, length){
	let hitbox = new Sprite();
	hitbox.color = 'blue';
	hitbox.x = x;
	hitbox.y = y;
	hitbox.width = width
	hitbox.height = length + 10;
	hitbox.physics = STATIC;
	hitbox.overlaps(allSprites);
	hitboxes.push(hitbox);
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

//Level 1 Platforms
createPlatform(platformTemplate, -200, 80, 0.5);
createPlatform(platformTemplate, 200, -25, 0.7);
createPlatform(platformTemplate, 0, -150, 0.3);
createPlatform(platformTemplate, 400, -150, 0.3);
createPlatform(platformTemplate, -300, -150, 0.5);

q5.update = function () {
	background('black');
	dino.rotation = 0;

	let isOnSurface = hitboxes.some(hb => dino.overlapping(hb));
	if (kb.presses('w') && isOnSurface) {
		dino.vel.y = -12;
	}

	if (kb.pressing('a')){
		dino.vel.x = -8;
	}
	if (kb.pressing('d')) {
		dino.vel.x = 8;
	}
	else if (!kb.pressing('a') && !kb.pressing('d')) {
		dino.vel.x = 0;
	}
	//set the direction the dinosaur is facing
	if (dino.vel.x > 0.1) {
		dino.scale.x = -1;
	}
	else if (-0.1 < dino.vel.x && dino.vel.x < 0.1) {
		dino.scale.x = dino.scale.x;
	}
	else {
		dino.scale.x = 1;
	}
};

// Screen dimensions
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