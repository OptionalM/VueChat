<template>
  <div class="msg-row">
    <div
      class="msg"
      :class="{ you: msg.name === username }"
    >
      <p>{{ msg.text }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Message',
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: mapState({
    username: 'username',
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.msg-row {
  position: relative;
  width: 100%;
  clear: both;
}
.msg {
  float: left;
  text-align: left;
  max-width: 500px;
  margin: 0px 30px 15px 15px;
  padding: 10px;
  border-radius: 10px 10px 10px 0px;
  background-color: #3a3a3a;
}
.msg.you {
  float: right;
  margin: 0px 15px 15px 30px;
  border-radius: 10px 10px 0px 10px;
  background-color: #a71;
}
</style>
