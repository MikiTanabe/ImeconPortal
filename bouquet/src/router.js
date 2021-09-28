import Vue from 'vue'
import Router from 'vue-router'
import Top from '@/views/Top.vue'
import SignIn from '@/views/SignIn.vue'
import MyPage from '@/views/MyPage.vue'
import MyPageHome from '@/views/MyPageHome.vue'
import EventTop from '@/views/EventTop.vue'
import EventPage from '@/views/EventPage.vue'
import SalonPage from '@/views/SalonPage.vue'
import ConsultantProfile from '@/views/ConsultantProfile.vue'
import EventEdit from '@/views/EventEdit.vue'
import { auth } from '@/firebase/firestore'

Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Top',
            component: Top,
        },
        {
            path: '/signin',
            name: 'SignIn',
            component: SignIn,
            props: true
        },
        {
            path: '/eventpage',
            name: 'EventPage',
            component: EventPage,
            props: true
        },
        {
            path: '/salonpage',
            name: 'SalonPage',
            component: SalonPage,
            props: true
        },
        {
            path: '/consultantprofile',
            name: 'ConsultantProfile',
            component: ConsultantProfile,
            props: true
        },
        {
            path: '/mypage',
            name: 'MyPage',
            component: MyPage,
            props: true,
            children: [
                {
                    path: 'eventtop',
                    name: 'EventTop',
                    component: EventTop,
                    props: true
                },
                {
                    path: 'mypagehome',
                    name: 'MyPageHome',
                    component: MyPageHome,
                    props: true
                },
                {
                    path: 'eventpage',
                    name: 'EventPageCh',
                    component: EventPage,
                    props: true
                },
                {
                    path: 'salonpage',
                    name: 'SalonPageCh',
                    component: SalonPage,
                    props: true
                },
                {
                    path: 'consultantprofile',
                    name: 'ConsultantProfileCh',
                    component: ConsultantProfile,
                    props: true
                },
                {
                    path: 'eventedit',
                    name: 'EventEdit',
                    component: EventEdit,
                    props: true
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    let requireAuth = to.matched.some(record => record.meta.requiresAuth)
    let currentUser = auth.currentUser
    if(requireAuth) {
        //ログインされていなければマイページから、トップページにリダイレクトする
        if(currentUser) {
            next({
                path: '/',
                query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router