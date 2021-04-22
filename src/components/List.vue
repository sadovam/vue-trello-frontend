<template>
    <div class="list">
      <Loader v-if="showLoader"/>
      <input
        v-if="showTitleEdit"
        v-model.trim="newTitle"
        @blur="changeTitle"
        @keyup.enter="changeTitle"
      />
      <h4 v-else  @click="showTitleEdit=true; newTitle=title">{{title}}</h4>
      <Card v-for="card in cards" v-bind:key="card.id" v-bind:title="card.title"/>
      <AddCard
        v-if="showAddCard"
        :boardId="boardId"
        :listId="id"
        :cardPosition="Object.keys(cards).length"
        @close="showAddCard=false"
      />
      <button v-else @click="showAddCard=true">Add card</button>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { ICard } from '@/common/interfaces/card';
import Card from '@/components/Card.vue';
import AddCard from '@/components/AddCard.vue';
import api from '@/api';
import Loader from '@/components/Loader.vue';

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
      showAddCard: false,
      showLoader: false,
    };
  },
  components: {
    Card,
    AddCard,
    Loader,
  },
  methods: {
    changeTitle() {
      if (this.newTitle === '') return;
      this.showLoader = true;
      api.put(`/board/${this.boardId}/list/${this.id}`, { title: this.newTitle })
        .finally(() => {
          this.showLoader = false;
          this.showTitleEdit = false;
        })
        .then(({ data: { result } }) => {
          if (result === 'Updated') {
            this.$store.dispatch('getBoard', { id: this.boardId });
          }
        }, (error) => {
          console.log('Error', error.response.data);
        });
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
