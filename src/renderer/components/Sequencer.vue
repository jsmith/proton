<template>
  <v-stage :config="{height: 200, width: total * width}">
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
          v-for="(note, i) in value"
          :key="i" :height="height"
          :width="width"
          :x="note.x"
          :y="note.y"
          @contextmenu="remove(i)"
          @mousedown="addListeners($event, note)"
          @input="changeDefault"
          v-model="note.length"></note>
    </v-layer>
  </v-stage>
</template>

<script>
  import { draggable, px } from '@/mixins'
  import { notes, range, BLACK, WHITE } from '@/_'
  import Note from '@/components/Note'

  export default {
    name: 'Sequencer',
    components: {Note},
    mixins: [px, draggable],
    props: {
      height: {type: Number, required: true},
      width: {type: Number, required: true},
      value: Array
    },
    data () {
      return {
        lineColor: '#000',
        notes: notes.map(n => ({...n, value: n.value + '4'})).reverse(),
        quarters: 4,
        bars: 2,
        sixteenths: 4,
        lookup: {},
        cursor: 'move',
        default: 1
      }
    },
    computed: {
      styles () {
        return {
          [BLACK]: '#21252b',
          [WHITE]: '#282c34'
        }
      },
      total () {
        return this.bars * this.quarters * this.sixteenths
      }
    },
    methods: {
      range,
      handleClick (row, col) {
        const noteBar = {length: this.default, row, col, index: this.value.length, ...this.compute(row, col)}
        this.lookup[row] = this.lookup[row] || {}
        this.lookup[row][col] = noteBar
        this.$emit('input', [...this.value, noteBar])
        this.$emit('added', noteBar)
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
        if (col % (this.quarters * this.sixteenths) === 0) strokeWidth = 2.4
        else if (col % this.sixteenths === 0) strokeWidth = 1.5
        else strokeWidth = 0.4

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

        const oldNote = this.lookup[note.row][note.col]
        const newNote = {...oldNote, row, col, ...this.compute(row, col)}

        this.lookup[row] = this.lookup[row] || {}
        this.lookup[row][col] = newNote

        this.$emit('input', [...this.value.slice(0, oldNote.index), newNote, ...this.value.slice(oldNote.index + 1, this.value.length)])
        this.$emit('added', newNote)
      },
      remove (i) {
        const toRemove = this.value[i]
        const value = [
          ...this.value.slice(0, i),
          ...this.value.slice(i + 1, this.value.length).map(note => ({...note, index: note.index - 1}))
        ]
        this.$emit('input', value)
        this.$emit('removed', toRemove)
      },
      changeDefault (length) {
        this.default = length
      },
      compute (row, col) {
        let rem = col
        const sixteenths = rem % this.sixteenths; rem = Math.floor(rem / this.sixteenths)
        const quarters = rem % this.quarters; const bars = Math.floor(rem / this.quarters)
        const time = `${bars}:${quarters}:${sixteenths}`
        return {x: col * this.width, y: row * this.height, time: time, note: this.notes[row].value}
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