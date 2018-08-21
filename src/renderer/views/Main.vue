<template>
  <div>
    <note-sequencer></note-sequencer>
    <knob v-model="value" :stroke-width="8" :size="100" potentiometer></knob>
    <knob v-model="value" :stroke-width="8" :size="100"></knob>
  </div>
</template>

<script>
  import NoteSequencer from '@/components/NoteSequencer'
  import Knob from '@/components/Knob'

  export default {
    name: 'Main',
    components: {Knob, NoteSequencer},
    data () {
      return {
        value: 0
      }
    }
  }
</script>

<style scoped>

</style>