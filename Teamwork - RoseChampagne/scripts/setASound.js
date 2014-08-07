//Plays a random sound when a box is opened
function setASound(soundSourceText, soundSource, soundPlayerObj, idField){
    var soundsLowPrizes = ['sounds/Crowd-Boo-Small.mp3',
        'sounds/Failure-WahWah.mp3', 'sounds/Foghorn.mp3',
        'sounds/PressYourLuck-Whammy.mp3', 'sounds/Wheel-of-Fortune-Bankrupt.mp3'];
    var soundsHighPrizes = ['sounds/TaDa.mp3'];
    if (idField <= 8) {
        soundSourceText = soundsHighPrizes[getRandomInt(0, soundsHighPrizes.length)];
    } else {
        soundSourceText = soundsLowPrizes[getRandomInt(0, soundsLowPrizes.length)];
    }
    soundSource.src = soundSourceText;
    soundPlayerObj.load();
}