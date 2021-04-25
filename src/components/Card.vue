<template>
    <div>
      {{ title }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Card',
  props: {
    title: String,
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_main';
div {
  position: relative;
  margin: 10px;
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: $bg2;
  color: $fg1;
}

div:hover {
  background-color: $bg1;
}

</style>
