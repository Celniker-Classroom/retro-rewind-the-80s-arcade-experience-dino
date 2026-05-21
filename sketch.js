await Canvas();
world.gravity.y = 30;

let dino = new Sprite();
dino.x = 50;
dino.y = 200;
dino.friction = 0;
dino.img = '🦖';
let hitboxes = [];
let ground = new Sprite();
ground.x = 0;
ground.y = 250;
ground.width = 1500;
ground.height = 100;
ground.rotation = 0;
ground.physics = STATIC;
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
	clone.img = sprite.img;
	clone.x = x;
	clone.y = y;
	clone.width = 270;
	clone.height = 55;
	clone.image.scale = scale;
	if (sprite.img) clone.img = sprite.img;
	if (sprite.color) clone.color = sprite.color;
	if (sprite.friction) clone.friction = sprite.friction;
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
	hitbox.width = width + 10;
	hitbox.height = length + 10;
	hitbox.physics = STATIC;
	hitbox.overlaps(allSprites);
	hitboxes.push(hitbox);
	hitbox.visible = false;
	return hitbox;
}

createPlatform(platformTemplate, 50, 80, 1);
createPlatform(platformTemplate, 400, -25, 1);
createPlatform(platformTemplate, 150, -150, 1);

q5.update = function () {
	background('skyblue');
	dino.rotation = 0;

	let isOnSurface = hitboxes.some(hb => dino.overlapping(hb));
	if (kb.presses('w') && isOnSurface) {
		dino.vel.y = -12;
	}

	if (kb.pressing('a')){
		dino.vel.x = -10;
	}
	if (kb.pressing('d')) {
		dino.vel.x = 10;
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
