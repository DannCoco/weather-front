import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import vuetify from './plugins/vuetify';

Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_CLAVE_API,
    libraries: 'places' // necessary for places input
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
