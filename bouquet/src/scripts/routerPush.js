/**
 * コンサルタントプロフィールページにプロフィールデータを渡して遷移する
 */
export function pushConsultantProfile(obj, parameter) {
    let routeName = obj.$route.path.indexOf('/mypage') > -1? 'ConsultantProfileCh': 'ConsultantProfile'
    let objLink = {
        name: routeName,
        params: {
            prObjConsultantData: Object.assign(parameter)
        }
    }

    obj.$router.push(objLink).catch(()=> {
        alert('エラーが発生しました。トップページに戻ります。')
        obj.$router.push('/')
    })
}

export function pushSalonPage(obj, parameter) {
    let routeName = obj.$route.path.indexOf('/mypage') > -1? 'SalonPageCh': 'SalonPage'
    let objLink = {
        name: routeName,
        params: {
            prObjSalon: parameter
        }
    }

    obj.$router.push(objLink).catch(()=> {
        alert('エラーが発生しました。トップページに戻ります。')
        obj.$router.push('/')
    })
}

/**
 * イベントページにイベントデータを渡して遷移する
 * @param {*} obj this
 * @param {*} parameter パラメータ
 */
export function pushEventPage(obj, parameter) {
    const routeName = obj.$route.path.indexOf('/mypage') > -1 ? 'EventPageCh' : 'EventPage'
    const objLink = {
        name: routeName,
        params: {
            prEventData: parameter
        }
    }

    obj.$router.push(objLink).catch(() => {
        alert('エラーが発生しました。トップページに戻ります。')
        obj.$router.push('/')
    })
}

/**
 * コンサルタント編集画面にコンサルタントデータを渡して遷移する
 * @param {*} obj this
 * @param {Consultant} コンサルタントデータ
 */
export function pushConsultantEdit(obj, parameter) {
    const objLink = {
        name: 'ConsultantEdit',
        params: {
            prObjConsultantData: Object.assign(parameter)
        }
    }

    obj.$router.push(objLink).catch(() => {
        alert('エラーが発生しました。トップページに戻ります。')
        obj.$router.push('/')
    })
}