<template>
    <div class="octave">
        <div v-for="note in keys" :class="classes(note)" @click.down="down(note)" @click.up="up(note)"></div>
    </div>
</template>

<script>
    export default {
      name: 'Keys',
      props: {octave: {default: 4, type: Number}},
      data () {
        return {
          pressed: new Set(),
          lookup: {
            'C4': 1,
            'C#4': 1.5
          }
        }
      },
      methods: {
        down (note) {
          const number = this.lookup[note.key]
          const audio = this.audio[number]
          audio.volume = 1
          audio.currentTime = 0
          audio.play()
          this.pressed.add(note.key)
        },
        up (note) {
          this.pressed.remove(note.key)
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

    @mixin size($w, $h)
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
        position: absolute
        top: 0
        width: $key_width / 2
        height: $key_height * 0.55
        background-color: $color_black
        margin-left: -$key_width / 4
        margin-right: -$key_width / 4
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