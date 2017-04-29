'use strict'

import Autocomplete from './Autocomplete.vue'

const VueAutocomplete = {
  install (Vue) {
    Vue.component('vue-autocomplete', Autocomplete)
  }
}

/**
 * When required globally
 */
if (typeof (window) !== 'undefined' && typeof (window.Vue) !== 'undefined') {
  window.Vue.use(VueAutocomplete)
}

export default VueAutocomplete
