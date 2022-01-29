/**
 * コンサルタントモデルクラス
 * (firebase collection: consultants)
 */
export class Consultant {
    constructor() {
        this.birth = new Date().toString('YYYY-MM')
        //this.blnHavProfile = false
        this.certification = ""
        this.consulName = ""
        this.consultantID = "sample"
        this.igName = "",
        this.introduction = ""
        this.keyWords = ""
        this.profileImgUrl = ""
        this.salonName = ""
        this.salonID = ""
        this.showBirth = false
        this.uid = ""
        this.urlBlog = ""
        this.youtuCh = ""
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
     * @param {firebase document} doc
     * @returns true:更新完了/false:更新失敗
     */
    update = async function (doc) {
        try {
            console.log(doc)
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