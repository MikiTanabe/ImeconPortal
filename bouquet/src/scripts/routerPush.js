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