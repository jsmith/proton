<template>
  <v-list dense style="padding: 0">
    <template v-for="(instrument, index) in instruments">
      <v-list-tile @click="" :key="instrument">
        <v-list-tile-content>
          <v-list-tile-title>{{ instrument }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <dot-button @click="handle(instrument)"></dot-button>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider v-if="index !== instruments.length - 1"></v-divider>
    </template>
  </v-list>
</template>

<script>
  import DotButton from '@/components/DotButton'

  export default {
    name: 'ChannelRack',
    components: {DotButton},
    props: {instruments: {type: Array, required: true}},
    data () {
      return {
        disabled: new Set()
      }
    },
    methods: {
      handle (instrument) {
        if (instrument in this.disabled) {
          this.disabled.remove(instrument)
        } else {
          this.disabled.add(instrument)
        }
      }
    }
  }
</script>