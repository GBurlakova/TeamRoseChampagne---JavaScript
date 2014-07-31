function openNewBox(playerObj, boxesSet, currentBox, currentBoxId, soundSourceText,
                    lowPrizesSoundsSet, highPrizesSoundsSet, soundSource, soundPlayerObj ,
                    questionText, arrSortedPrizes){


    questionText = document.getElementById('question');
    questionText.innerText = 'Select two boxes';
    playerObj.boxesOpened += 1;
    currentBox.removeAttribute('class');
    currentBox.setAttribute('class', 'openedBox');
    //Here we remove the prize from the aside fields and from the with boxes set
    var propertyToSearch = 'prize';
    var idPrizeField = findIndexByValueAndProp(arrSortedPrizes, propertyToSearch, boxesSet[currentBoxId].prize);
    idPrizeField += 1;
    if (idPrizeField <= (arrSortedPrizes.length / 2)) {
        soundSourceText = highPrizesSoundsSet[getRandomInt(0, highPrizesSoundsSet.length)];
    } else {
        soundSourceText = lowPrizesSoundsSet[getRandomInt(0, lowPrizesSoundsSet.length)];
    }
    soundSource.src = soundSourceText;
    soundPlayerObj.load();
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