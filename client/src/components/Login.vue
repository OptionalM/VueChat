<template>
  <div class="login">
    <h1>Login</h1>
    <div class="input-box">
      <input
        id="Textbox"
        type="text"
        name="Textbox"
        placeholder="Type Username Here..."
        autofocus
        @keyup.enter="login"
      >
      <button @click="login">
        Commit
      </button>
      <br v-if="userError">
      <br v-if="userError">
      <span v-if="userError">
        Wrong Username or Password.
      </span>
    </div>
  </div>
</template>

<script>
import store from '../store/index';

export default {
  name: 'Login',
  data() {
    return { userError: false };
  },
  sockets: {
    system(data) {
      if (data.status === 200) {
        this.$router.push('/')
          .catch((e) => { console.log(e); });
      } else {
        this.showError();
      }
    },
  },
  methods: {
    login() {
      const username = document.getElementsByName('Textbox')[0].value;
      if (username.length > 1) {
        store.dispatch('fetchJWT', { username, password: '' })
          .then(() => this.$socket.emit('auth', store.getters.jwt))
          .catch(() => this.showError());
      }
      document.getElementsByName('Textbox')[0].value = '';
    },
    showError() {
      this.userError = true;
      setTimeout(() => { this.userError = false; }, 3000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  padding: 5px;
}
.login {
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
span {
  color: #ff0000;
}
</style>
