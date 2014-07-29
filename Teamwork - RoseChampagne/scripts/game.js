var boxes = startGame()[0];
var bankerOffers = startGame()[1];
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};
var offerField = document.getElementById('offerField');
var deal = document.getElementById('deal');
var noDeal = document.getElementById('no-deal');
var boxesLenght = 16;
var offerText;
var soundPlayer = document.getElementById('player');
var sound = document.getElementById('sound');
var soundsLowPrizes = ['sounds/Crowd-Boo-Small.mp3',
                       'sounds/Failure-WahWah.mp3', 'sounds/Foghorn.mp3',
                       'sounds/PressYourLuck-Whammy.mp3', 'sounds/Wheel-of-Fortune-Bankrupt.mp3'];
var soundsHighPrizes = ['sounds/TaDa.mp3',];
var soundSource = '';

//Add sorted prizes by Points to the aside fields
var prize;
var prizesSorted = [];
for (var prizeIndex = 0; prizeIndex < boxes.length; prizeIndex++) {
    prizesSorted.push(boxes[prizeIndex]);
}
prizesSorted.sort(function(previousPrize, currentPrize){
    return previousPrize.points - currentPrize.points;
});

for (var index = 0; index < prizesSorted.length; index++) {
    prize = document.getElementById('prize' + (index + 1));
    prize.innerText = prizesSorted[index].prize;
}


var question;
question = document.getElementById('question');
question.innerText = 'Choose your box';


//This a function to detect when player's answer is expected
//If true - we disable boxes
//If not - we active them
function Bool(initialValue) {
    var bool = !!initialValue;
    var listeners = [];
    var returnVal = function(value) {
        if (arguments.length) {
            var oldValue = bool;
            bool = !!value;
            listeners.forEach(function (listener, i, list) {
                listener.call(returnVal, { oldValue: oldValue, newValue: bool });
            });
        }
        return bool
    };
    returnVal.addListener = function(fn) {
        if (typeof fn == "function") {
            listeners.push(fn);
        }
        else {
            throw "Not a function!";
        }
    };
    return returnVal;
}
var waitingForPlayer = Bool(false);
var boxToActiveOrNot;
waitingForPlayer.addListener(function(e){
    if (e.newValue == true) {
        for (var boxActive = 0; boxActive < 16; boxActive++) {
            boxToActiveOrNot = document.getElementById(boxActive + '');
            boxToActiveOrNot.setAttribute('disabled', 'disabled');
        }
    } else {
        for (var boxDisabled = 0; boxDisabled < 16; boxDisabled++) {
            boxToActiveOrNot = document.getElementById(boxDisabled + '');
            if (boxDisabled != player.box) {
                boxToActiveOrNot.removeAttribute('disabled');
            }
        }
    }
});

//This function will find index of the boxOpened in order to remove the right side field
function findIndexByValueAndProp(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
}


//This random function helps to get random source for the player
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

for (var boxId = 0; boxId < 16; boxId++) {
    var box = document.getElementById(boxId.toString());
    box.setAttribute('class', 'closedBox');

    //Add play functionality to the boxes
    //For all boxes on the field add click event listener top detect when the player clicks
    box.addEventListener('click', function(){
        //From the current box clicked we get the number inside - this the prize number
        var boxId = Number(this.innerHTML);
        var box = document.getElementById(boxId + '');
        //Checks if the player has already a box
        if (player.hasBox == false) {
            question = document.getElementById('question');
            question.innerText = 'Choose your box';
            boxes[boxId].isPlayers = true;
            box.removeAttribute('class');
            box.setAttribute('class', 'players-box');
            box.setAttribute('disabled', 'disabled');
            box.innerHTML = 'My';
            player.hasBox = true;
            player.box = boxId;
            question = document.getElementById('question');
            question.innerText = 'Select two boxes';
        } else {
            //If the player has opened less than 2 boxes they can open another one
            if (player.boxesOpened < 2){
                question = document.getElementById('question');
                question.innerText = 'Select two boxes';
                player.boxesOpened += 1;
                box.removeAttribute('class');
                box.setAttribute('class', 'openedBox');
                //Here we remove the prize from the aside fields and from the with boxes set
                var propertyToSearch = 'prize';
                var idPrizeField = findIndexByValueAndProp(prizesSorted, propertyToSearch, boxes[boxId].prize);
                if (idPrizeField < (prizesSorted.length / 2)) {
                    soundSource = soundsHighPrizes[getRandomInt(0, soundsHighPrizes.length)];
                } else {
                    soundSource = soundsLowPrizes[getRandomInt(0, soundsLowPrizes.length)];
                }
                sound.src = soundSource;
                soundPlayer.load();
                boxes[boxId].isOpen = true;
                delete boxes[boxId];
                boxesLenght -= 1;
                var prizeToClose = document.getElementById('prize' + (idPrizeField + 1));
                prizeToClose.innerText = '';
            }

            //Check if on the field is left only one box - means end of the game
            if (boxesLenght == 2) {
                waitingForPlayer(true);
                question = document.getElementById('question');
                question.innerText = 'И ко прайм ся';
                offerField.removeAttribute('class');
                offerField.setAttribute('class', 'offerFieldVisible');
                offerField.innerText = 'Would like to swap your box for the one the field?';
                for (var i = 0; i < boxes.length; i++) {
                    if (boxes.hasOwnProperty(i + '') && (i != player.box)) {
                        offerText = boxes[i].prize;
                    }
                }
                deal.setAttribute('class', 'activeDeal');
                noDeal.setAttribute('class', 'activeNoDeal');
                deal.removeAttribute('disabled');
                noDeal.removeAttribute('disabled');
                deal.addEventListener('click', function(){
                    offerField.innerText = 'You just swapped ' + boxes[player.box].prize + '\n' + ' for '
                        + offerText;
                    waitingForPlayer(true);
                });
                noDeal.addEventListener('click', function(){
                    offerField.innerText = 'You just won ' + boxes[player.box].prize;
                    waitingForPlayer(true);
                });
                return;
            }

            //Banker offers if the player has opened 2 boxes
            if (player.boxesOpened == 2) {
                waitingForPlayer(true);
                question = document.getElementById('question');
                question.innerText = 'И ко прайм ся';
                player.boxesOpened = 0;
                //Next lines set class to the offer field in order to show it on the screen
                offerField = document.getElementById('offerField');
                offerField.removeAttribute('class');
                offerField.setAttribute('class', 'offerFieldVisible');
                var restPrizesWeight = 0;
                for (var prize = 0; prize < boxes.length; prize++) {
                    if (boxes.hasOwnProperty(prize + '')) {
                        restPrizesWeight += boxes[prize].points;
                    }
                }
                restPrizesWeight = restPrizesWeight * 0.70;
                var closestPoints = 0;
                var smallestDifference = 200;
                for (var offer in bankerOffers) {
                    var currentDiff = Math.abs(offer - restPrizesWeight);
                    if (currentDiff < smallestDifference) {
                        closestPoints = offer;
                        offerText = bankerOffers[offer];
                        smallestDifference = currentDiff;
                    }
                }
                offerField.innerText = offerText;
                deal.setAttribute('class', 'activeDeal');
                noDeal.setAttribute('class', 'activeNoDeal');
                deal.removeAttribute('disabled');
                noDeal.removeAttribute('disabled');
                deal.addEventListener('click', function(){
                    offerField.innerText = 'You just swapped ' + boxes[player.box].prize + '\n' + ' for '
                        + offerText;
                    waitingForPlayer(true);
                    deal.removeAttribute('class');
                    noDeal.removeAttribute('class');
                    deal.setAttribute('disabled', 'disabled');
                    noDeal.setAttribute('disabled', 'disabled');
                });
                noDeal.addEventListener('click', function(){
                    question = document.getElementById('question');
                    question.innerText = 'Select two boxes';
                    offerField.removeAttribute('class');
                    offerField.setAttribute('class', 'offerFieldHidden');
                    waitingForPlayer(false);
                    deal.removeAttribute('class');
                    noDeal.removeAttribute('class');
                    deal.setAttribute('disabled', 'disabled');
                    noDeal.setAttribute('disabled', 'disabled');
                });
            }
        }
    })
}



