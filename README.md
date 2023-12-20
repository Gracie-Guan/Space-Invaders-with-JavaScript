# Space-Invaders-with-JavaScript
I am currently trying to make a webpage-based Space Invaders game, using JavaScript and JQuery. It won't be a perfect solution but will demonstrate my thinking during the process I try to build it.
Playable link: https://gracie-guan.github.io/Space-Invaders-with-JavaScript/index.html


### 17/11/2023
 
* Game field setting
* Using the keyboard to control the defender movement
* Able to shoot missiles from the defender
* Using js to generate the whole group of aliens
* The aliens move together as a group
(there is a small problem, the alien group returns before actually touching the border, to be fixed)
* Bullet drop from a random alien

### 18/11/2023

* Tried to write a function to hide the alien when it collides with the missile, but it seems to have some issue with the checkCollision function. to be fixed
* Also, restructure a bit the logic to detect and hide the hit side.

### 21/11/2023
* Fixed the alien group's early return problem

  (too many group projects couldn't find the time to continue)

### 09/12/2023 - noon
* Finally fix the checkCollison function.
* Another two issue shows up:
  1. the missile doesn't hide after hitting the alien.
     possible reason:
     - conflict with another code that controls visibility in the previous function
  2. while the alien hides, it still shoots bullets but from (0,0)
     possible reason:
     - aliens just become invisible, but still stay there in the array
     - need to add a condition to filter the invisible ones before aliens drop bullets

### 09/12/2023 - night
* Fix the problem mentioned at noon:
  1. missile doesn't hide after hitting aliens: I call the missleHit function inside the fireMissile function, and ask it to clear missileInterval once missleHit is true;
  2. dead alien still shoots: added a condition to check if ".alien:eq(randomAlien)" is invisible. only shoot when it's visible. Used the same method
     to fix score over-calculate issue
* Hide the defender when it gets hit by the alien, and reduce its life
* code part of the game mechanic function, to be continued tomorrow

### 11/12/2023 
* Define the condition for Win or Lose, and show a notification after the condition met
* Setup initial status
* Added sound effects for movement, got hit, background music, win and lose
* Still having issue with restart, will fix that later

### 19/12/2023
* Fixed the bug with lose condition
