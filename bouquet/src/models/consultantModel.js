import { isNullOrEmpty } from "../scripts/functions"

/**
 * コンサルタントモデルクラス
 * (firebase collection: consultants)
 */
export class Consultant {
    /**
     * コンストラクタ
     * @param {firebase consultants document} data 
     */
    constructor(data) {
        if (isNullOrEmpty(data)) {
            this.birth =  new Date().toString('YYYY-MM')
            this.blnHavProfile = false
            this.certification = ""
            this.consulName = ""
            this.consultantID = "sample"
            this.igName = "",
            this.introduction = ""
            this.keyWords = ""
            this.profileImgUrl = ""
            this.salonName = ""
            //this.salonID = ""
            this.showBirth = false
            this.uid = ""
            this.urlBlog = ""
            this.youtuCh = ""
        } else {
            this.birth = data.get('birth')
            this.blnHavProfile = true
            this.certification = data.get('certification')
            this.consulName = data.get('consulName')
            this.consultantID = data.get('consultantID')
            this.igName = data.get('igName')
            this.introduction = data.get('introduction')
            this.keyWords = data.get('keyWords')
            this.profileImgUrl = data.get('profileImgUrl')
            this.salonName = data.get('salonName')
            //this.salonID = data.get('salonID')
            this.showBirth = data.get('showBirth')
            this.uid = data.get('uid')
            this.urlBlog = data.get('urlBlog')
            this.youtuCh = data.get('youtuCh')
        }
    }

    /**
     * コンサルタントプロフィールを新規登録する
     * @param {firebase collection} docRef 
     * @returns true:新規登録完了/false:新規登録失敗
     */
    add = async function (docRef) {
        try {
            console.log(docRef)
            await docRef.add(this.documentData)
        } catch(e) {
            console.log(e)
            return false
        }
        return true
    }

    /**
     * コンサルタントプロフィールを更新する
     * @param {firebase collection} docRef
     * @param {Integer} id
     * @returns true:更新完了/false:更新失敗
     */
    update = async function (doc) {
        try {
            console.log('更新対象データ: ', this.documentData)
            await doc.set(this.documentData, {merge: true})
        } catch(e) {
            console.log(e)
            return false
        }
        return true
    }

    /**
     * firebase consultant data
     */
    //TODO: undefined プロパティの書き方調査
    documentData = {
        birth: this.birth,
        certification: this.certification,
        consulName : this.consulName,
        igName: this.igName,
        introduction: this.introduction,
        keyWords: this.keyWords,
        profileImgUrl: this.profileImgUrl,
        salonName: this.salonName,
        salonID: this.salonID,
        showBirth: this.showBirth,
        uid: this.uid,
        urlBlog: this.urlBlog,
        youtuCh: this.youtuCh
    }
}