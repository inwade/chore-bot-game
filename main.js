// find all the doors, start button and scores
let door1 = document.querySelector('#door1');
let door2 = document.querySelector('#door2');
let door3 = document.querySelector('#door3');
let startButton = document.querySelector('#start');
let currentStreakBox = document.querySelector('#currentScore').lastElementChild
let bestStreakBox = document.querySelector('#bestScore').lastElementChild
// sources of the pics
let closedDoorPic = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg'
let botDoorPic = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg'
let beachDoorPic = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg'
let spaceDoorPic = 'https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg'
// variables for calculations
let numClosedDoors = 3;

let openDoorPic1;
let openDoorPic2;
let openDoorPic3;

let inPlay = false;

let overText = 'Game over. Wanna try again?'
let winText = 'You won! Wanna try again?'

let winStatus = false;
let currentStreak = 0;
let bestStreak = 0;
// function for a start and a restart 
function randomScenario () {   
    numClosedDoors = 3;
    door1.src = closedDoorPic;
    door2.src = closedDoorPic;
    door3.src = closedDoorPic;
    startButton.innerHTML = 'Good Luck';
    let random = Math.floor(Math.random() * numClosedDoors)
    if (random == 0) {
        openDoorPic1 = botDoorPic;
        openDoorPic2 = beachDoorPic;
        openDoorPic3 = spaceDoorPic;
    } else if (random == 1) {
        openDoorPic1 = spaceDoorPic;
        openDoorPic2 = botDoorPic;
        openDoorPic3 = beachDoorPic;
    } else if (random == 2) {
        openDoorPic1 = beachDoorPic;
        openDoorPic2 = spaceDoorPic;
        openDoorPic3 = botDoorPic;
    }
    inPlay = true;
    winStatus = false;
}
// decrement the closed doors 
function minusCloseDoor () {
   numClosedDoors = numClosedDoors - 1;
}
// update the win status
function knowTheWinner () {
    if (numClosedDoors == 1) {
        winStatus = true;
    }
}
// the game over function 
function gameOver () {
        knowTheWinner();
    if (numClosedDoors == 0 && winStatus == false) {
        startButton.innerHTML = overText;
        startButton.style.paddingTop = '5px';
        startButton.style.paddingBottom = '15px';
        startButton.style.width = '150px'
        inPlay = false;
            if (currentStreak > bestStreak) {
            bestStreak = currentStreak;
            bestStreakBox.innerHTML = bestStreak;
        }
        currentStreak = 0;
        currentStreakBox.innerHTML = currentStreak;
    } else if (numClosedDoors == 0 && winStatus == true) {
        startButton.innerHTML = winText
        startButton.style.paddingTop = '5px';
        startButton.style.paddingBottom = '15px';
        startButton.style.width = '150px'
        inPlay = false;
        currentStreak++;
        currentStreakBox.innerHTML = currentStreak
    }
}
// check if the door is closed 
function isClosed (door) {
    if (door.src == closedDoorPic) {
        return true
    } else {
        return false;
    }
}
// find the door with the bot
function isBotDoor (picPath) {
    if (picPath === botDoorPic) {
        numClosedDoors = 1;
    }
}
// event for a start button
startButton.addEventListener('click', randomScenario);
// event listeners for 3 doors
door1.onclick = function () {
    if (!inPlay) {
        return false
    }

    else if (isClosed(door1)) {
        isBotDoor(openDoorPic1);
        door1.src = openDoorPic1;
        minusCloseDoor();
}
    gameOver();
}
door2.onclick = function () {
    if (!inPlay) {
        return false
    }
    else if (isClosed(door2)) {
    door2.src = openDoorPic2;
    isBotDoor(openDoorPic2);
    minusCloseDoor();
}
    gameOver();
}
door3.onclick = function () {
    if (!inPlay) {
        return false
    }
    if (isClosed(door3)) {
    door3.src = openDoorPic3;
    isBotDoor(openDoorPic3);
    minusCloseDoor();

}
    gameOver();
}

