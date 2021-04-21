<template>
    <div>
      <h2>{{ title }}</h2>
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
div {
  margin: 15px;
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: lightseagreen;
  height: 7em;
}

div:hover {
  background-color: seagreen;
}
</style>
