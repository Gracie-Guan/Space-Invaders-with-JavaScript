//variables
const defender = $(".defender");
const missile = $(".missile");
const bullet = $(".alien-bullet");
let defenderPosition = defender.offset();
let missilePosition = missile.offset();
const alienGroup = $(".alien-container");
let alienGroupPosition = $(".alien-container").offset();
const containerPosition = $("#game-container").offset();
let missileFired = false;
let score = 0;
let defenderLives = 3;
let singleAlien = $(".alien");
let alienFired = false;

const aliens = [];
///////GENERAL FUNCTION//////

// check if the target object inside the game container

let containerWidth = $("#game-container").width();

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
      setInterval(function () {
        if (missilePosition.top > containerPosition.top) {
          missileHit();
        }
      }, 50);
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
  missilePosition = {
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
        missile.toggleClass("invisible");
        clearInterval(missileInterval);
        missileFired = false;
      }
    }, 30);
  }
}

function addAliens() {
  const alienSpacing = 10;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 8; col++) {
      // let alien = new Alien();
      let alien = $("<div class='alien'></div>");
      alienGroup.append(alien);
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
  // console.log(alienGroup.width());
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

// Make them stop when bump into the defender
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
function checkCollision(a, b) {
  if (
    a.offset().left + a.width() > b.offset().left &&
    a.offset().left < b.offset().left + b.width() &&
    a.offset().top + a.height() > b.offset().top &&
    a.offset().top <= b.offset().top + b.height()
  ) {
    // console.log("collided");
    return true;
  } else {
    // console.log(a.offset().left, a.offset().top);
    // console.log(b.offset().left, b.offset().top);
    return false;
  }
}

function missileHit() {
  // compare the positions of missile to positions of each aliens[];
  for (let i = 0; i < aliens.length; i++) {
    if (checkCollision(aliens[i], missile)) {
      aliens[i].addClass("invisible");
      missile.toggleClass("invisible");

      score += 10;
      $("#score").text(score);
      missileFired = false;
      return true; // exit the function once a collision is detected
    }
  }
}

// function missileHit() {
//   // compare the positions of missile to positions of each aliens[];
//   for (let i = 0; i < aliens.length; i++) {
//     if (checkCollision(aliens[i], missile)) {
//       aliens[i].hide();
//       missile.toggleClass("invisible");
//       score += 10;
//       $("#score").text(score);
//       missileFired = false;
//     }
//   }
// }

// when alien's bullet hit defender
function bulletHit() {
  //setInterval to continuely check and update bullet position

  if (checkCollision(bullet, defender)) {
    if (defenderLives > 1) {
      defender.addClass("invisible");
      defenderLives--;
      $(`.life${defenderLives}`).addClass("invisible");
      setTimeout(function () {
        defender.addClass("invisible");
      }, 2000);
    }
  } else {
    defender.addClass("invisible");
  }
}

///////GAME MECHANICS//////
function playerWins() {}

function playerLoses() {}

let gameStarted = false;

function gameInitializer() {
  // defender position
  defenderPosition.left = 695;
  // remove all aliens, then add aliens to 40
  // aliens position
  score = 0;
  defenderLives = 3;
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
