import Vue from 'vue'
import App from './App.vue'
import VueAutocomplete from './components'

Vue.use(VueAutocomplete)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
