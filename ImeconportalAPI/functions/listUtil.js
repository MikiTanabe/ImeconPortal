/**
 * リストを日付順に並べ替える
 * @param {Array} list timestampプロパティを持つ配列
 */
module.exports.sortByTimestamp = function (list){
    const compareFunc = function (left, right){
        return new Date(left.timestamp) > new Date(right.timestamp) ? -1 : 1;
    }
    //if (left.hasOwnProperty('timestamp') && right.hasOwnProperty('timestamp')){
        list.sort(compareFunc);
        console.log(list);
    //}
};