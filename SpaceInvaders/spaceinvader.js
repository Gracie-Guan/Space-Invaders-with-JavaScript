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
let containerWidth = $("#game-container").width();
let gameStarted = false;

const aliens = [];

//////DEFENDER//////

// move the defender by keyboard

$(document).on("keydown", function move(event) {
  // if (!defender.hasClass("invisible")) {
  switch (event.keyCode) {
    case 13: //enter
      gameStarter();
      break;

    case 37: //left
      defenderPosition.left -= 10;
      break;

    case 39: //right
      defenderPosition.left += 10;
      break;

    case 32: //space
      fireMissile();
      break;
  }

  if (defenderPosition.left < containerPosition.left) {
    defenderPosition.left = containerPosition.left + 3; // game container has 3px border
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
      missile.offset(missilePosition);
      missile.removeClass("invisible");
      if (missilePosition.top > containerTop) {
        if (missileHit()) {
          clearInterval(missileInterval);
        }
      } else {
        clearInterval(missileInterval);
        missileFired = false;
        missile.addClass("invisible");
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

// addAliens();

// Allow the aliens auto move AS A GROUP
let moveRight = true;

function aliensMove() {
  if (gameStarted) {
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
}

// Make them stop when bump into the defender
function checkBump() {
  if (!gameStarted) {
    return;
  }

  if ($(".alien").last().offset().top >= defenderPosition.top) {
    clearInterval(aliensInterval);
    playerLose();
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

  if (!$(".alien:eq(" + randomAlien + ")").hasClass("invisible")) {
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
          bulletHit();
        } else {
          $(".alien-bullet").addClass("invisible");
          clearInterval(bulletInterval);
          alienFired = false;
        }
      }, 50);
    }
  }
}

// Set up an interval to call alienBullet
setInterval(function () {
  if (!alienFired && gameStarted) {
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
    return true;
  } else {
    return false;
  }
}

function missileHit() {
  // compare the positions of missile to positions of each aliens[];

  for (let i = 0; i < aliens.length; i++) {
    if (checkCollision(aliens[i], missile) === true) {
      let thisAlien = $(".alien:eq(" + i + ")");
      if (!thisAlien.hasClass("invisible")) {
        score += 10;
        $("#score").text(score);
      }
      aliens[i].addClass("invisible");
      missile.addClass("invisible");
      missileFired = false;
      return true;
    }
  }
}

// when alien's bullet hit defender
function bulletHit() {
  //setInterval to keep check and update bullet position
  if (checkCollision(bullet, defender)) {
    if (defenderLives > 1) {
      defender.addClass("invisible");
      defenderLives--;
      $(`.life${defenderLives}`).addClass("invisible");
      setTimeout(function () {
        defender.removeClass("invisible");
      }, 500);
    } else {
      $(`.defender-lives.life1`).addClass("invisible");
      defender.addClass("invisible");
      playerLose();
      return;
    }
  }
}

///////GAME MECHANICS//////

function checkWin() {
  if ($(".alien.invisible").length === aliens.length) {
    playerWins();
  }
}

function playerWins() {
  gameStarted = false;
  $(".play-win").removeClass("invisible");
}

function playerLose() {
  gameStarted = false;
  $(".play-lose").removeClass("invisible");
}

function gameInitializer() {
  defender.css("left", "50%");
  defender.removeClass("invisible");
  $(".alien").remove();
  addAliens();
  alienGroup.css({ left: "0", top: "0" });
  score = 0;
  alienFired = false;

  defenderLives = 3;
  $(".defender-lives").removeClass("invisible");

  if (!$(".play-win").hasClass("invisible")) {
    $(".play-win").addClass("invisible");
  } else if (!$(".play-lose").hasClass("invisible")) {
    $(".play-lose").addClass("invisible");
  }

  // prompt user start new game with enter
}

// detect keyboard event on enter
function gameStarter() {
  gameStarted = true;
  $(".game-start").addClass("invisible");
  gameInitializer();
}
