<template>
    <div>
        <audio v-for="src in urls" ref="audio" :src="src"></audio>
        <octave v-for="octave in octaves" :octave="octave" :audio="audio"></octave>
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
        pressed: new Set(),
        numbers: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 8, 8.5, 9, 9.5, 10, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15]
      }
    },
    computed: {
      urls () {
        return this.numbers.map(number => `https://awiclass.monoame.com/pianosound/set/${number}.wav`)
      },
      audio () {
        let i = 0
        return (this.$refs.audio || []).reduce((lookup, audio) => {
          lookup[this.numbers[i]] = audio; i++; return lookup
        }, {})
      }
    }
  }
</script>
