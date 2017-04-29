<template>
    <div id="vue-autocomplete">
        <input tabindex="1" type="text" autocomplete="off" class="vue-autocomplete"
               aria-autocomplete="vue-autocomplete-list" v-model.trim="query"
               @input="update"
               @keydown.down="down"
               @keydown.up="up"
               @keyup.esc="clear"
               @keydown.enter.prevent="enter"
               @blur="reset"/>
        <ul id="auto-list" class="vue-autocomplete-list" v-show="hasItems">
            <li v-for="(item, idx) in filteredItems" :aria-selected="idx == index" >{{ item }}</li>
        </ul>
    </div>
</template>

<script>
  import Vue from 'vue'
  import Axios from 'axios'

  import autoComplete from './autoComplete.js'

  Vue.prototype.$http = Axios

  export default {
    name: 'vue-autocomplete',
    mixins: [autoComplete],
    data () {
      return {
        query: '',
        items: [],
        index: -1,
        config: {
          url: 'http://localhost:3000/langs',
          minChars: 2,
          maxItems: 10
        }
      }
    },
    computed: {
      hasItems () {
        return this.filteredItems.length > 0
      },
      filteredItems () {
        return this.items
          .filter(item => { return this.filterContains(item, this.query) })
          .slice(0, this.config.maxItems)
          .sort(this.sortByLength)
      }
    },
    methods: {
      update (evt) {
        if (!this.query) return this.reset()
        if (this.config.minChars && this.query.length < this.config.minChars) return

        this.fetch().then(response => {
          this.items = response.data
        })
      },
      down () {
        const count = this.filteredItems.length
        this.index = this.index < count - 1 ? this.index + 1 : (count ? 0 : -1)
      },
      up () {
        const count = this.filteredItems.length
        const pos = this.index - 1
        this.index = pos !== -1 ? pos : count - 1
      },
      enter () {
        if (!this.query) {
          this.items = []
          return
        }
        this.query = this.filteredItems[this.index]
        this.items = []
      },
      reset () {
        this.items = []
        this.index = -1
      },
      fetch () {
        return this.$http.get(this.config.url)
      }
    }
  }
</script>

<style lang="scss">
    #vue-autocomplete {
        font-family: "Helvetica Neue", Helvetica, "Segoe UI", Tahoma, Arial, sans-serif;
        font-size: 14px;
        color: #4e4e4e;

        input[type=text] {
            font-size: 14px;
            -webkit-transition: all 0.30s ease-in-out;
            -moz-transition: all 0.30s ease-in-out;
            -ms-transition: all 0.30s ease-in-out;
            -o-transition: all 0.30s ease-in-out;
            outline: none;
            padding: 3px 0px 3px 3px;
            margin: 5px 1px 3px 0px;
            border: 1px solid #DDDDDD;
            width: 100%;
        }

        input[type=text]:focus {
            box-shadow: 0 0 5px rgba(81, 203, 238, 1);
            padding: 3px 0px 3px 3px;
            margin: 5px 1px 3px 0px;
            border: 1px solid rgba(81, 203, 238, 1);
        }

        ul {
            margin: 0;
            padding-left: .8em;
        }

        ul {
            position: absolute;
            left: 0;
            z-index: 1;
            min-width: 100%;
            box-sizing: border-box;
            list-style: none;
            padding: 0;
            margin: 0;
            background: #fff;
        }

        ul {
            border-radius: .3em;
            margin: .2em 0 0;
            background: hsla(0, 0%, 100%, .9);
            background: linear-gradient(to bottom right, white, hsla(0, 0%, 100%, .8));
            border: 1px solid rgba(0, 0, 0, .3);
            box-shadow: .05em .2em .6em rgba(0, 0, 0, .2);
            text-shadow: none;
        }

        @supports (transform: scale(0)) {
            ul {
                transition: .3s cubic-bezier(.4, .2, .5, 1.4);
                transform-origin: 1.43em -.43em;
            }

            ul[hidden],
            ul:empty {
                opacity: 0;
                transform: scale(0);
                display: block;
                transition-timing-function: ease;
            }
        }

        /* Pointer */
        ul:before {
            content: "";
            position: absolute;
            top: -.43em;
            left: 1em;
            width: 0;
            height: 0;
            padding: .4em;
            background: white;
            border: inherit;
            border-right: 0;
            border-bottom: 0;
            -webkit-transform: rotate(45deg);
            transform: rotate(45deg);
        }

        ul > li {
            position: relative;
            padding: .2em .5em;
            cursor: pointer;
        }

        ul > li:hover {
            background: hsl(200, 40%, 80%);
            color: black;
        }

        ul > li[aria-selected="true"] {
            background: rgba(81, 203, 238, 1);
            color: white;
        }

        mark {
            background: hsl(65, 100%, 50%);
        }

        li:hover mark {
            background: hsl(68, 100%, 41%);
        }

        li[aria-selected="true"] mark {
            background: hsl(86, 100%, 21%);
            color: inherit;
        }

        ul > li {
            position: relative;
            padding: .2em .5em;
            cursor: pointer;
        }
    }
</style>
