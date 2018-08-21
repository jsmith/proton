<template>
  <div class="tabs-component">
    <ul role="tablist" class="tabs-component-tabs">
      <li
          v-for="(tab, i) in tabs"
          :key="i"
          :class="{ 'is-active': tab.isActive, 'is-disabled': tab.isDisabled }"
          class="tabs-component-tab"
          role="presentation"
          v-show="tab.isVisible">
        <a v-html="tab.header"
           :aria-controls="tab.hash"
           :aria-selected="tab.isActive"
           @click="selectTab(tab.hash, $event)"
           :href="tab.hash"
           class="tabs-component-tab-a"
           role="tab"></a>
      </li>
    </ul>
    <div class="tabs-component-panels">
      <slot/>
    </div>
  </div>
</template>

<script>
  import * as expiringStorage from '../expiringStorage'

  export default {
    name: 'Tabs',
    props: {cacheLifetime: {default: 5}},

    data: () => ({
      tabs: [],
      activeTabHash: ''
    }),

    computed: {
      storageKey () {
        return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`
      }
    },

    created () {
      this.tabs = this.$children
    },

    mounted () {
      window.addEventListener('hashchange', () => this.selectTab(window.location.hash))

      if (this.findTab(window.location.hash)) {
        this.selectTab(window.location.hash)
        return
      }

      const previousSelectedTabHash = expiringStorage.get(this.storageKey)

      if (this.findTab(previousSelectedTabHash)) {
        this.selectTab(previousSelectedTabHash)
        return
      }

      if (this.tabs.length) {
        this.selectTab(this.tabs[0].hash)
      }
    },

    methods: {
      findTab (hash) {
        return this.tabs.find(tab => tab.hash === hash)
      },

      selectTab (selectedTabHash, event) {
        // See if we should store the hash in the url fragment.
        if (event) {
          event.preventDefault()
        }

        const selectedTab = this.findTab(selectedTabHash)

        if (!selectedTab) {
          return
        }

        if (selectedTab.isDisabled) {
          return
        }

        this.tabs.map(tab => {
          tab.isActive = (tab.hash === selectedTab.hash)
        })

        this.$emit('changed', { tab: selectedTab })

        this.activeTabHash = selectedTab.hash

        expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime)
      }
    }
  }
</script>

<style lang="sass" scoped>
  .tabs-component
    margin: 4em 0


  .tabs-component-tabs
    border: solid 1px #ddd
    border-radius: 6px
    margin-bottom: 5px


  .tabs-component-tabs
    border: 0
    align-items: stretch
    display: flex
    justify-content: flex-start
    margin-bottom: -1px

  .tabs-component-tab
    color: #999
    font-size: 14px
    font-weight: 600
    list-style: none
    background-color: #fff
    border: solid 1px #ddd
    border-radius: 3px 3px 0 0

  .tabs-component-tab:hover
    color: #666

  .tabs-component-tab.is-active
    color: #000
    border-bottom: solid 1px #fff
    border-left: solid 3px #33a3ff

  .tabs-component-tab.is-disabled *
    color: #cdcdcd
    cursor: not-allowed !important

  .tabs-component-tab-a
    align-items: center
    color: inherit
    display: flex
    padding: .75em 1em
    text-decoration: none

  .tabs-component-panels
    background-color: #fff
    border: solid 1px #ddd
    border-radius: 0 6px 6px 6px
    box-shadow: 0 0 10px rgba(0, 0, 0, .05)
    padding: 4em 2em
</style>