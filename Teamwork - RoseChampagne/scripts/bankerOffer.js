function offer(boxesSet, bankerOffersSet, playerObj, variableChangeDetector,
               questionText, offerField, offerText, dealBtn, noDealBtn){
    playerObj.boxesOpened = 0;
    variableChangeDetector(true);
    questionText = document.getElementById('question');
    questionText.innerText = 'И ко прайм ся';
    //Next lines set class to the banker's field in order to show it on the screen
    offerField = document.getElementById('offerField');
    offerField.removeAttribute('class');
    offerField.setAttribute('class', 'offerFieldVisible');
    //Next lines calculate weight of the boxes left in game in order to choose
    //the closet offer by points among banker's offers
    var restPrizesWeight = 0;
    for (var prize = 0; prize < boxesSet.length; prize++) {
        if (boxesSet.hasOwnProperty(prize + '')) {
            restPrizesWeight += boxesSet[prize].points;
        }
    }
    restPrizesWeight = Math.floor(restPrizesWeight * 0.70);
    var closestPoints = 0;
    var smallestDifference = 200;
    for (var offer in bankerOffersSet) {
        var currentDiff = Math.abs(offer - restPrizesWeight);
        if (currentDiff < smallestDifference) {
            closestPoints = offer;
            offerText = bankerOffersSet[offer];
            smallestDifference = currentDiff;
        }
    }
    delete bankerOffersSet[closestPoints];
    offerField.innerText = offerText;
    dealBtn.setAttribute('class', 'activeDeal');
    noDealBtn.setAttribute('class', 'activeNoDeal');
    dealBtn.removeAttribute('disabled');
    noDealBtn.removeAttribute('disabled');
    dealBtn.addEventListener('click', function(){
        offerField.innerText = 'You just swapped ' + boxesSet[playerObj.box].prize + '\n' + ' for '
            + offerText;
        variableChangeDetector(true);
        dealBtn.removeAttribute('class');
        noDealBtn.removeAttribute('class');
        dealBtn.setAttribute('disabled', 'disabled');
        noDealBtn.setAttribute('disabled', 'disabled');
    });
    noDealBtn.addEventListener('click', function(){
        questionText = document.getElementById('question');
        questionText.innerText = 'Select two boxes';
        offerField.removeAttribute('class');
        offerField.setAttribute('class', 'offerFieldHidden');
        variableChangeDetector(false);
        dealBtn.removeAttribute('class');
        noDealBtn.removeAttribute('class');
        dealBtn.setAttribute('disabled', 'disabled');
        noDealBtn.setAttribute('disabled', 'disabled');
    });
}











