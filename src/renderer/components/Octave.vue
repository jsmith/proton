<template>
    <div class="octave">
        <div v-for="note in keys" :class="classes(note)" @click.down="down(note)" @click.up="up(note)"></div>
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
        pressed: new Set()
      }
    },
    methods: {
      down (note) {
        synth.triggerAttackRelease(note.key, '8n')
        this.pressed.add(note.key)
      },
      up (note) {
        this.pressed.delete(note.key)
      },
      classes (note) {
        if (note.key in this.pressed) {
          return ['playing', note.color]
        } else {
          return note.color
        }
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
        ].map(([color, key]) => ({
          color: color,
          key: `${key}${this.octave}`
        }))
      }
    }
  }
</script>

<style scoped lang="sass">
    $key_width: 44px
    $key_height: 300px
    
    $color_white: #eee
    $color_black: #585858

    @mixin size($h, $w)
        width: $w
        height: $h
    
    .octave
        box-shadow: 0 0 40px -5px rgba(0,0,0,0.4)
        display: inline-block

    .white
        +size($key_width, $key_height)
        border: solid 1px $color_white
        transform: translate(-3px, -3px)
        transition: 0.1s
        &:hover
            transform: translate(0px, 0px)
            background-color: $color_white

    .black
        +size($key_width / 2, $key_height * 0.55)
        position: absolute
        background-color: $color_black
        z-index: 20
        transform: translate(-3px, -3px)
        transition: 0.1s
        &:hover
            transform: translate(0px, 0px)
            background-color: darken($color_black,10)

    .white.playing
        background-color: darken($color_white, 10)
        transform: translate(0px, 0px)

    .black.playing
        background-color: lighten($color_black, 10)
        transform: translate(0px, 0px)
</style>