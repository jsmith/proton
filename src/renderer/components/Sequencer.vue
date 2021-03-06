<template>
  <v-stage :config="canvasConfig">
    <v-layer>
      <div v-for="(note, row) in notes" :key="note.value">
        <template v-for="col in totalSixteenths">
          <v-rect :key="col" :config="rectConfig(row, col - 1, note.color)" @click="add(row, col - 1)"></v-rect>
        </template>
      </div>
    </v-layer>
    <v-layer>
      <template v-for="col in totalSixteenths">
        <v-line :config="borderConfig(col)"></v-line>
      </template>
    </v-layer>
    <v-layer>
      <template v-for="(note, i) in value">
        <note
            :key="i"
            :height="noteHeight"
            :width="noteWidth"
            :x="note.x"
            :y="note.y"
            @contextmenu="(e) => remove(e, i)"
            @mousedown="addListeners($event, note)"
            @input="changeDefault"
            v-model="note.length"></note>
      </template>
    </v-layer>
  </v-stage>
</template>

<script>
  import { draggable, px } from '@/mixins'
  import { notes, range, BLACK, WHITE, replace, DefaultDict } from '@/_'
  import Note from '@/components/Note'

  export default {
    name: 'Sequencer',
    components: {Note},
    mixins: [px, draggable],
    props: {
      noteHeight: {type: Number, required: true},
      noteWidth: {type: Number, required: true},
      width: Number,
      height: Number,
      value: Array,
      blackColor: {type: String, default: '#21252b'},
      whiteColor: {type: String, default: '#282c34'},
      defaultLength: {type: Number, default: 1},
      measures: {type: Number, default: 1}
    },
    data () {
      return {
        lineColor: '#000',
        quarters: 4,
        sixteenths: 4,
        lookup: new DefaultDict(new DefaultDict(Array)),
        cursor: 'move',
        default: null
      }
    },
    computed: {
      canvasConfig () {
        return {
          height: this.height || this.notes.length * this.noteHeight,
          width: this.width || this.totalSixteenths * this.noteWidth
        }
      },
      colorLookup () {
        return {[BLACK]: this.blackColor, [WHITE]: this.whiteColor}
      },
      totalSixteenths () {
        return (this.measures + 1) * this.quarters * this.sixteenths // we always render 1 extra measure
      },
      notes () {
        const n = []
        const octaves = [4, 5]
        octaves.map(octave => {
          notes.map(note => n.push({...note, value: note.value + octave}))
        })
        return n.reverse()
      }
    },
    methods: {
      range,
      add (row, col) {
        const noteBar = {length: this.default, row, col, index: this.value.length, ...this.compute(row, col)}
        this.lookup[row][col] = noteBar
        this.$emit('input', [...this.value, noteBar])
        this.$emit('added', noteBar)

        let measureValue = col / (this.quarters * this.sixteenths)
        if (measureValue === this.measures) measureValue++
        if (measureValue > this.measures) this.$emit('update:measures', Math.ceil(measureValue))
      },
      rectConfig (row, col, color) {
        return {
          height: this.noteHeight,
          width: this.noteWidth,
          fill: this.colorLookup[color],
          x: col * this.noteWidth,
          y: row * this.noteHeight
        }
      },
      borderConfig (col) {
        let strokeWidth
        if (col % (this.quarters * this.sixteenths) === 0) strokeWidth = 2.4
        else if (col % this.sixteenths === 0) strokeWidth = 1.5
        else strokeWidth = 0.4

        const start = [col * this.noteWidth, 0]
        const end = [col * this.noteWidth, (this.notes.length) * this.noteHeight]
        return {
          points: [...start, ...end],
          strokeWidth,
          stroke: '#000'
        }
      },
      move (e, note) {
        const row = Math.floor(e.clientY / this.noteHeight)
        const col = Math.floor(e.clientX / this.noteWidth)

        const oldNote = this.lookup[note.row][note.col]
        const newNote = {...oldNote, row, col, ...this.compute(row, col)}

        this.lookup[row][col] = newNote

        this.$emit('input', replace(this.value, oldNote.index, newNote))
        this.$emit('added', newNote)
      },
      remove (e, i) {
        e.preventDefault()

        const toRemove = this.value[i]
        const value = replace(this.value, i)
        value.slice(0, i).map(note => { note.index = note.index - 1 })

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
        return {x: col * this.noteWidth, y: row * this.noteHeight, time: time, note: this.notes[row].value}
      }
    },
    mounted () {
      this.default = this.defaultLength
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
</style>