import { isNullOrEmpty, formatDate } from "../scripts/functions"
import { db } from "@/firebase/firestore"

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
            this.showBirth = false
            this.uid = ""
            this.urlBlog = ""
            this.youtuCh = ""
        } else {
            //firebaseTimestamp型をyyyyMM文字列に修正する
            this.birth = formatDate(data.get('birth').toDate(), '-').slice(0, 7)
            this.blnHavProfile = true
            this.certification = data.get('certification')
            this.consulName = data.get('consulName')
            this.consultantID = data.get('consultantID')
            this.igName = data.get('igName')
            this.introduction = data.get('introduction')
            this.keyWords = data.get('keyWords')
            this.profileImgUrl = data.get('profileImgUrl')
            this.salonName = data.get('salonName')
            this.showBirth = data.get('showBirth')
            this.uid = data.get('uid')
            this.urlBlog = data.get('urlBlog')
            this.youtuCh = data.get('youtuCh')
        }
        this.documentData = {
            birth: db.Timestamp.fromDate(new Date(this.birth)),
            certification: this.certification,
            consulName : this.consulName,
            igName: this.igName,
            introduction: this.introduction,
            keyWords: this.keyWords,
            profileImgUrl: this.profileImgUrl,
            salonName: this.salonName,
            showBirth: this.showBirth,
            uid: this.uid,
            urlBlog: this.urlBlog,
            youtuCh: this.youtuCh
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
            throw e
        }
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
            throw e
        }
    }
}