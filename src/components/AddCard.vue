<template>
    <div>
    <input
          placeholder="Type here title of new card..."
          v-model.trim="newTitle"
          @keyup.enter="addCard"
    />
    <Loader v-if="showLoader"/>
    <button @click="addCard">Create</button>
    <button @click="$emit('close')" >Cancel</button>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';
import Loader from '@/components/Loader.vue';

export default Vue.extend({
  name: 'AddCard',
  props: ['boardId', 'listId', 'cardPosition'],
  data() {
    return {
      newTitle: '',
      showLoader: false,
    };
  },
  components: {
    Loader,
  },
  methods: {
    addCard() {
      if (this.newTitle === '') return;
      api.post(`/board/${this.boardId}/card`,
        { title: this.newTitle, position: this.cardPosition, list_id: this.listId })
        .finally(() => {
          this.showLoader = false;
          this.$emit('close');
        })
        .then(({ data: { result } }) => {
          if (result === 'Created') {
            this.newTitle = '';
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
div {
  padding: 20px;
  align-items: center;
  background-color: cadetblue;
  border-radius: 25px;
}

input, h3 {
  margin: 7px;
}

button {
  display: inline-block;
  margin: 5px;
}

</style>
