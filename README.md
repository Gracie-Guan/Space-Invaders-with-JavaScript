# Space-Invaders-with-JavaScript
I am currently trying to make a webpage-based Space Invaders game, using JavaScript and JQuery. It won't be a perfect solution but will demonstrate my thinking during the process I try to build it.

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

### 09/12/2023
* Finally fix the checkCollison function.
* Another issue shows up, the missile doesn't hide after hitting the alien. let me see...
