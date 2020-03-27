<template>
    <div class="row">
        <div class="col-md-4 col-md-offset-4 floating-box">
            <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">请登录</h3>
                </div>

                <div class="panel-body" data-validator-form>
                    <div class="form-group">
                        <label class="control-label">手机号</label>
                        <input
                                v-validator:input.required="{ regex: /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199)\d{8}$/, error: '手机号格式不对' }"
                                type="text"
                                class="form-control"
                                placeholder="请输入手机号"
                                v-model="form.phone"
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
                    <br>
                    <button @click="login" type="submit" class="btn btn-lg btn-success btn-block">
                        <i class="fa fa-btn fa-sign-in"></i> 登录
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login, userInfo} from "../../axios/call";
    import router from "../../router";

export default {
    name: "Login",
    data() {
        return {
            form: {
                phone: '',
                password: '',
            },
            msg: '', // 消息
            msgType: '', // 消息类型
            msgShow: false // 是否显示消息，默认不显示
        }
    },
    methods: {
        // 登录
        login() {
            login(this.form).then(response => {
                let token = this.$store.state.token;
                if (token) {
                    if (token.access_token !== response.access_token) {
                        this.$store.dispatch('theToken', response)
                    }
                } else {
                    this.$store.dispatch('theToken', response)
                }
                this.getUserInfo(response.access_token);
                this.showMsg('登录成功', 'success');
            }).catch(err => {
                this.showMsg('账号或密码错误');
                console.log(err);
            })
        },
        // 获取用户信息
        getUserInfo (token) {
            userInfo(token).then(response => {
                let localUser = this.$store.state.user;
                if (localUser) {
                    if (localUser.name !== response.name) {
                        this.$store.dispatch('login', response)
                    }
                } else {
                    this.$store.dispatch('login', response)
                }
                router.push('/')
            }).catch(err => {
                console.log(err);
            })
        },
        showMsg(msg, type = 'warning') {
            this.msg = msg
            this.msgType = type
            this.msgShow = false

            this.$nextTick(() => {
                this.msgShow = true
            })
        }
    }
}
</script>

<style scoped>

</style>