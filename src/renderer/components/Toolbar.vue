<template>
  <v-toolbar fixed app clipped-left>
    <v-btn icon><icon scale="2" name="circle-notch"></icon></v-btn>
    <h1>{{ title }}</h1>
    <div style="border-left: 1px solid #fff; height:60%; margin: 20px"></div>
    <v-btn
        icon
        style="margin: 0"
        v-shortkey="['space']"
        @shortkey="playing = !playing"
        @click="playing = !playing"><icon :name="playing ? 'pause-circle' : 'play-circle'" scale="1.4"></icon></v-btn>
    <v-btn icon style="margin: 0"><icon name="stop-circle" scale="1.4"></icon></v-btn>

    <div class="clock">
      <div class="minute">{{ min }}</div>
      <div class="second">: {{ formatNumberLength(sec, 2) }}</div>
      <div class="milli">. {{ formatNumberLength(milli, 3) }}</div>
    </div>

    <div class="clock">
      <div class="minute">{{ bpm }}</div>
      <div class="milli">bpm</div>
    </div>

    <v-spacer></v-spacer>
    <v-btn icon><icon scale="1.3" name="user"></icon></v-btn>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Toolbar',
    data () {
      return {
        title: 'Proton',
        min: 0,
        sec: 0,
        milli: 0,
        bpm: 120,
        playing: false
      }
    },
    methods: {
      formatNumberLength (num, length) {
        let r = '' + num
        while (r.length < length) {
          r = '0' + r
        }
        return r
      }
    }
  }
</script>

<style scoped lang="sass">
  .clock
    font-size: 30px
    font-family: var(--monospace)
    margin-left: 10px
    padding: 0.2em .3em 0 .3em
    border: 3px solid rgba(0,0,0,.3)
    background-color: #222
    filter: none
    display: flex
    align-items: baseline
    box-sizing: border-box
    line-height: 1em

  .second, .milli
    margin-left: 5px

  .milli
    font-size: .5em
</style>