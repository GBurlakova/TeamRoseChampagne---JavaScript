var boxes = startGame()[0];
var bankerOffers = startGame()[1];
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};

//Add prizes to the aside fields
var prize;
for (var prizeIndex = 0; prizeIndex < boxes.length; prizeIndex++) {
    prize = document.getElementById('prize' + (prizeIndex + 1));
    prize.innerText = boxes[prizeIndex].prize;
    //TODO Sort the prizes by points TODO
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
                delete boxes[boxId];
                //Here we remove the prize from the aside fields
                var prizeToClose = document.getElementById('prize' + (boxId + 1));
                prizeToClose.innerText = '';
            }

            //Check if on the field is left only one box - means end of the game
            if (boxes.length == 1) {
                //TODO end of the game TODO
            }

            //Banker offers if the player has opened 2 boxes
            if (player.boxesOpened == 2) {
                waitingForPlayer(true);
                question = document.getElementById('question');
                question.innerText = 'И ко прайм ся';
                player.boxesOpened = 0;
                //Next lines set class to the offer field in order to show it on the screen
                var offerField = document.getElementById('offerField');
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
                var offerText;
                for (var offer in bankerOffers) {
                    var currentDiff = Math.abs(offer - restPrizesWeight);
                    if (currentDiff < smallestDifference) {
                        closestPoints = offer;
                        offerText = bankerOffers[offer];
                        smallestDifference = currentDiff;
                    }
                }
                offerField.innerText = offerText;
                var deal = document.getElementById('deal');
                var noDeal = document.getElementById('no-deal');
                deal.setAttribute('class', 'activeDeal');
                noDeal.setAttribute('class', 'activeNoDeal');
                deal.addEventListener('click', function(){
                    offerField.innerText = 'You just swapped ' + boxes[player.box].prize + '\n' + ' for '
                        + offerText;
                    waitingForPlayer(true);
                });
                noDeal.addEventListener('click', function(){
                    offerField.removeAttribute('class');
                    offerField.setAttribute('class', 'offerFieldHidden');
                    waitingForPlayer(false);
                });
            }
        }
    })
}



