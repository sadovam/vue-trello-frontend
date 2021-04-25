<template>
    <div class="modal" @click="$emit('close')">
    <form @submit.prevent="addBoard" @click.stop>
      <label>New Board Name:</label>
      <input v-model.trim="name" placeholder="Type here name of new board...">
      <Spinner v-if="showSpinner"/>
      <button>Add</button>
    </form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import api from '@/api';
import Spinner from '@/components/Spinner.vue';

export default Vue.extend({
  name: 'AddBoardModal',
  data() {
    return {
      name: '',
      showSpinner: false,
    };
  },
  components: {
    Spinner,
  },
  methods: {
    addBoard() {
      // eslint-disable-next-line no-useless-escape
      if (this.name.match(/^[\d\p{L} \.,_-]+$/u) === null) {
        this.$notify({
          type: 'error',
          title: 'Uncorrect board title.',
          text: 'Title can`t be empty. It can use numbers, letters (a, A), spaces, dashes, dots, underscores.',
        });
        return;
      }
      this.showSpinner = true;
      api.post('/board', { title: this.name })
        .finally(() => {
          this.showSpinner = false;
          this.$emit('close');
        })
        .then(({ data: { result } }) => {
          if (result === 'Created') {
            this.name = '';
            this.$store.dispatch('getBoards');
          }
        }, (error) => {
          this.$notify({
            type: 'error',
            title: error.message,
            text: 'We can`t create your new board. Something is wrong. Try later or call administrator.',
          });
        });
    },
  },
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/_main';

form {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: $bg1;
  border-radius: 15px;
}

label {
  font-size: 1em;
  color: $fg1;
  font-weight: bold;
  text-shadow: 1px 1px 2px $shadow;
}

button {
  padding: 5px 15px;
  margin-top: 20px;
  border-radius: 5px;
  background-color: $bg2;
  color: $fg1;
  text-shadow: 1px 1px 2px $shadow;
  box-shadow: 2px 2px 3px $shadow;
  outline-color: transparent;
  border-color: transparent;
  font-size: 1em;
  font-weight: bold;
}

input {
  margin-top: 20px;
  border-radius: 10px;
  padding: 8px 15px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
