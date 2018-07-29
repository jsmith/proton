<template>
  <window>
    <template slot="toolbar">
      <v-icon>select</v-icon>
      <v-icon>slice</v-icon>
    </template>
    <piano-roll :octaves="octaves" :divs-per-measure="4" :num-measures="4"></piano-roll>
  </window>
</template>

<script>
  import PianoRoll from '@/components/PianoRoll'
  import Window from '@/components/Window'

  export default {
    name: 'NoteSequencer',
    components: {PianoRoll, Window},
    data () {
      return {
        octaves: [...Array(8).keys()]
      }
    }
  }
</script>
