<template>
  <header class="header">
    <h1>Chat App</h1>
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      <span>|</span>
      <router-link to="/login">
        Select a Username
      </router-link>
      <span>|</span>
      <router-link to="/about">
        About
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
  .header {
    background-color: #111;
    color: #bbb;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 5px;
    border-bottom: 2px solid #aaa;
  }

  .header a {
    color: #999;
    padding-right: 5px;
    padding-left: 5px;
    text-decoration: none;
  }
</style>
