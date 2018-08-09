<template>
  <div class="sequencer">
    <div v-for="note in notes" :key="note.value" class="note" :style="styles[note.color]">
      <div v-for="measure in [0]" :key="measure" class="measure">
        <div v-for="section in [0, 1, 2, 3]" :key="section" class="section">
          <div v-for="div in [0, 1, 2, 3]" :key="div" class="div" :style="divStyle">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { px } from '@/mixins'
  import { notes, BLACK, WHITE } from '@/_'

  export default {
    name: 'Sequencer',
    mixins: [px],
    data: () => ({notes, color: '#212121'}),
    props: {size: Number},
    computed: {
      divStyle () {
        return this.hw(this.size, this.size)
      },
      styles () {
        return {
          [BLACK]: {backgroundColor: this.color},
          [WHITE]: {backgroundColor: `lighten(${this.color}, 2)`}
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  .sequencer
    background: #303030
    display: inline-block

  $line_color: #000

  .measure
    border-right: solid 1px $line_color

  .section
    border-right: solid 1px $line_color

  .div
    border-right: solid 1px $line_color

  .note
    border-bottom: solid 0.5px $line_color

  .measure, .section
    display: flex

</style>