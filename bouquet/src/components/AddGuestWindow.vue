<template>
    <div>
        <blue-button :modal="true" :target="targetName">招待追加</blue-button>
        <modal-window :target="targetName" :btn2="true" :btn2Txt="'追加'" @click="click">
            <div class="content-wrapper">
                <label>
                    <p class="mb-n1">ユーザーを検索(スペースで区切って検索できます。複数選択可)</p>
                    <input type="text" v-model="strSearch" placeholder="コンサルタント名、 サロン名など" id="keyword">
                    <blue-button @click="searchClick">検索</blue-button>
                </label>
                <div class="user-list" v-show="arrUsers.length> 0">
                    <select :size="arrUsers.length < 5? arrUsers.length: 4" v-model="arrNewGuest" multiple>
                        <option v-for="user in arrUsers" :key="user.id" :value="user.id">{{ user.name }} / {{ user.salonName }}</option>
                    </select>
                </div>
                <p v-if="!booFound">該当するユーザーが存在しません。</p>
                <p v-if="hasError">ユーザーを検索中にエラーが発生しました。ウィンドウを閉じて再度お試しください。</p>
            </div>
        </modal-window>
    </div>
</template>
<script>
    import BlueButton from '@/components/BlueButton'
    import ModalWindow from '@/components/ModalWindow'
    import { db } from '@/firebase/firestore'
    import { whitespaceSplit } from '@/scripts/functions'

    export default {
        name: 'AddGuestWindow',
        components: {
            BlueButton,
            ModalWindow
        },
        data() {
            return {
                targetName: 'modal-guest',
                arrNewGuest: new Array(),
                strSearch: '',
                arrUsers: new Array(),
                booFound: true,
                hasError: false
            }
        },
        methods: {
            click: function () {
                if(this.arrNewGuest.length < 1) {
                    alert('追加するゲストユーザーを選択してください')
                } else {
                    const modalName = '#' + this.targetName
                    this.$emit('click', this.arrNewGuest.concat())
                    this.arrNewGuest.splice(0)
                    this.arrUsers.splice(0)
                    this.strSearch = ''
                    this.booFound = true
                    this.hasError = false
                    $(modalName).modal('hide')
                }
            },
            searchClick: function () {
                let arrayKeyWords = whitespaceSplit(this.strSearch)
                const docRef = db.collection('consultants')
                const query = docRef.where('keyWords', 'array-contains-any', arrayKeyWords)
                query.get().then(docSnap => {
                    console.log(docSnap.docs.length)
                    var resultArray = new Array()
                    if(docSnap.docs.length > 0){
                        this.booFound = true
                        docSnap.forEach(doc => {
                            var objUser = {
                                name: doc.get('consulName'),
                                salonName: doc.get('salonName'),
                                id: doc.get('uid')
                            }
                            resultArray.push(objUser)
                        })
                        this.arrUsers = resultArray
                        this.hasError = false
                    } else {
                        this.booFound = false
                        this.arrUsers.splice(0)
                    }
                    return false
                }).catch(() => {
                    this.hasError = true
                    return false
                })
            }
        }

    }
</script>
<style scoped>
    input#keyword {
        width: 15em;
        margin-right: 0.5em;
    }

    select {
        width: 15em;
    }

    @media screen and (min-width: 768px){
        input#keyword {
            width: 20em;
        }

        select {
            width: 20em;
        }
    }

</style>