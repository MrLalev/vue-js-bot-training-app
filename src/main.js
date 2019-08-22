import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import App from './App.vue';

Vue.use(VueMaterial);
Vue.use(PerfectScrollbar);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
