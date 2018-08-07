<template>
  <div class="octave-container">
    <div class="octave">
      <div v-for="note in keys" :class="classes[note.key]" @mousedown="down(note)" @mouseup="up(note)"></div>
    </div>
    <div class="sequencer">
      <div v-for="note in keys" :key="note.key" :class="['note', note.color]">
        <div v-for="measure in [0]" :key="measure" class="measure">
          <div v-for="section in [0, 1, 2, 3]" :key="section" class="section">
            <div v-for="div in [0, 1, 2, 3]" :key="div" class="div">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tone from 'tone'

  let synth = new Tone.Synth().toMaster()

  export default {
    name: 'Keys',
    props: {
      octave: {default: 4, type: Number}
    },
    data () {
      return {
        pressed: []
      }
    },
    methods: {
      down (note) {
        synth.triggerAttackRelease(note.key, '8n')
        this.pressed.push(note.key)
        console.log(this.pressed)
      },
      up (note) {
        this.pressed = this.pressed.filter(n => n !== note.key)
      }
    },
    computed: {
      keys () {
        return [
          ['white', 'C'],
          ['black', 'C#'],
          ['white', 'D'],
          ['black', 'D#'],
          ['white', 'E'],
          ['white', 'F'],
          ['black', 'F#'],
          ['white', 'G'],
          ['black', 'G#'],
          ['white', 'A'],
          ['black', 'A#'],
          ['white', 'B']
        ].reverse().map(([color, key]) => ({
          color: `${color}-key`,
          key: `${key}${this.octave}`
        }))
      },
      classes () {
        return this.keys.reduce((lookup, { key, color }) => {
          if (this.pressed.includes(key)) {
            lookup[key] = ['playing', color]
          } else {
            lookup[key] = color
          }
          return lookup
        }, {})
      }
    }
  }
</script>

<style scoped lang="sass">
  $key_height: 44px
  $key_width: 250px

  $black_proportion: 0.55
  $note_height: $key_height * 7 / 12 - 1

  $color_white: #eee
  $color_black: #3b3b3b

  @mixin size($h, $w)
      width: $w
      height: $h

  .octave
    width: $key_width
    box-shadow: 0 0 40px -5px rgba(0,0,0,0.4)
    display: inline-block

    .white-key
      +size($key_height, $key_width)
      background-color: $color_white
      transform: translate(0px, 0px)
      transition: 0.1s
      &:hover
        background-color: darken($color_white, 5)

    .black-key
      +size($key_height / 2, $key_width * $black_proportion)
      background-color: $color_black
      position: absolute
      z-index: 20
      transform: translate(0px, 0px)
      transition: 0.1s
      &:hover
        background-color: darken($color_black, 5)

    .white-key.playing
      transform: translate(0px, 0px)

    .black-key.playing
      transform: translate(0px, 0px)

  $line_color: #000

  .sequencer
    .measure
      border-right: solid 1px $line_color

    .section
      border-right: solid 1px $line_color

    .div
      +size($note_height, $note_height)
      border-right: solid 1px $line_color

    .note
      border-bottom: solid 0.5px $line_color

    .note, .measure, .section
      display: flex

    $sequencer_color: #14212b

    .white-key
      background-color: lighten($sequencer_color, 2)

    .black-key
      background-color: $sequencer_color

  .octave-container
    display: flex
    height: 7 * $key_height

</style>