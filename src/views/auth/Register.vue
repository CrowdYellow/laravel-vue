<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3>请注册</h3>
                </div>

                <div class="panel-body">
                    <div class="form-group">
                        <label class="control-label">用户名</label>
                        <input
                                v-validator:input.required="{ regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }"
                                type="text"
                                class="form-control"
                                placeholder="请填写用户名"
                                v-model="form.name"
                        >
                    </div>
                    <div class="form-group">
                        <label class="control-label">手机号</label>
                        <div class="row">
                            <div class="col-sm-8">
                                <input
                                        v-validator:input.required="{ regex: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/, error: '手机号格式不对' }"
                                        type="text"
                                        class="form-control"
                                        placeholder="请输入手机号"
                                        v-model="form.phone"
                                >
                            </div>
                            <div class="col-sm-4">
                                <button type="button" class="btn btn-primary" @click="getCaptcha">
                                    获取验证码
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="control-label">验证码</label>
                        <input
                                v-validator.required="{ title: '请填写手机验证码' }"
                                v-model="form.verification_code"
                                type="text"
                                class="form-control"
                                placeholder="请填写手机验证码"
                        >
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码</label>
                        <input
                                id="password"
                                v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }"
                                v-model="form.password"
                                type="password"
                                class="form-control"
                                placeholder="请填写密码"
                        >
                    </div>
                    <div class="form-group">
                        <label class="control-label">确认密码</label>
                        <input
                                v-validator.required="{ target: '#password' }"
                                v-model="form.password_confirmation"
                                type="password"
                                class="form-control"
                                placeholder="请再次输入密码"
                        >
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="userRegister">
                        提交信息
                    </button>
                </div>
            </div>
            <div v-if="captcha.isShow" class="top-up">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">获取手机验证码</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="control-label">图片验证码</label>
                                <input v-validator.required="{ title: '图片验证码' }" v-model="form.captcha_code" type="text" class="form-control" placeholder="请填写验证码">
                            </div>
                            <div class="thumbnail" title="点击图片重新获取验证码">
                                <div class="captcha">
                                    <img :src="captcha.img" alt="点击图片重新获取验证码" @click="getCaptcha">
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="captcha.isShow = false">关闭</button>
                            <button type="button" class="btn btn-primary" @click="getVerificationCodes">获取手机验证码</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    post
} from "../../axios";
import {
    FRONTEND_CAPTCHA,
    FRONTEND_REGISTER,
    FRONTEND_VERIFICATION
} from "../../axios/api";

export default {
    name: 'Register',
    data () {
        return {
            step: [
                '第一步：填写手机号',
                '第二步：输入手机验证码',
                '第三步：填写账号信息',
            ],
            form: {
                phone: '',
                captcha_key: '',
                captcha_code: '',
                verification_key: '',
                verification_code: '',
                name: '',
                password: '',
                password_confirmation: ''
            },
            captcha: {
                isShow: false,
                img: ''
            },

        }
    },
    methods: {
        getCaptcha () {
            if (!this.form.phone) {
                alert('请填写手机号');
                return false;
            }
            post(FRONTEND_CAPTCHA, this.form).then(response => {
                this.form.captcha_key = response.captcha_key
                this.captcha.img = response.captcha_image_content
                this.captcha.isShow = true
                console.log(response);
            }).catch(err => {
                console.log(response);
            })
        },
        getVerificationCodes () {
            if (!this.form.captcha_code) {
                alert('请填写图片验证码');
                return false
            }
            post(FRONTEND_VERIFICATION, this.form).then(response => {
                this.form.verification_key = response.key;
                this.captcha.isShow = false;
                console.log(response);
            }).catch(err => {
                console.log(response);
            })
        },
        userRegister () {
            if (!this.form.name || !this.form.phone || !this.form.verification_code || !this.form.password || !this.form.password_confirmation) {
                alert('请将信息补充完整');
                return false;
            }
            post(FRONTEND_REGISTER, this.form).then(response => {
                console.log(response);
            }).catch(err => {
                console.log(response);
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .thumbnail { width: 170px; margin-top: 10px; cursor: pointer;}
    .thumbnail .captcha { height: 46px; background: #E1E6E8;}
    .nav-tabs > li:not(:first-child) > a:hover {
        border-color: #fff #fff #ddd;
    }
    .nav > li > a:hover, .nav > li > a:focus {
        text-decoration: none;
        background-color: #fff;
    }
    a:hover, a:focus {
        color: #05a1a2;
        text-decoration: underline;
    }
    .captcha { font-size: 24px; font-weight: bold; user-select: none; img {
        width: 100%;
        height: 100%;
    }}
    .top-up {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: block;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        transition: opacity .15s linear;
        background-color: rgba(0,0,0,.3);
    }
</style>