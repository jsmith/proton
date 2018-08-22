<template>
  <svg ref="svg">
    <template v-for="side in ['left', 'right']">
      <rect :height="height" :width="width" fill="#ddd" :style="style[side]"></rect>
      <rect :height="level" :width="width" fill="#3cb7d8" :style="style[side]"></rect>
    </template>
    <polygon :points="points" class="level" @mousedown="mousedown" @mouseup="mouseup"></polygon>
  </svg>
</template>

<script>
  export default {
    name: 'Slider',
    props: {
      height: {type: Number, default: 150},
      width: {type: Number, default: 6},
      level: {type: Number, default: 0},
      value: {type: Number, default: 0}
    },
    data () {
      return {
        style: {
          right: {x: `${this.width + 2}px`}
        }
      }
    },
    computed: {
      points () {
        const left = 2 * this.width + 6
        const right = left + 8
        const height = 16
        return `${left},${this.position} ${right},${this.position - height / 2} ${right},${this.position + height / 2}`
      },
      position () {
        return this.height - this.height * this.value / 100
      }
    },
    methods: {
      mousedown (e) {
        e.preventDefault()
        window.addEventListener('mousemove', this.mousemove)
        window.addEventListener('mouseup', this.mouseup)
      },
      mouseup (e) {
        e.preventDefault()
        window.removeEventListener('mousemove', this.mousemove)
        window.removeEventListener('mouseup', this.mouseup)
      },
      mousemove (e) {
        e.preventDefault()
        this.updatePosition(e)
      },
      updatePosition (e) {
        let volume = (this.$refs.svg.clientTop + this.height - e.offsetY)
        volume *= 100 / this.height
        volume = Math.max(Math.min(volume, 100), 0)
        this.$emit('input', volume)
      }
    }
  }
</script>

<style scoped lang="sass">
  $color: #3cb7d8

  .level
    fill: $color

    &:hover
      cursor: pointer
  svg
    overflow: visible
</style>