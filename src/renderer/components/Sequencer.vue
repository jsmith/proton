<template>
  <table>
    <tr v-for="note in notes" :key="note.value" :style="styles[note.color]" class="note">
      <td v-for="i in range(16)" :key="i">
        <div :style="divStyle" @click="handleClick" @dragenter="dragenter" @dragleave="dragleave" @drop="drop" @dragover="dragover"></div>
      </td>
    </tr>
  </table>
</template>

<script>
  import { px } from '@/mixins'
  import { notes, range, BLACK, WHITE } from '@/_'

  export default {
    name: 'Sequencer',
    mixins: [px],
    props: {size: Number},
    data () {
      return {
        notes,
        color: '#212121',
        lineColor: '#000'
      }
    },
    computed: {
      divStyle () {
        return {
          borderRight: `solid 1px ${this.lineColor}`,
          ...this.hw(this.size, this.size)
        }
      },
      styles () {
        return {
          [BLACK]: {backgroundColor: this.color},
          [WHITE]: {backgroundColor: this.lighten(this.color, 2)}
        }
      }
    },
    methods: {
      range,
      handleClick (e) {
        console.log(e)
        if (!e.target.style['background-color']) {
          e.target.style['background-color'] = 'red'
          e.target.draggable = true
        } else {
          e.target.style['background-color'] = null
          e.target.draggable = false
        }
      },
      dragenter (e) {
        e.target.style['background-color'] = 'red'
      },
      dragleave (e) {
        e.target.style['background-color'] = null
      },
      drop (e) {
        e.target.style['background-color'] = 'red'
      },
      dragover: e => e.preventDefault()
    }
  }
</script>

<style scoped lang="sass">
  .sequencer
    background: #303030
    display: inline-block

  .note
    border-bottom: solid 0.5px #000

  .measure, .section
    display: flex

  table
    border-collapse: collapse
</style>