<template>
    <div class="col-md-9 left-col">
        <div class="panel panel-default padding-md">
            <div class="panel-body">
                <h2><i class="fa fa-lock"></i> 修改密码</h2>
                <hr>
                <div class="form-horizontal" data-validator-form>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">旧 密 码</label>
                        <div class="col-sm-6">
                            <input v-model.trim="form.old_password" id="old_password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密 码</label>
                        <div class="col-sm-6">
                            <input v-model.trim="form.password" id="password" v-validator.required="{ regex: /^\w{6,16}$/, error: '密码要求 6 ~ 16 个单词字符' }" type="password" class="form-control" placeholder="请填写密码">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">确认密码</label>
                        <div class="col-sm-6">
                            <input v-model.trim="form.password_confirmation" v-validator.required="{ title: '确认密码', target: '#password' }" type="password" class="form-control" placeholder="请填写密码">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-6">
                            <button type="submit" class="btn btn-primary" @click="updatePassword">应用修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    updatePassword
} from "../../axios/call";

export default {
    name: "EditPassword",
    data() {
        return {
            form: {
                old_password: '',
                password: '',
                password_confirmation: '',
            }
        }
    },
    methods: {
        updatePassword() {
            let token = this.$store.state.token;
            updatePassword(token.access_token, this.form).then(response => {
                this.$store.dispatch('logout')
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>