/**
 * Bigramを作成する
 * @param {string} str 
 */
 exports.makeBigram = function (str) {
    const len = 2
    const resultAry = Array.from(str)
    if (resultAry.length < len){
        // 2文字以下ならそのまま返す
        return str
    }
    let res = ''
    for (let i = 0; i <= resultAry.length - 1; i++) {
        if (resultAry[i + 1] != undefined) {
            res += resultAry[i] + resultAry[i + 1]
        }
    }

    return res
}