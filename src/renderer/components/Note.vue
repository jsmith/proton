<template>
  <div class="note__root">
    <v-rect :config="config" ref="note" @mousedown="$emit('mousedown', $event)" @mouseup="$emit('mouseup', $event)"></v-rect>
    <v-text :config="text"></v-text>
    <v-rect :config="borderConfig" @mouseenter="initialize" @mouseleave="reset" @mousedown="addListeners"></v-rect>
  </div>
</template>

<script>
  import { draggable } from '@/mixins'

  export default {
    name: 'Note',
    props: {
      height: {type: Number, required: true},
      width: {type: Number, required: true},
      x: {type: Number, default: 0},
      y: {type: Number, default: 0},
      value: Number,
      note: String,
      color: {default: '#2b6c9e'}
    },
    mixins: [draggable],
    data () {
      return {
        borderWidth: 8,
        cursor: 'ew-resize',
        in: false,
        radius: 4,
        fontSize: 12
      }
    },
    computed: {
      config () {
        return {
          width: this.width * this.value,
          height: this.height,
          fill: this.color,
          cornerRadius: this.radius,
          x: this.x,
          y: this.y
        }
      },
      borderConfig () {
        return {
          width: this.borderWidth,
          height: this.height,
          fill: this.in ? '#5b7cb6' : this.color,
          x: this.x + this.width * this.value - this.borderWidth,
          y: this.y,
          cornerRadius: this.radius
        }
      },
      text () {
        return {
          text: this.note,
          x: this.x + 3,
          y: this.y + this.height / 2 - this.fontSize / 2 + 1, // the extra 1 makes it look better
          fill: '#fff'
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
      reset () {
        if (!this.moving) {
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
    },
    mounted () {
      if (this.value === undefined) {
        console.warn('saldfj')
      }
    }
  }
</script>
