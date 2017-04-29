const autoComplete = {
  methods: {
    filterContains (text, input) {
      return RegExp(this.regExpEscape(input.trim()), 'i').test(text)
    },

    filterStartsWith (text, input) {
      return RegExp('^' + this.regExpEscape(input.trim()), 'i').test(text)
    },

    sortByLength (a, b) {
      if (a.length !== b.length) {
        return a.length - b.length
      }

      return a < b ? -1 : 1
    },

    regExpEscape (s) {
      return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')
    }
  }
}

export default autoComplete
