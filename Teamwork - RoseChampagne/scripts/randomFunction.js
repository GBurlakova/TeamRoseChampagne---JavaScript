//This random function helps to get random numbers
//It will be called in the main game logic

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}