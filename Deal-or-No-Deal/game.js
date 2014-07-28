var prisez = startGame()[0];
var boxes  = new Array();
var bankerOffers = startGame()[1];
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};

window.onload = function(){
    for (var i = 0; i < 3; i++) {
        var idBox = i;
        boxes.push(document.getElementById(idBox));
    }
    for (var boxId = 0; boxId < boxes.length; boxId++) {
        boxes[boxId].onclick = play(player, bankerOffers, prisez, boxId);
        boxes[boxId].setAttribute('class', 'closedBox');
        boxes[boxId].innerText = prisez[boxId].number;
    }
};



