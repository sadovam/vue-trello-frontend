<template>
    <div>
      <h2>{{ title }}</h2>
      <hr>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BoardTmb',
  props: ['title'],
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_main';
div {
  height: 9em;
  min-width: 11em;
  margin: 15px;
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: $bg2;
  box-shadow: 2px 2px 4px $shadow;
  transition: background-color 0.3s
}

h2 {
  padding: 5px 15px;
  border-radius: 10px;
  background-color: $bg1;
  box-shadow: -2px -2px 1px $shadow;
  font-size: 1.2em;
  transition: background-color 0.3s;
}

div:hover {
  background-color: $bg1;
}

div:hover > h2 {
  background-color: $bg2;
  box-shadow: 2px 2px 1px $shadow;
}

hr {
  width: 70%;
  height: 0.3em;
  margin-top: 3em;
  background-color: $bg1;
  box-shadow: 1px 1px 2px $shadow;
  border: none;
  border-radius: 0.3em;
}
</style>
