<template>
  <div class="msg-row">
    <div
      class="msg"
      :class="{ you: msg.name.includes('ab') }"
    >
      <p>{{ msg.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
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
