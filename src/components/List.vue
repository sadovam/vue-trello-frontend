<template>
    <div class="list">
      <input
        v-if="showTitleEdit"
        v-model.trim="newTitle"
        @blur="changeTitle"
        @keyup.enter="changeTitle"
      />
      <h4 v-else @click="showTitleEdit=true; newTitle=title">{{title}}</h4>
      <Card v-for="card in cards" v-bind:key="card.id" v-bind:title="card.title"/>
      <button>Add card</button>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interfaces/card';
import Card from '@/components/Card.vue';
import api from '@/api';

export default Vue.extend({
  name: 'List',
  props: {
    title: String,
    id: Number,
    boardId: String,
    cards: Object as PropType<ICard[]>,
  },
  data() {
    return {
      showTitleEdit: false,
      newTitle: '',
    };
  },
  components: {
    Card,
  },
  methods: {
    changeTitle() {
      if (this.newTitle === '') return;
      api.put(`/board/${this.boardId}/list/${this.id}`, { title: this.newTitle })
        .then(({ data: { result } }) => {
          if (result === 'Updated') {
            this.$store.dispatch('getBoard', { id: this.boardId });
          }
        });
      this.showTitleEdit = false;
    },
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
