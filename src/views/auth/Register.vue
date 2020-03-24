<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <ul class="nav nav-tabs nav-justified">
                        <li
                                role="presentation"
                                v-for="(item, index) in step"
                                :class="{ active: index === activeNavIndex }"
                        >
                            <a href="javascript:return false;">{{ item }}</a>
                        </li>
                    </ul>
                </div>

                <div class="panel-body" v-if="activeNavIndex === 0">
                    <div class="form-group">
                        <label class="control-label">手机号</label>
                        <input type="text" class="form-control" v-model="form.phone" placeholder="请输入手机号">
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="getCaptcha">
                        <i class="fa fa-btn fa-sign-in"></i> 获取图片验证码
                    </button>
                </div>

                <div class="panel-body" v-if="activeNavIndex === 1">
                    <div class="form-group">
                        <label class="control-label">图片验证码</label>
                        <input v-model="form.captcha_code" type="text" class="form-control" placeholder="请填写验证码">
                    </div>
                    <div class="thumbnail" title="点击图片重新获取验证码">
                        <div class="captcha"><img :src="img" alt="点击图片重新获取验证码"></div>
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="getVerificationCodes">
                        <i class="fa fa-btn fa-sign-in"></i> 填写用户信息
                    </button>
                </div>

                <div class="panel-body" v-if="activeNavIndex === 2">
                    <div class="form-group">
                        <label class="control-label">用户名</label>
                        <input type="text" v-model="form.name" class="form-control" placeholder="请填写用户名">
                    </div>
                    <div class="form-group">
                        <label class="control-label">手机号</label>
                        <input type="text" v-model="form.phone" class="form-control" placeholder="请填写手机号">
                    </div>
                    <div class="form-group">
                        <label class="control-label">验证码</label>
                        <input type="text" v-model="form.verification_code" class="form-control" placeholder="请填写手机验证码">
                    </div>
                    <div class="form-group">
                        <label class="control-label">密码</label>
                        <input type="text" v-model="form.password" class="form-control" placeholder="请填写密码">
                    </div>
                    <div class="form-group">
                        <label class="control-label">确认密码</label>
                        <input type="text" v-model="form.password" class="form-control" placeholder="请再次输入密码">
                    </div>
                    <button type="submit" class="btn btn-lg btn-success btn-block" @click="userRegister">
                        <i class="fa fa-btn fa-sign-in"></i> 提交信息
                    </button>
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
            activeNavIndex: 0,
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
                password: ''
            },
            img: ''
        }
    },
    methods: {
        getCaptcha () {
            post(FRONTEND_CAPTCHA, this.form).then(response => {
                this.form.captcha_key = response.captcha_key
                this.img = response.captcha_image_content
                this.activeNavIndex = 1
                console.log(response);
            }).catch(err => {
                console.log(response);
            })
        },
        getVerificationCodes () {
            post(FRONTEND_VERIFICATION, this.form).then(response => {
                this.form.verification_key = response.key;
                this.activeNavIndex = 2;
                console.log(response);
            }).catch(err => {
                console.log(response);
            })
        },
        userRegister () {
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
</style>