methods = {};

methods.getCurrentISODateTime = function() {
    let now = new Date();
    let isoDateTime = now.toISOString();
    return isoDateTime;
}

module.exports = {
    ...methods
}