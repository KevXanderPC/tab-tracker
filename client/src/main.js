// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {sync} from 'vuex-router-sync'
import store from '@/store/store'
import VueYouTubeEmbed from 'vue-youtube-embed'
import LazyYoutube from "vue-lazytube";
import Panel from "@/components/globals/Panel"
import VueLocalStorage from 'vue-localstorage'




Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(VueYouTubeEmbed)
Vue.use(LazyYoutube);
Vue.use(VueLocalStorage);
Vue.component('panel',Panel)

sync(store,router)

/* eslint-disable no-new */
new Vue({
  vuetify : new Vuetify(),
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  beforeCreate() {
    this.$store.commit('initialiseStore')
	}
  // beforeCreate() {
  //   this.$store.dispatch('removeStore')
	// }
})
