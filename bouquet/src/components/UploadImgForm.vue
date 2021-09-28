<template>
    <div class="form-group">
        <label class="col-12">
            <p>イメージ画像(最大サイズ: {{ imgSizeStr }}MB) ファイルタイプ: .jpeg/.png</p>
            <img :src="prevImgUrl" class="img-fluid mb-1">
            <input type="file" id="img" ref="file" @change="imgSelected" class="d-block">
            <p class="errorMsg">{{ imgErrorMsg }}</p>
        </label>
    </div>
</template>
<script>
    import { checkFile, getBase64, uploadEventImage, storageNumbers } from '@/scripts/picture'

    const IMG_SIZE = 1000000

    export default {
        name: 'UploadImgForm',
        data() {
            return {
                imgErrorMsg: '',
                prevImgUrl: '',
                imgSizeStr: IMG_SIZE/ 1000000,
                imgFile: null
            }
        },
        props: {
            prNumStorage: {
                type: Number,
                default: storageNumbers.DEFAULT,
                validator: val => {
                    var check = false
                    Object.keys(storageNumbers).forEach(key => {
                        if(storageNumbers[key] == val){
                            check = true
                            return
                        }
                    })
                    return check
                }
            },
            id: {
                type: String,
                default: '',
                validator(val) {
                    return val == '' || val === 'undefined'? false: true
                }
            },
            preview: {
                type: String,
                default: ''
            }
        },
        watch: {
            preview: function (newVal) {
                this.prevImgUrl = newVal
            }
        },
        methods: {
            imgSelected: async function (event) {
                const files = event.target.files || event.dataTransfer.files
                const file = files[0]
                this.imgFile = file
                let checked = checkFile(file, IMG_SIZE)
                if(checked.result){
                    const picture = await getBase64(file)
                    this.prevImgUrl = picture
                } else {
                    this.imgErrorMsg = checked.errorMsg
                }
            },//TODO: 新規作成の際のIDの取得
            uploadImg: async function () {
                console.log('画像アップロード発火')
                switch(this.prNumStorage) {
                    case storageNumbers.EVENT: {
                        return new Promise((resolve, reject) => {
                            //TODO: 画像がアップロードされていない場合の処理
                            if(this.imgFile==null) {
                                resolve()
                            } else {
                                uploadEventImage(this.id, this.imgFile).then(url => {
                                    resolve(url)
                                }).catch(() => {
                                    reject()
                                })
                            }
                        })
                        
                    }
                }
            }
        },
        mounted() {
            this.prevImgUrl = this.preview
        }
    }
</script>