<template>
  <div class="login">
    <h1>Login</h1>
    <div class="input-box">
      <input
        id="UsernameBox"
        type="text"
        name="UsernameBox"
        placeholder="Type Username Here..."
        autofocus
        @keyup.enter="login"
      >
      <input
        id="PasswordBox"
        type="password"
        name="PasswordBox"
        placeholder="Type Password Here..."
        autofocus
        @keyup.enter="login"
      >
      <button @click="login">
        Login
      </button>
      <button @click="register">
        Register
      </button>
      <br v-if="showError">
      <br v-if="showError">
      <span v-if="showError">
        {{ errorMsg }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import store from '../store/index';

export default {
  name: 'Login',
  data() {
    return {
      showError: false,
      errorMsg: 'Wrong Username or Password.',
    };
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
  mounted() {
    if (this.$route.params.msg !== undefined) {
      this.displayError(5000, this.$route.params.msg);
    }
  },
  methods: {
    login() {
      const username = document.getElementsByName('UsernameBox')[0].value;
      const password = document.getElementsByName('PasswordBox')[0].value;
      if (username.length > 0 && password.length > 0) {
        store.dispatch('fetchJWT', { username, password })
          .then(() => this.$socket.emit('auth', store.getters.jwt))
          .catch(() => this.displayError(3000));
      } else {
        this.displayError(3000, 'Please enter a Username and Password.');
      }
    },
    register() {
      const username = document.getElementsByName('UsernameBox')[0].value;
      const password = document.getElementsByName('PasswordBox')[0].value;
      if (username.length > 0 && password.length > 0) {
        axios.post(`http://localhost:${process.env.VUE_APP_API_PORT}/register`, { username, password })
          .then((res) => {
            console.log(res);
          })
          .catch((e) => { console.log(e); });
      } else {
        this.displayError(3000, 'Please enter a Username and Password.');
      }
    },
    displayError(timer, msg = 'Wrong Username or Password.') {
      this.showError = true;
      this.errorMsg = msg;
      setTimeout(() => { this.showError = false; }, timer);
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
input {
  font-size: 22pt;
  width: 100%;
  max-width: 640px;
  padding: 15px;
  background-color: #3b3b3b;
  color: #cacaca;
  border: none;
  border-radius: 5px;
  margin-bottom: 5px;
}
input:focus {
  background-color: #3f3f3f;
  border: none;
}
button {
  font-size: 22pt;
  padding: 15px;
  width: calc(50% - 15px);
  margin: 5px;
  background-color: #3b3b3b;
  color: #cacaca;
  border: none;
  border-radius: 5px;
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
