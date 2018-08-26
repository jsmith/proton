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
      <note
          v-for="(note, i) in placed"
          :key="i" :height="height"
          :width="width"
          :x="note.x"
          :y="note.y"
          @mousedown="(e) => addListeners(e, note)"
          v-model="note.length"></note>
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
  import { draggable, px } from '@/mixins'
  import { notes, range, BLACK, WHITE } from '@/_'
  import Note from '@/components/Note'

  export default {
    name: 'Sequencer',
    components: {Note},
    mixins: [px, draggable],
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
        placed: [],
        lookup: {},
        cursor: 'move'
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
        const note = {x: col * this.width, y: row * this.height, length: 1, row, col, index: this.placed.length}
        this.lookup[row] = this.lookup[row] || {}
        this.lookup[row][col] = note
        this.placed.push(note)
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
      move (e, _, note) {
        const row = Math.floor(e.clientY / this.height)
        const col = Math.floor(e.clientX / this.width)
        const { index, length } = this.lookup[note.row][note.col]
        const newNote = {row, col, length, index, x: col * this.width, y: row * this.height}
        this.lookup[row] = this.lookup[row] || {}
        this.lookup[row][col] = newNote
        this.placed = [
          ...this.placed.slice(0, index),
          newNote,
          ...this.placed.slice(index + 1, this.placed.length)]
      }
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