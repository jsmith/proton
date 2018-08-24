<template>
  <svg ref="svg">
    <rect :height="height" :width="width" :fill="bg"></rect>
    <rect :height="leftHeight" :y="getPosition(leftHeight)" :width="width" :fill="fg"></rect>

    <rect :height="height" :width="width" :fill="bg" :style="style"></rect>
    <rect :height="rightHeight" :y="getPosition(rightHeight)" :width="width" :fill="fg" :style="style"></rect>

    <polygon :points="points" class="level" @mousedown="mousedown" @mouseup="mouseup"></polygon>
  </svg>
</template>

<script>
  export default {
    name: 'Slider',
    props: {
      height: {type: Number, default: 150},
      width: {type: Number, default: 6},
      right: {type: Number, default: 0},
      left: {type: Number, default: 0},
      value: {type: Number, default: 0}
    },
    data () {
      return {
        style: {x: `${this.width + 2}px`},
        bg: '#ddd',
        fg: '#3cb7d8'
      }
    },
    computed: {
      points () {
        const width = 8
        const height = 16

        const left = 2 * this.width + 6
        const right = left + width

        return `${left},${this.position} ${right},${this.position - height / 2} ${right},${this.position + height / 2}`
      },
      position () {
        return this.height - this.height * this.value / 100
      },
      rightHeight () {
        return this.right * this.height / 100
      },
      leftHeight () {
        return this.left * this.height / 100
      }
    },
    methods: {
      mousedown (e) {
        e.preventDefault()
        document.documentElement.style.cursor = 'pointer'
        window.addEventListener('mousemove', this.mousemove)
        window.addEventListener('mouseup', this.mouseup)
      },
      mouseup (e) {
        e.preventDefault()
        document.documentElement.style.cursor = 'default'
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
      },
      getPosition (level) {
        return this.height - level
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