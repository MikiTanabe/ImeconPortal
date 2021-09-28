import { fsRef } from '@/firebase/firestore'
//import { getUser } from '@/scripts/user'

export const storageNumbers = {
    DEFAULT: 0,
    EVENT: 1
}

export function checkFile(file, limit=5000000) {
    var result = true
    var errorMsg = ''
    const SIZE_LIMIT = limit
    if(!file) {
        result = false
        errorMsg += 'ファイルを選択してください/r'
    }
    if(file.type !== 'image/jpeg' && file.type !== 'image/png') {
        result = false
        errorMsg += 'JPEG、PNGのいずれかの形式のファイルを選択してください/r'
    }
    if(file.size > SIZE_LIMIT) {
        result = false
        errorMsg += 'ファイルサイズが大きすぎます。上限サイズ: ', limit/1000000 + 'MB'
    }
    return {
        result: result,
        errorMsg: errorMsg
    }
}

export async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = e => {
            reject(e)
        }
    })
}

//イベントイメージアップロード
export async function uploadEventImage(id, img) {
    return new Promise((resolve, reject) => {
        var noImage
        fsRef.child('/events/event-no-image.jpg').getDownloadURL().then(url => {
            noImage = url
        }).then(() => {
            const strageRef = fsRef.child('events/' + id)
            strageRef.put(img).then(snapShot => {
                snapShot.ref.getDownloadURL().then(url => {
                    resolve(url)
                }).catch(() => {
                    resolve(noImage)
                })
            })
        }).catch(() => {
            reject()
        })
        
    })
}