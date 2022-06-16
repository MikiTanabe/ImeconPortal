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
    import { checkFile, getBase64, uploadEventImage, storageNumbers, uploadProfileImage } from '@/scripts/picture'

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
            },
            changePrvImg : { 
                type: Boolean,
                default: false
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
                    if (this.changePrvImg) {
                        // 呼び出し元にファイル選択があったことを知らせる
                        this.$emit('changePrvImg', picture)
                    }
                } else {
                    this.imgErrorMsg = checked.errorMsg
                }
            },
            uploadImg: async function () {
                switch(this.prNumStorage) {
                    case storageNumbers.EVENT: {
                        try {
                            //TODO: 画像がアップロードされていない場合の処理
                            if(this.imgFile==null) {
                                return null;
                            }
                            return await uploadEventImage(this.id, this.imgFile);
                        } catch (e) {
                            console.log(e);
                            return null;
                        }
                        
                    }
                    case storageNumbers.PROFILE: {
                        try {
                            if (this.imgFile == null) {
                                return null
                            }
                            return await uploadProfileImage(this.id, this.imgFile)
                        } catch (e) {
                            console.log(e);
                            return null;
                        }
                    }
                }
            }
        },
        mounted() {
            this.prevImgUrl = this.preview
        }
    }
</script>