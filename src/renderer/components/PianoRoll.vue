<template>
    <div>
        <octave v-for="octave in octaves" :octave="octave"></octave>
    </div>
    
</template>

<script>
  import Octave from '@/components/Octave'

  export default {
    name: 'Keys',
    components: {Octave},
    props: {
      numMeasures: {type: Number, required: true},
      divsPerMeasure: {type: Number, required: true},
      octaves: {type: Array, required: true}
    },
    data () {
      return {
        pressed: new Set()
      }
    }
  }
</script>
