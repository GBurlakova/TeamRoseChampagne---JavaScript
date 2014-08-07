function endGame(boxesSet, playerObj, questionText, offerField, offerText, dealBtn, noDealBtn){
    questionText = document.getElementById('question');
    questionText.innerText = 'Choose wisely';
    offerField.removeAttribute('class');
    offerField.setAttribute('class', 'offerFieldVisible');
    offerField.innerText = 'Swap your box';
    for (var i = 0; i < BOXES_COUNT; i++) {
        if (boxesSet.hasOwnProperty(i + '') && (i != playerObj.box)) {
            offerText = boxesSet[i].prize;
        }
    }
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
    });
    noDealBtn.addEventListener('click', function(){
		questionText.removeAttribute('class');
		questionText.setAttribute('class','hidden-question');
        offerField = document.getElementById('offerField');
        offerField.removeAttribute('class');
        offerField.setAttribute('class', 'offerFieldVisible');
        offerField.innerText = 'You just won ' + boxesSet[playerObj.box].prize;
        disableBoxes(true);
    });
}







