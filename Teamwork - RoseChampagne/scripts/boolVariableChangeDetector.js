//This a function to detect when player's answer is expected
//or generally it helps when the boxes(buttons) have to be disabled
//If true - we disable boxes
//If not - we active them
//It will be call by its instance in the main game logic

function Bool(initialValue) {
    var bool = !!initialValue;
    var listeners = [];
    var returnVal = function(value) {
        if (arguments.length) {
            var oldValue = bool;
            bool = !!value;
            listeners.forEach(function (listener, i, list) {
                listener.call(returnVal, { oldValue: oldValue, newValue: bool });
            });
        }
        return bool
    };
    returnVal.addListener = function(fn) {
        if (typeof fn == "function") {
            listeners.push(fn);
        }
        else {
            throw "Not a function!";
        }
    };
    return returnVal;
}