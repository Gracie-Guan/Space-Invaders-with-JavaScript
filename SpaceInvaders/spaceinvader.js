//variables
const defender = $(".defender");
const missile = $(".missile");
const bullet = $(".alien-bullet");
let defenderPosition = defender.offset();
let missilePosition = defender.offset();
let alienGroup = $(".alien-container");
let alienGroupPosition = $(".alien-container").offset();
const containerPosition = $("#game-container").offset();
let missileFired = false;
let score = 0;
let defenderLives = 3;
let singleAlien = $(".alien");
let alienFired = false;

const alienContainer = $(".alien-container");
const aliens = [];
///////GENERAL FUNCTION//////

// check if the target object inside the game container

let containerWidth = $("#game-container").width();

function borderCollision(object) {
  let containerOffsetLeft = containerPosition.left;
  let objectOffsetLeft = object.offset().left;
  if (
    objectOffsetLeft > containerOffsetLeft &&
    objectOffsetLeft < containerOffsetLeft + containerWidth
  ) {
    return false;
  } else {
    return true;
  }
}

//////DEFENDER//////

// move the defender by keyboard

$(document).on("keydown", function move(event) {
  switch (event.keyCode) {
    case 37:
      defenderPosition.left -= 10;
      break;

    case 39:
      defenderPosition.left += 10;
      break;

    case 32:
      fireMissile();
      break;
  }
  if (defenderPosition.left < containerPosition.left) {
    defenderPosition.left = containerPosition.left + 3; //the reason of +3 is that game container has 3px border
  }
  if (
    defenderPosition.left + defender.width() >
    containerPosition.left + containerWidth
  ) {
    defenderPosition.left =
      containerPosition.left + containerWidth - defender.width();
  }
  defender.offset(defenderPosition);
});

// fire a missile from the defender

function fireMissile() {
  let missilePosition = {
    top: defenderPosition.top,
    left: defenderPosition.left + defender.width() * 0.5,
  };
  const containerTop = containerPosition.top;

  if (!missileFired) {
    missileFired = true;

    let missileInterval = setInterval(function () {
      missilePosition.top -= 20;
      if (missilePosition.top > containerTop) {
        missile.offset(missilePosition);
        missile.removeClass("invisible");
      } else {
        missile.addClass("invisible");
        clearInterval(missileInterval);
        missileFired = false;
      }
    }, 50);
  }
}

///////ALIENS//////

// add 5 rows 8 columns of aliens
class Alien {
  constructor(beHit) {
    this.beHit = function () {};
  }
}

function addAliens() {
  const alienSpacing = 10;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      let alien = new Alien();
      alien = $("<div class='alien'></div>");
      alienContainer.append(alien);
      aliens.push(alien);

      let leftPosition = col * (30 + alienSpacing);
      let topPosition = row * (30 + alienSpacing);

      alien.css({
        left: leftPosition + "px",
        top: topPosition + "px",
      });
    }
  }
}

addAliens();

// Allow the aliens auto move AS A GROUP
let moveRight = true;

function aliensMove() {
  if (moveRight) {
    alienGroupPosition.left += 1;
  } else {
    alienGroupPosition.left -= 1;
  }

  if (
    alienGroupPosition.left <= containerPosition.left ||
    alienGroupPosition.left + alienGroup.width() >
      containerPosition.left + $("#game-container").width()
  ) {
    moveRight = !moveRight;
    alienGroupPosition.top += 40;
  }
  alienGroup.offset(alienGroupPosition);
}

// Make them stop when hit the defender
function checkBump() {
  if ($(".alien").last().offset().top >= defenderPosition.top) {
    clearInterval(aliensInterval);
    return true;
  } else {
    aliensMove();
    return false;
  }
}

let aliensInterval = setInterval(checkBump, 40);

function alienBullet() {
  //randomly chose an alien as bullet shooter - math.random() method to chose from array aliens[]
  let randomAlien = Math.floor(Math.random() * 40);
  let randomShootPosition = aliens[randomAlien].offset();
  // initial bullet position
  let bulletPosition = {
    top: randomShootPosition.top,
    left: randomShootPosition.left + $(".alien").width() * 0.5,
  };

  if (!alienFired) {
    alienFired = true;
    // interval() method to make bullet move
    let bulletInterval = setInterval(function () {
      bulletPosition.top += 20;
      if (
        bulletPosition.top <
        containerPosition.top + $("#game-container").height()
      ) {
        // update bullet position
        $(".alien-bullet").offset(bulletPosition);
        $(".alien-bullet").removeClass("invisible");
      } else {
        $(".alien-bullet").addClass("invisible");
        clearInterval(bulletInterval);
        alienFired = false;
      }
    }, 50);
  }
}
// Set up an interval to call alienBullet
setInterval(function () {
  if (!alienFired) {
    alienBullet();
  }
}, 1000);

////////HITTING BETWEEN DEFENDER AND ALIENS/////////

// when defender's missile hit alien
function checkMissileHit() {
  // compare the positions of missile to positions of each aliens[];
  // - not sure how to compare all the aliens location and found the collide one, for loop?
  // if (missile position equal to one of the alien's)
  // return true;
  //
  // else {
  //   return false;}
}

while (checkMissileHit()) {
  // if (aliens[].length >1)
  // alien hide, missile hide
  // status change
  // missileFired = false;
  // score += 10;
  // $("#score").text(score);
  // else
  // prompt user win in DOM, allow to restart
}

// when alien's bullet hit defender
function checkBulletHit() {
  // compare the positions of bullet and defender
  //  if (bullet's position equal to defender's)
  //   return true;
  //   else {
  //   return false;
  //  }
}
while (checkBulletHit()) {
  // if (defenderLives>1)
  // hide alien's bullet
  // defenderLive -= 1;
  // hide lives img in DOM
  // generate another bullet
  // else
  // gameOver();
}

///////GAME MECHANICS//////
let gameStarted = false;

function gameInitializer() {
  // defender position
  // remove all aliens, then add aliens to 40
  // aliens position
  // score = 0
  // defenderLives = 3
  // prompt user start new game with enter
}

// detect keyboard event on enter
function gameStarter() {
  gameStarted = true;

  // gameStarted = true
  // allow key board event
  // gameInitializer()
  // call aliensMove()
}

function gameOver() {
  // gameStarted = false
  // allow start new game (show in DOM)
  // aliens stop moving
  // not response to keyboard event
  // add other effect like sound of animation
}
