<template>
  <div class="select-username">
    <h1>{{ roomName }}</h1>
    <div class="input-box">
      <input
        id="Textbox"
        type="text"
        name="Textbox"
        placeholder="Type Username Here..."
        autofocus
        @keyup.enter="setUsername"
      >
      <button @click="setUsername">
        Commit
      </button>
    </div>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Chat',
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
    redirect(data) {
      if (data.status === 200) {
        store.commit('setUsername', data.payload);
        this.$router.push('/');
      }
    },
  },
  methods: {
    setUsername() {
      const name = document.getElementsByName('Textbox')[0].value;
      if (name.length > 1) {
        this.$socket.emit('name', name);
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
.select-username {
  flex: 1 1 auto;
  display: flex;
  flex-flow: column;
  height: calc(100% - 700px);
  max-width: 800px;
  margin: auto;
  align-items: center;
  justify-content: center;
}
.input-box{
  flex: 0 1 40px;
  margin: 0px 50px 30px 50px;
  padding: 20px;
  background-color: #ccc;
  border-radius: 20px;
  width: calc(100vw - 100px);
  max-width: 700px;
}
input[type=text] {
  font-size: 22pt;
  width: 60%;
  max-width: 640px;
  padding: 15px;
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
  font-size: 22pt;
  padding: 15px;
  width: 40%;
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
