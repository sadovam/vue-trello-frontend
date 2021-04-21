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
div {
  position: relative;
  margin: 10px;
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: rgb(11, 119, 114);
  color: maroon;
}

div:hover {
  background-color: rgb(19, 82, 46);
}

</style>
