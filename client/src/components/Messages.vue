<template>
  <div class="msgs">
    <div v-if="msgs.length">
      <div
        v-for="msg in msgs"
        :key="msg.id"
      >
        <Message :msg="msg" />
      </div>
    </div>
    <p v-else>
      There are no Messages yet.
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import Message from './Message.vue';
import store from '../store/index';

export default {
  name: 'Messages',
  components: {
    Message,
  },
  computed: mapState({
    msgs: 'msgs',
  }),
  created() {
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=5')
      .then((res) => { store.commit('setMsgs', res.data); })
      .catch((err) => console.log(err));
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  display: inline-block;
  text-align: left;
  max-width: 500px;
  margin: auto;
  border-radius: 10px;
  background-color: #c0c0c0;
  color: #555;
}
.msgs {
  flex: 1 1 auto;
  margin: 10px 50px 0px 50px;
  overflow-y: scroll;
  display: flex;
  flex-flow: column-reverse;
  align-items: stretch;
  padding-top: 15px;
  background-color: #ccc;
  border-radius: 10px 10px 0px 0px;
}
::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  border-radius: 2px;
  background: #424242;
}

::-webkit-scrollbar-thumb {
  background: #151515;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #848484;
}
</style>
