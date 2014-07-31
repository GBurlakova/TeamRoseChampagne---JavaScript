function endGame(boxesSet, playerObj, questionText, offerField, offerText, dealBtn, noDealBtn, variableChangeDetector){
    questionText = document.getElementById('question');
    questionText.innerText = 'Choose wisely';
    offerField.removeAttribute('class');
    offerField.setAttribute('class', 'offerFieldVisible');
    offerField.innerText = 'Swap your box';
    for (var i = 0; i < boxesSet.length; i++) {
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
		questionText.setAttribute('class','hidden');
        offerField.innerText = 'You just swapped ' + boxesSet[playerObj.box].prize + '\n' + ' for '
            + offerText;
        variableChangeDetector(true);
    });
    noDealBtn.addEventListener('click', function(){
		questionText.removeAttribute('class');
		questionText.setAttribute('class','hidden');
        offerField = document.getElementById('offerField');
        offerField.removeAttribute('class');
        offerField.setAttribute('class', 'offerFieldVisible');
        offerField.innerText = 'You just won ' + boxesSet[playerObj.box].prize;
        variableChangeDetector(true);
    });

}







