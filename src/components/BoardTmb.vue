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

<style scoped>

</style>
