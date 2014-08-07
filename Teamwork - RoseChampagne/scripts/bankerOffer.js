function offer(boxesSet, bankerOffersSet, playerObj, questionText, offerField, offerText, dealBtn, noDealBtn){
    playerObj.boxesOpened = 0;
    disableBoxes(true);
    questionText = document.getElementById('question');
    questionText.innerText = 'Choose wisely';
    //Next lines set class to the banker's field in order to show it on the screen
    offerField = document.getElementById('offerField');
    offerField.removeAttribute('class');
    offerField.setAttribute('class', 'offerFieldVisible');
    //Next lines calculate weight of the boxes left in game in order to choose
    //the closet offer by points among banker's offers
    var restPrizesWeight = 0;
	var restBoxesCount = 0;
    for (var i in boxesSet) {
		restPrizesWeight += boxesSet[i].points;
		restBoxesCount+=1;
    }
    restPrizesWeight = Math.floor(restPrizesWeight * 0.85 / restBoxesCount);
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
		questionText.removeAttribute('class');
		questionText.setAttribute('class','hidden-question');
        offerField.innerText = 'You just swapped ' + boxesSet[playerObj.box].prize + '\n' + ' for '
            + offerText;
        disableBoxes(true);
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
        disableBoxes(false);
        dealBtn.removeAttribute('class');
        noDealBtn.removeAttribute('class');
        dealBtn.setAttribute('disabled', 'disabled');
        noDealBtn.setAttribute('disabled', 'disabled');
    });
}












