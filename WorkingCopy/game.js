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
    //Sort the prizes by points
}

var question;
question = document.getElementById('question');
question.innerText = 'Choose your box';

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
            box.setAttribute('class', 'playersBox');
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
                //end of the game
            }

            //Banker offers if the player has opened 2 boxes
            if (player.boxesOpened == 2) {
                question = document.getElementById('question');
                question.innerText = 'И ко прайм ся';
                player.boxesOpened = 0;
                //Next lines set class to the offer field in order to show it on the screen
                var offerField = document.getElementById('offerField');
                offerField.removeAttribute('class');
                offerField.setAttribute('class', 'offerFieldVisible');
                var restPrizesWeight = 0;
                for(var prize in boxes){
                    restPrizesWeight += boxes[boxId].points;
                }
                restPrizesWeight = restPrisezWeight * 0.70;
                var closestPoints = 0;
                var smallestDifference = 200;
                var offerKey;
                for (var bluePrize = 0; bluePrize < bankerOffers.length; bluePrize++) {
                    var currentDiff = Math.abs(bankerOffers[bluePrize].points - restPrizesWeight);
                    if (currentDiff < smallestDifference) {
                        closestPoints = bankerOffers[bluePrize].points;
                        offerKey = bluePrize;
                    }
                }
                offerField.innerText = bankerOffers[offerField].prize;
                var deal = document.getElementById('deal');
                var noDeal = document.getElementById('no-deal');
                deal.addEventListener('click', function(){
                    offerField.innerText = 'You just swapped ' + boxes[playerObj.box].prize + ' for '
                        + bankerOffers[offerKey].prize;
                });
                noDeal.addEventListener('click', function(){
                    offerField.removeAttribute('class');
                    offerField.setAttribute('class', 'offerFieldHidden');
                });
            }
        }
    })
}



