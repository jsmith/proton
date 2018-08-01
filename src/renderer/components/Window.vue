<template>
    <transition name="fade">
      <div v-show="isOpen" class="window" ref="window" v-draggable="options">
        <div class="toolbar" :ref="handle">
          <slot name="toolbar"/>
          <v-btn @click="isOpen = false" icon flat>
            <v-icon>close</v-icon>
          </v-btn>
        </div>

        <div class="content">
          <slot/>
        </div>
      </div>
    </transition>
</template>

<script>
  import { Draggable } from 'draggable-vue-directive'

  export default {
    name: 'Window',
    directives: {Draggable},
    data () {
      return {
        isOpen: true,
        handle: 'handle',
        options: {handle: undefined}
      }
    },
    mounted () {
      this.options.handle = this.$refs[this.handle]
    }
  }
</script>

<style scoped>
  .window {
    display: flex;
    flex-flow: column;
    position: absolute;
    border-radius: 4pt 4pt 0 0;
  }
  .toolbar {
    display: flex;
    flex-flow: row nowrap;
    border-radius: 4pt 4pt 0 0;
    font-family: sans-serif;
    padding: .5em;
    flex: 0 0 auto;
  }
  .title {
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .content {
    flex-grow: 1;
    padding: 0.5em;
  }
</style>