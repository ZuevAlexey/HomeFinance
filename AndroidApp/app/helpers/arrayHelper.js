Array.prototype.firstOrDefault = function(predicate, defaultValue = null) {
    for (let i = 0; i < this.length; i++) {
        if(predicate(this[i])){
            return this[i];
        }
    }

    return defaultValue;
};

Array.prototype.first = function(predicate) {
    for (let i = 0; i < this.length; i++) {
        let curElem = this[i];
        if(predicate(curElem)){
            return curElem;
        }
    }

    throw new Error('array doesn\'t have element for this predicate');
};

Array.prototype.asyncForEach = async function(callback) {
    for (let index = 0; index < this.length; index++) {
        await callback(this[index], index, this);
    }
}
