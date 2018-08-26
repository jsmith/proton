<template>
  <v-stage :config="{height: 200, width: total * width}">
    <v-layer>
      <!--<note v-for="note in notes" :height="16" :width="20"></note>-->
    </v-layer>
    <v-layer>
      <div v-for="(note, row) in notes" :key="note.value">
        <template v-for="col in total">
          <v-rect :key="col" :config="divStyle(row, col - 1, note.color)" @click="handleClick(row, col - 1)"></v-rect>
        </template>
      </div>
    </v-layer>
    <v-layer>
      <template v-for="col in total">
        <v-line :config="border(col)"></v-line>
      </template>
    </v-layer>
    <v-layer>
      <note v-for="(note, i) in placed" :key="i" :height="height" :width="width" :x="note.x" :y="note.y" v-model="note.length"></note>
    </v-layer>
  </v-stage>
  <!--<table>-->
    <!--<tr v-for="note in notes" :key="note.value" :style="styles[note.color]" class="note">-->
      <!--<td v-for="i in range(16)" :key="i">-->
        <!--<div :style="divStyle" @click="handleClick" @dragenter="dragenter" @dragleave="dragleave" @drop="drop" @dragover="dragover"></div>-->
      <!--</td>-->
    <!--</tr>-->
  <!--</table>-->
</template>

<script>
  import { px } from '@/mixins'
  import { notes, range, BLACK, WHITE } from '@/_'
  import Note from '@/components/Note'

  export default {
    name: 'Sequencer',
    components: {Note},
    mixins: [px],
    props: {height: {type: Number, required: true}, width: {type: Number, required: true}},
    data () {
      return {
        color: '#174a59',
        lineColor: '#000',
        // notes: [{x: 0, y: 0}]
        notes,
        bpMeasure: 4,
        measures: 2,
        dpBeat: 4,
        placed: []
      }
    },
    computed: {
      styles () {
        return {
          [BLACK]: this.color,
          [WHITE]: '#165262'
        }
      },
      total () {
        return this.measures * this.bpMeasure * this.dpBeat
      }
    },
    methods: {
      range,
      handleClick (row, col) {
        this.placed.push({x: col * this.width, y: row * this.height, length: 1})
      },
      divStyle (row, col, color) {
        return {
          height: this.height,
          width: this.width,
          fill: this.styles[color],
          x: col * this.width,
          y: row * this.height
        }
      },
      border (col) {
        let strokeWidth
        if (col % this.bpMeasure * this.dpBeat === 0) strokeWidth = 3
        else if (col % this.dpBeat === 0) strokeWidth = 2
        else strokeWidth = 1

        const start = [col * this.width, 0]
        const end = [col * this.width, (this.notes.length) * this.height]
        return {
          points: [...start, ...end],
          strokeWidth,
          stroke: '#000'
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