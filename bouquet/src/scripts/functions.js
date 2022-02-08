//指定した文字をdigitとして日付を返却する
export function formatDate ( date, strDigit ) {
    var rtnDate = ''
    var tYear = date.getFullYear()
    var tMonth = date.getMonth() + 1
    tMonth = '0' + tMonth
    tMonth = tMonth.slice(-2)
    var tDate = date.getDate()
    tDate = '0' + tDate
    tDate = tDate.slice(-2)
    rtnDate = tYear + strDigit + tMonth + strDigit + tDate
    return rtnDate
}

/**
 * YYYY-MM-DD用 文字列をDateに変換する
 * @param {String} strDate 日付文字列(YYYY-MM-DD書式)
 * @returns {Date} 日付
 **/
export function bqDateParse ( strDate ) {
    let year = strDate.substr( 0, 4 )
    let month = strDate.substr( 5, 2 ) - 1
    let date = strDate.substr( 8, 2 )
    return new Date( year, month, date)
}

//指定した日時の深夜0時を返却する
export function getMidnight ( date ) {
    let year = date.getFullYear()
    let month = date.getMonth()
    let day = date.getDate()
    let tmpDate = new Date(year, month, day, 0, 0, 0)
    return tmpDate
}

//タイムスタンプを含む配列を日付順に並び替える
export function sortObjectArrayTS (array) {
    var wkArray = array.concat()
    wkArray.sort((a, b) => {
        return a.timestamp - b.timestamp
    })
    return wkArray
}

//メニュー配列を文字列に変換する
export function generateMenuStr(objMenu){
    var menuStr = ''
    Object.keys(objMenu).forEach(key => {
        objMenu[key].forEach(menu => {
            menuStr += menu + '/'
        })
    })
    return menuStr.slice(0, -1)
}

//Objectをリアクティブにコピーする
export function copyObjectReactive(objOrigin, objCopy, instance) {
    Object.keys(objOrigin).forEach(key => {
        instance.$set(objCopy, key, objOrigin[key])
    })
}

//空白区切りの文字列を配列に変換する
export function whitespaceSplit(str) {
    //TODO: 空白文字 全角半角問わず有効にする
    var digit = /[\s\u3000]+/
    return str.split(digit)
}

//ObjectをMapに変換する
export function ObjectParseMap(obj){
    var map = new Map()
    Object.keys(obj).forEach(key => {
        map.set(key, obj[key])
    })
    return map
}

/**
 * null-undefined判定
 * @param {Object} obj 
 * @returns true: null/undefined false:not null/undefined
 */
export function isNullOrUndefined(obj) {
    return obj === undefined || obj === null
}

/**
 * null-(undefined)-empty判定
 * @param {String} str 
 * @returns true: null/undefined/empty false:not null/undefined/empty
 */
export function isNullOrEmpty(str) {
    return isNullOrUndefined(str) || str == ''
}