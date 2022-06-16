import { isNullOrEmpty, formatDate } from "../scripts/functions"

/**
 * イベントモデルクラス
 * (firebase collection: events)
 */
export class Event {
    /**
     * コンストラクタ
     * @param {firebase events document} data 
     */
    constructor(data) {
        if (isNullOrEmpty(data)) {
            this.evId = 'sample'
            this.consultantName = ""
            this.date =  new Date()
            // 未実装機能
            // this.delete = new Array()
            // this.join = new Array()
            // this.preJoin = new Array()
            this.imgUrl = ""
            this.introduction = ""
            this.salonId = ""
            this.salonName = ""
            this.title = ""
            this.txtUrl = ""
            this.uid = ""
            this.upDate = new Date()
        } else {
            //firebaseTimestamp型をyyyyMM文字列に修正する
            this.evId = data.get('evId')
            this.consultantName = data.get('consultantName')
            this.date = formatDate(data.get('date').toDate(), '-').slice(0, 7)
            this.imgUrl = data.get('imgUrl')
            this.introduction = data.get('introduction')
            this.salonId = data.get('salonId')
            this.salonName = data.get('salonName')
            this.title = data.get('title')
            this.txtUrl = data.get('txtUrl')
            this.uid = data.get('uid')
            this.upDate = data.get('upDate')
        }
        this.documentData = {
            // evId: this.evId,
            consultantName : this.consultantName,
            date: new Date(this.date),
            imgUrl: this.imgUrl,
            introduction: this.introduction,
            salonId: this.salonId,
            salonName: this.salonName,
            title: this.title,
            txtUrl: this.txtUrl,
            uid: this.uid,
            upDate: this.upDate
        }
    }

    /**
     * イベント情報を新規登録する
     * @param {firebase collection} docRef 
     * @returns true:新規登録完了/false:新規登録失敗
     */
    add = async function (docRef) {
        try {
            console.log(docRef)
            await docRef.add(this.documentData)
        } catch(e) {
            console.log(e)
            throw e
        }
    }

    /**
     * イベント情報を更新する
     * @param {firebase collection} docRef
     * @returns true:更新完了/false:更新失敗
     */
    update = async function (doc) {
        try {
            await doc.set(this.documentData, {merge: true})
        } catch(e) {
            console.log(e)
            throw e
        }
    }

    /**
     * firebase登録用データをセットする
     * @param {Event} data
     */
    setDocData = function(data) {
        // fbDataを成形する
        this.documentData = {
            // evId: data.evId,
            consultantName: data.consultantName,
            date: data.date,
            imgUrl: data.imgUrl,
            introduction : data.introduction,
            salonId: data.salonId,
            salonName: data.salonName,
            title: data.title,
            txtUrl: data.txtUrl,
            uid: data.uid,
            upDate: new Date()
        }
    }
}