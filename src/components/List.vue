<template>
    <div>
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

</style>
