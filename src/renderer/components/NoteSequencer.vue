<template>
  <window v-model="size">
    <template slot="toolbar">
      <v-icon>select</v-icon>
      <v-icon>slice</v-icon>
    </template>
    <v-layout wrap>
      <!--Remove v-layout and v-flex to just CSS-->
      <v-flex v-for="octave in octaves" xs12 style="display: flex;">
        <octave :octave="octave"></octave>
      </v-flex>
    </v-layout>
  </window>
</template>

<script>
  import Window from '@/components/Window'
  import Octave from '@/components/Octave'

  export default {
    name: 'NoteSequencer',
    components: {Window, Octave},
    data () {
      return {
        octaves: [4, 5].reverse(),
        divsPerMeasure: 4,
        numMeasures: 4,
        size: {height: 500, width: 500}
      }
    }
  }
</script>
