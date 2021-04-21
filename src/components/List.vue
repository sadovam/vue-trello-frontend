<template>
    <div class="list">
      <h2>{{title}}</h2>
      <Card v-for="card in cards" v-bind:key="card.id" v-bind:title="card.title"/>
      <button>Add card</button>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interfaces/card';
import Card from '@/components/Card.vue';

export default Vue.extend({
  name: 'List',
  props: {
    title: String,
    cards: Object as PropType<ICard[]>,
  },
  components: {
    Card,
  },
});
</script>

<style scoped lang="scss">
.list {
  position: relative;
  margin: 10px;
  padding: 15px;
  font-size: 1em;
  border-radius: 15px;
  background-color: rgb(231, 154, 66);
  color: maroon;
}

button {
  display: block;
  position: absolute;
  bottom: 0;
  right: 0;
  outline: transparent;
  border: none;
  border-radius: 10px;
  padding: 5px 7px;
  background-color: maroon;
  color: white;
  font-weight: bold;
  font-size: 1em;
}

.list:hover {
  background-color: seagreen;
}

</style>
