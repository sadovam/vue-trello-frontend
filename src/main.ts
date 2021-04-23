import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';
import router from './router';
import store from './store';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface VueConstructor {
  notify: (options: NotificationOptions | string) => void
}
Vue.config.productionTip = false;
Vue.use(Notifications);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
