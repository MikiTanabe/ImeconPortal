//import { sccountService } from '@/_services';

export const facebookAppId = process.env.VUE_APP_FACEBOOK_APP_ID;

export async function loginWithFacebook() {
    await loadfacebookSDK(document, "script", "facebook-jssdk");
    console.log(window.FB);
    await initFacebook();
    console.log(window.FB);
    window.FB.login(function(response) {
        if (response.authResponse) {
            alert("You are logged in &amp; cookie set");
        } else {
            alert("User cancelled login or did not fully authorize.");
        }
    });
    return false;
}

async function initFacebook() {
    window.fbAsyncInit = function () {
        window.FB.init({
            appId: facebookAppId,
            cookie: true,
            version: 'v13.0'
        });
        //この時点では存在する 変数のスコープの問題かも
        console.log(window.FB)
    };
}

async function loadfacebookSDK(d, s, id) {
    var js,
     fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src="https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}

