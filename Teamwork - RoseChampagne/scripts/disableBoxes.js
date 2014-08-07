//This a function to detect when player's answer is expected
//or generally it helps when the boxes(buttons) have to be disabled
//If true - we disable boxes
//If not - we active them

function disableBoxes(bool){
    var boxToActiveOrNot;
    if (bool == true) {
        for (var boxActive = 0; boxActive < BOXES_COUNT; boxActive++) {
            boxToActiveOrNot = document.getElementById(boxActive + '');
            boxToActiveOrNot.setAttribute('disabled', 'disabled');
        }
    } else {
        for (var boxDisabled = 0; boxDisabled < BOXES_COUNT; boxDisabled++) {
            boxToActiveOrNot = document.getElementById(boxDisabled + '');
            if ((boxDisabled != player.box) || (player.hasBox == false)) {
                boxToActiveOrNot.removeAttribute('disabled');
            }
        }
    }
}