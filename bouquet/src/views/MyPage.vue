<template>
    <div>
        <div class="mypage-container">
            <div class="medium-menubar d-none d-md-block">
                <menu-left-bar />
            </div>
            <div class="mypage-content">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script>
    import MenuLeftBar from '@/components/MenuLeftBar'
    import firebase from '@/firebase/firestore'

    export default {
        name: 'MyPage',
        components: {
            MenuLeftBar
        },
        mounted() {
            firebase.auth().onAuthStateChanged(user => {
                if(!user){
                    this.$router.push('/signin')
                }
            })
        }
    }
</script>
<style scoped>
    .mypage-container {
        display: block;
        padding-top: 1em;
    }

    .medium-menubar {
        
    }

    .mypage-content {
        
    }

    @media screen and (min-width: 768px){
        .mypage-container {
            display: grid;
            grid-template-columns: 15% 85%;
            grid-template-rows: 100%;
        }
    }
</style>