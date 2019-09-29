<template>
  <div class="chat">
    <h1>{{ roomName }}</h1>
    <Messages />
    <div class="input-box">
      <input
        id="Textbox"
        type="text"
        name="Textbox"
        autofocus
        @keyup.enter="sendMsg"
      >
      <button @click="sendMsg">
        Send
      </button>
    </div>
  </div>
</template>

<script>
import Messages from './Messages.vue';
import store from '../store/index';

export default {
  name: 'Chat',
  components: {
    Messages,
  },
  props: {
    roomName: {
      type: String,
      default: 'Chatroom #1',
    },
  },
  sockets: {
    msg: (data) => {
      store.commit('addMsg', data);
    },
    system(data) {
      if (data.status === 402) {
        store.commit('setJWT', '');
        this.$router.push('/login');
      }
    },
  },
  methods: {
    sendMsg() {
      const text = document.getElementsByName('Textbox')[0].value;
      if (text.length > 1) {
        this.$socket.emit('msg', text);
      }
      document.getElementsByName('Textbox')[0].value = '';
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding: 5px;
}
.chat {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
  height: calc(100% - 700px);
  max-width: 800px;
  margin: auto;
}
.input-box{
  flex: 0 1 40px;
  margin: 0px 50px 30px 50px;
  padding: 5px;
  background-color: #ccc;
  border-radius: 0px 0px 10px 10px;
  width: calc(100vw - 100px);
  max-width: 700px;
}
input[type=text] {
  width: 80%;
  max-width: 640px;
  padding: 5px;
  background-color: #3b3b3b;
  color: #cacaca;
  border: none;
  border-radius: 5px 0px 0px 5px;
}
input[type=text]:focus {
  background-color: #3f3f3f;
  border: none;
}
button {
  padding: 5px;
  width: 20%;
  max-width: 160px;
  background-color: #3b3b3b;
  color: #cacaca;
  border: none;
  border-left: 3px solid #ccc;
  border-radius: 0px 5px 5px 0px;
}
button:hover {
  background-color: #333;
  color: #cacaca;
}
button:active {
  background-color: #666;
}
</style>
