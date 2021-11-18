/**配列判定 */
module.exports.isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[Object Array]';
}