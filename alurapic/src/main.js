import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/transform';
import VeeValidate from 'vee-validate';
import msg from './pt_BR';

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: msg
    }
  }
});

Vue.use(VueRouter); //registrado

// criar um router com base nas rotas com auxilio do veu-router
const router = new VueRouter({
  routes, // cria uma instancia de router passando por parametro minhas rota
  mode: 'history'  // para tirar o # do navegador
});

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router, // associa a Vue instance para usar em todos os lugares da aplicação
  render: h => h(App)
})