<template>
    <div>
        <h2>ログイン画面</h2>
        <input type="text" placeholder="メールアドレス" v-model="email">
        <input type="password" placeholder="パスワード" v-model="password">
        <div>
            <button @click="signIn">サインイン</button>
        </div>
        <p>アカウントを持っていませんか？<br>
            <router-link to="/signup">新規アカウント登録はこちら</router-link>
        </p>
    </div>
</template>
 
<script>
import firebase from '@/firebase/firestore.js'
 
export default {
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        signIn: function () {
            firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                this.$router.push('/mypage/mypagehome')
            })
        }
    }
}
</script>