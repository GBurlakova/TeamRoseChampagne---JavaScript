var boxes = startGame()[0];
var bankerOffers = startGame()[1];
var player = {hasBox: false,
              boxesOpened: 0,
              box: 0};

window.onload = function(){
    player.hasBox = false;
    player.boxesOpened = 0;
    player.box = 0;
    for (var boxId = 0; boxId < 16; boxId++) {
        var box = document.getElementById(boxId.toString());
        box.addEventListener('click', play(boxes, bankerOffers, boxId));
        box.setAttribute('class', 'closedBox');
        boxes.innerText = boxId;
    }
};



