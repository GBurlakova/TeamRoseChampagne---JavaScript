function play(playerObj, prizesSet, bankerOffersSet, boxId){
    var box = document.getElementById(boxId);//Variable for the current clicked box
    //Checks if the player has already a box
    if (playerObj.hasBox == false) {
        prizesSet[boxId].isPlayers = true;
        box.setAttribute('class', 'playersBox');
        box.setAttribute('disabled', 'disabled');
        playerObj.hasBox = true;
        playerObj.box = boxId;
    } else {
        //If the player has opened less than 2 boxes they can open another one
    	if (playerObj.boxesOpened < 2){
    		playerObj.boxesOpened += 1;
            box.removeAttribute('class');
            box.setAttribute('class', 'openedBox');
            box.innerText = prizesSet[boxId].prize;
            delete prizesSet[boxId];
    	}

        //Check if on the field is left only one box - means end of the game
        if (prizesSet.length == 1) {

        }

        //Banker offers if the player has opened 2 boxes
        if (playerObj.boxesOpened == 2) {
            playerObj.boxesOpened = 0;
            var offerField = document.getElementById('offerField');
            offerField.removeAttribute('class');
            offerField.setAttribute('class', 'offerFieldVisible');
            var offerFieldText = offerField.getElementById('text');
            var restPrisezWeight = 0;
            for(var prize in prisez){
                restPrisezWeight = prisez[prize].points;
            }
            restPrisezWeight = restPrisezWeight * 0.70;
            var closestPoints = 0;
            var smallestDifference = 200;
            var offerKey;
            for (var i = 0; i < bankerOffers.length; i++) {
                var currentDiff = Math.abs(bankerOffersSet[i].points - restPrisezWeight);
                if (currentDiff < smallestDifference) {
                	closestPoints = bankerOffersSet[i].points;
                    offerKey = i;
                }
            }
            offerFieldText.innerText = bankerOffersSet[offerField].prize;
            var deal = document.getElementById('deal');
            var noDeal = document.getElementById('no-deal');
            deal.addEventListener('click', function(){
                offerField.innerText = 'You just swapped ' + prisez[playerObj.box].prize + ' for '
                                       + bankerOffersSet[offerKey].prize;
            });
            noDeal.addEventListener('click', function(){
                offerField.removeAttribute('class');
                offerField.setAttribute('class', 'hiddenField');
            });
        }
    }
}