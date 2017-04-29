import Vue from 'vue'
import Hello from '@/components/Hello'

describe('Autocomplete.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Hello)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
      .to.equal('Welcome to your Vue.js plugin')
  })
})