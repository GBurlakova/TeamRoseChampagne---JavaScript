﻿function startGame() {
    /* This is the array of all prizes, 
    // from which we randomly choose only 16 
    // at the beginning of the game.
    // Its keys represent the value of each award -
    // an integer number from 0 to 31.
    // The bigger the key, the higher 
    // the value of the reward.
    // The keys are also used 
    // to determine the offers of the banker */
    var allPrizes = {
        0: 'Eternal Bad Breath',
        1: 'Unhappiness for 5 Years',
        2: 'Broken Mirror',
        3: 'Witch\'s Curse',
        4: 'Werewolf Bite',
        5: 'Poisonous Mushroom',
        6: 'Unrequited Love',
        7: 'Flesh-eating Plant',

        8: 'Awful Dancing Skills',
        9: 'Bottle of Sea Water',
        10: 'Wooden Shoes',
        11: 'Loaf of Bread',
        12: 'Black Crow',
        13: 'Ruby Ring',
        14: 'Pearl Necklace',
        15: 'Precious Stone',

        16: 'Spell Book',
        17: 'Golden Crown',
        18: 'Treasure Map',
        19: 'Mighty Sword',
        20: 'Protection Potion',
        21: 'Wisdom Hat',
        22: 'Wings',
        23: 'Good Luck Potion',

        24: 'Mind-reading Ability',
        25: 'Time Control Ring',
        26: 'Invisibility Cloak',
        27: 'Teleportation Powder',
        28: 'Beautiful Princess',
        29: 'Untold Wealth',
        30: 'Eternal Youth Pill',
        31: 'The Goldfish'
    };

    /* This function returns an array of 16 prizes 
    // randomly chosen from an array of 32 prizes 
    // with equal number of prizes for each category. */
    function getPrizes(all) {  
        var prizes = {};
        for (var i = 0; i < 16; i++) {
            /* Get a random number - 
            // first 4 (i = 0...3) for bad prizes, 
            // second 4 (i = 4...7) for not so bad prizes, 
            // next 4 (i = 8...11) for not so good prizes, 
            // last 4 (i = 12...15) for good prizes */
            var rand = (Math.floor(Math.random() * 8) + 1) + (Math.floor(i / 4) * 8) - 1;
            
            /* If this prize has already been chosen,
            // choose another prize */
            if (prizes.hasOwnProperty(rand)) {
                i--;
                continue;
            } else {
                /* If this prize has not been chosen,
                // add it to the array of prizes */
                prizes[rand] = all[rand];
            }
        }
        return prizes;
    }
    prizes = getPrizes(allPrizes);
    //testing getPrizes()
//    console.log(prizes);

    /* This function takes all the prizes and
    // the chosen prizes via getPrizes() function
    // and puts all the prizes that are not chosen
    // in an array of prize objects.
    // This array is used for the offers of the banker. */
    function bankerPrizes(all, chosenPrizes) {
        var bankerPrizes = {};
        for (var key in all) {
            if (all.hasOwnProperty(key) && !chosenPrizes.hasOwnProperty(key)) {
                bankerPrizes[key] = all[key];
            }
        }
        return bankerPrizes;
    }

    var banker = bankerPrizes(allPrizes, prizes);
    //testing bankerPrizes()
    //console.log(banker);
    
    /* This function takes an associative array
    // of the chosen prizes
    // and returns an array of box objects.
    // Each box object has the properties:
    //  - number - from 0 to 15,
    //  - prize - the description of the prize as string,
    //  - points - the value of the prize as number 
    //  - isPlayers - boolean value, only the player's box has true,
    //  - isOpen - boolean value, if the box has been opened */
    function getBoxes(prizes) {

        /* This function takes an associative array
        // of prizes and returns them 
        // as an array of objects.
        // Each object has the properties:
        //  - prize - the description of the prize as string,
        //  - points - the value of the prize as number */
        function toArrayOfPrizes(prizes) {
            var arrayOfPrizes = [];
            for (var key in prizes) {
                var prize = {};
                prize.points = Number(key);
                prize.prize = prizes[key];
                arrayOfPrizes.push(prize);
            }
            return arrayOfPrizes;
        }

        arrayOfPrizes = toArrayOfPrizes(prizes);
        //testing toArrayOfPrizes()
        /* for this to work comment the code
        // after the console.log on the next line 
        // up to the end of getBoxes() function.
        // Note: This way you will not be able to see
        // the boxes array - if you want to test that,
        // comment the console.log on the next line */    
        //console.log(arrayOfPrizes);

        var boxes = [];
        for (var i = 0; i < 16; i++) {
            //create a new box
            var box = {};

            //get a random number for the prize(from 0 to the number of prizes left in the array)
            var rand = Math.floor(Math.random() * arrayOfPrizes.length);

            //set the properties
            box.number = i;
            box.isPlayers = false;
            box.isOpen = false;
            box.prize = arrayOfPrizes[rand].prize;
            box.points = arrayOfPrizes[rand].points;

            //delete the chosen price, so that it is not used again
            arrayOfPrizes.splice(rand, 1);

            //push to array
            boxes.push(box);
        }
        return boxes;      
    }

    var boxes = getBoxes(prizes);
    //testing getBoxes()
    console.log(boxes);

	return [boxes, banker];
}
startGame();