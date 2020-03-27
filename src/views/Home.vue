<template>
  <div class="home">
    <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data() {
    return {
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  beforeRouteEnter(to, from, next) {
    const fromName = from.name
    console.log(from);

    next(vm => {
      if (vm.$store.state.token.access_token) {
        switch (fromName) {
          case 'Register':
            vm.showMsg('注册成功');
            break
        }
      }
    })
  },
  methods: {
    showMsg(msg, type = 'success') {
      this.msg = msg
      this.msgType = type
      this.msgShow = true
    }
  },
  components: {
    // HelloWorld
  }
}
</script>
