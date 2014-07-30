//This function will find index of the boxOpened in order to remove the right side field
//It will be called in the main game logic


function findIndexByValueAndProp(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
}