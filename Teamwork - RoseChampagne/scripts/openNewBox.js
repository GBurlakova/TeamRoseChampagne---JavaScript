function openNewBox(playerObj, boxesSet, currentBox, currentBoxId, questionText, arrSortedPrizes){
    questionText = document.getElementById('question');
    questionText.innerText = 'Select two boxes';
    playerObj.boxesOpened += 1;
    currentBox.removeAttribute('class');
    currentBox.setAttribute('class', 'openedBox');
    //Here we remove the prize from the aside fields and from the with boxes set
    var propertyToSearch = 'prize';
    var idPrizeField = findIndexByValueAndProp(arrSortedPrizes, propertyToSearch, boxesSet[currentBoxId].prize);
    idPrizeField += 1;
    setASound(soundSource, sound, soundPlayer);
    boxesSet[currentBoxId].isOpen = true;
    delete boxesSet[currentBoxId];
    var prizeToClose = document.getElementById('prize' + (idPrizeField));
    if (idPrizeField >= 1 && idPrizeField <= 4) {
        prizeToClose.setAttribute('class', 'chosenPrizeBlue');
    } else if (idPrizeField >= 5 && idPrizeField <= 8) {
        prizeToClose.setAttribute('class', 'chosenPrizeGreen');
    } else if (idPrizeField >= 9 && idPrizeField <= 12) {
        prizeToClose.setAttribute('class', 'chosenPrizeYellow');
    } else {
        prizeToClose.setAttribute('class', 'chosenPrizeRed');
    }
}