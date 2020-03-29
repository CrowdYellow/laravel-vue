<template>
    <div class="col-md-9 left-col">
        <div class="panel panel-default padding-md">
            <div class="panel-body">
                <h2><i class="fa fa-cog"></i> 编辑个人资料</h2>
                <hr>
                <div class="form-horizontal" data-validator-form>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">用户名</label>
                        <div class="col-sm-6">
                            <input
                                    v-model.trim="form.name"
                                    v-validator:input.required="{ title: '用户名', regex: /^[a-zA-Z]+\w*\s?\w*$/, error: '用户名要求以字母开头的单词字符' }"
                                    type="text"
                                    class="form-control"
                                    placeholder="请填写用户名"
                            >
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-offset-2 col-sm-6">
                            <button type="submit" class="btn btn-primary" @click="updateProfile">应用修改</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {updateUsername, userInfo} from "../../axios/call";
    import router from "../../router";

export default {
    name: "EditProfile",
    data() {
        return {
            form: {
                name: ''
            }
        }
    },
    created() {
        const user = this.$store.state.user

        if (user && typeof user === 'object') {
            const { name } = user

            this.form.name = name
        }
    },
    methods: {
        updateProfile() {
            let token = this.$store.state.token;
            updateUsername(token.access_token, this.form).then(response => {
                let localUser = this.$store.state.user;
                if (localUser) {
                    if (localUser.name !== response.name) {
                        this.$store.dispatch('login', response)
                    }
                } else {
                    this.$store.dispatch('login', response)
                }
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>