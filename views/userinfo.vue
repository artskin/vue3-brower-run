<template>
  <div class="ucenter">
    <h2>欢迎回来，{{userInfo.username}}</h2>
    <pre class="hide">{{userInfo}}</pre>
    <p>
      <button class="btn-small" @click="offSocket">断开</button>&nbsp;
      <button class="btn-small" @click="connectWS">重连</button>
    </p>
    <div class="terminal">
      <p v-for="item in msgList" :key="item.id">
        <em class="time">{{item.time}}</em><span class="tag">{{item.username}}</span>: <strong>{{item.msg}}</strong>
      </p>
    </div>
    <div class="chat-handle">
      <p>
        <textarea v-model="socket.msg" placeholder="输入消息"></textarea>
      </p>
      <p><button class="btn-big" @click="sendMsg">发送</button></p>
    </div>
  </div>
</template>
<script type="module">
const { reactive,computed,toRefs,watchEffect,onMounted,watch } = Vue;
const { useRouter, useRoute } = VueRouter

export default {
  name:'userinfo',
  setup(props,ctx){
    //const router = useRouter()
    const state = reactive({
      userInfo:{
        username:'',
        password:'',
      },
      socket:{
        msg:'',
        link:'/'
      },
      msgList:[]
    })
    const route = useRoute()
    const router = useRouter()

    const socket = io.connect('/')

    const connectWS = () => {

      socket.connect('/')

    }
    socket.on('sendToClientHistory',msgs=>{
      state.msgList = msgs
    })
    socket.on('sendToClient',msg =>{
      console.log('服务器发给客户端',msg)
      state.msgList.push(msg)
    })

    const sendMsg =() => {
      let info = {
        username:state.userInfo.username,
        time:new Date().toLocaleString('chinese',{hour12:false}),
        msg:state.socket.msg
      };
      console.log(socket)
      socket.emit('sendToServer',info)
      state.socket.msg = ''
    }
    

    const offSocket = ()=>{
      if(socket){
        socket.disconnect()
      }
    }
    // watch((val)=>{
    //   state.userInfo.id = route.query.id
    // })
    
    onMounted(()=>{
      //console.log(route.get('query'))
      state.userInfo.id = route.query.id
      getUserInfo(route.query)
    })
    const getUser = (id)=>{
      return vm.$http({
        url:`/api/userinfo?id=${id}`,
        method: 'get',
      })
    }

    const getUserInfo = ()=>{
      getUser(state.userInfo.id).then(res=>{
        console.log(res)
        if(res.code == 200){
          state.userInfo = res
        }else{
          alert(res.msg)
          vm.loginOut()
        }
        
      }).catch(err=>{
        if(err){
          
        }
      })
    }

    return {
      ...toRefs(state),
      getUserInfo,
      connectWS,
      sendMsg,
      offSocket
    }
  }
}
</script>