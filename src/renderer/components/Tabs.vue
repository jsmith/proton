<template>
  <div class="tabs-component">
    <ul role="tablist" class="tabs-component-tabs">
      <li
          v-for="(tab, i) in tabs"
          :key="i"
          :class="{ 'is-active': tab.isActive }"
          class="tabs-component-tab"
          role="presentation"
          v-show="tab.isVisible">
        <a v-html="tab.name"
           :aria-controls="tab.hash"
           :aria-selected="tab.isActive"
           @click="selectTab(tab.hash, $event)"
           :href="tab.hash"
           class="tabs-component-tab-a"
           role="tab"></a>
        <v-icon size="13px" class="close-icon">close</v-icon>
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
      tabs: []
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
      const previousSelectedTabHash = expiringStorage.get(this.storageKey)

      if (this.findTab(previousSelectedTabHash)) {
        this.selectTab(previousSelectedTabHash)
      } else if (this.tabs.length) {
        this.selectTab(this.tabs[0].hash)
      }
    },

    methods: {
      findTab (hash) {
        return this.tabs.find(tab => tab.hash === hash)
      },

      selectTab (selectedTabHash, event) {
        if (event) {
          event.preventDefault()
        }

        const selectedTab = this.findTab(selectedTabHash)
        if (!selectedTab) {
          return
        }

        this.tabs.map(tab => {
          tab.isActive = (tab.hash === selectedTab.hash)
        })

        this.$emit('changed', { tab: selectedTab })

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
    position: relative
    color: #999
    font-size: 14px
    font-weight: 600
    list-style: none
    background-color: #fff
    width: 150px
    text-align: center
    border-left: 1px solid #ddd
    box-shadow: inset 0 -1px 0 #ddd

    &.is-active
      color: #000
      border-bottom: solid 1px #fff
      box-shadow: 3px 0 #33a3ff inset

  .tabs-component-tab-a
    align-items: center
    color: inherit
    padding: .75em 1em
    text-decoration: none
    display: block

  .tabs-component-panels
    background-color: #fff
    border: solid 1px #ddd
    box-shadow: 0 0 10px rgba(0, 0, 0, .05)
    padding: 4em 2em

  .tabs-component-tab:hover .close-icon
    transform: scale(1)
    transition-duration: .16s

  .close-icon
    top: 0.75em
    right: 0.5em
    z-index: 2
    width: 1.5em
    height: 1.5em
    line-height: 1.5
    text-align: center
    border-radius: 3px
    overflow: hidden
    transform: scale(0)
    transition: transform .08s
    position: absolute

    &:hover
      cursor: pointer
      color: #001133
      background-color: #568af2
      transform: scale(1)
      transition-duration: .16s
</style>