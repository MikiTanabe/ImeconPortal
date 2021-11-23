/**
 * リストを日付順に並べ替える
 * @param {Array} list timestampプロパティを持つ配列
 */
module.exports.SortByTimestamp = function (list){
    const compareFunc = function (left, right){
        return left.timestamp < right.timestamp;
    }
    //if (left.hasOwnProperty('timestamp') && right.hasOwnProperty('timestamp')){
        list.sort(compareFunc);
    //}
};