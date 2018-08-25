<template>
  <v-stage :config="{height: 200, width: 200}">
    <v-layer>
      <v-rect :config="config" ref="note"></v-rect>
      <v-rect :config="borderConfig" @mouseenter="initialize" @mouseleave="mouseleave" @mousedown="mousedown" @mouseup="mouseup"></v-rect>
    </v-layer>
  </v-stage>
</template>

<script>
  import { draggable } from '@/mixins'

  export default {
    name: 'Note',
    props: {
      height: {type: Number, required: true},
      width: {type: Number, required: true},
      value: Number,
      color: {default: '#609e33'}
    },
    mixins: [draggable],
    data () {
      return {
        borderWidth: 8,
        cursor: 'ew-resize',
        in: false,
        radius: 4
      }
    },
    computed: {
      config () {
        return {
          width: this.width * this.value,
          height: this.height,
          fill: this.color,
          cornerRadius: this.radius
        }
      },
      borderConfig () {
        return {
          width: this.borderWidth,
          height: this.height,
          fill: this.in ? '#6cb62d' : this.color,
          x: this.width * this.value - this.borderWidth,
          cornerRadius: this.radius
        }
      }
    },
    methods: {
      move (e) {
        const originX = this.$refs.note.getStage().getX()
        const diff = e.clientX - originX
        const length = Math.round(diff / this.width)

        if (this.value === length) return
        if (length < 1) return
        this.$emit('input', length)
      },
      mousedown (e) {
        this.addListeners(e)
      },
      mouseup (e) {
        this.removeListeners(e)
        this.reset(true)
      },
      mouseleave () {
        this.reset()
      },
      reset (force = false) {
        if (!this.moving || force) {
          this.in = false
          this.resetCursor()
        }
      },
      initialize () {
        if (!this.moving) {
          this.in = true
          this.showCursor()
        }
      }
    }
  }
</script>
