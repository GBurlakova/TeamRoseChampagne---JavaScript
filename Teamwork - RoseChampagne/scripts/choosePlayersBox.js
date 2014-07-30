//This is the function thar is called when the players have to choose their own boxes in the game

function choosePlayersBox(boxesSet, currentBox, currentBoxId, playerObject, questionText){
    questionText = document.getElementById('question');
    questionText.innerText = 'Choose your box';
    boxesSet[currentBoxId].isPlayers = true;
    currentBox.removeAttribute('class');
    currentBox.setAttribute('class', 'players-box');
    currentBox.setAttribute('disabled', 'disabled');
    currentBox.innerHTML = 'My';
    playerObject.hasBox = true;
    playerObject.box = currentBoxId;
    questionText = document.getElementById('question');
    questionText.innerText = 'Select two boxes';
}