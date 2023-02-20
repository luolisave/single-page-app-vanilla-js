methods = {};

methods.getCurrentISODateTime = function() {
    let now = new Date();
    let isoDateTime = now.toISOString();
    return isoDateTime;
}

methods.getCurrentEpochTime = function() {
    return Date.now();
}

methods.sortObjectsByModifiedDateTimeEpoch = function(arr, sortOrder = 'asc') {
    const order = sortOrder === 'asc' ? 1 : -1;
    arr.sort((a, b) => {
        // if (!a.modifiedDateTimeEpoch) a.modifiedDateTimeEpoch = 1;
        // if (!b.modifiedDateTimeEpoch) b.modifiedDateTimeEpoch = 1;
        return order * (a.data.modifiedDateTimeEpoch - b.data.modifiedDateTimeEpoch);
    });
    return arr;
}

module.exports = {
    ...methods
}