import { storiesOf } from '@storybook/vue'
import Tone from 'tone'
import Sequencer from '@/components/Sequencer'
import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Toolbar from '@/components/Toolbar'

let synth = new Tone.Synth().toMaster()

storiesOf(Key.name, module)
  .add('White', () => ({
    data () {
      return {synth}
    },
    template: '<key note="C4" :synth="synth"/>'
  }))
  .add('Black', () => ({
    data () {
      return {synth}
    },
    template: '<key note="C#4" :synth="synth"/>'
  }))

storiesOf(Piano.name, module)
  .add('Standard', () => ({
    template: '<piano :octave="4"/>'
  }))

storiesOf(Sequencer.name, module)
  .add('Standard', () => ({
    template: '<sequencer :size="30"/>'
  }))

storiesOf(Toolbar.name, module)
  .add('Standard', () => ({
    template: '<v-app dark><toolbar/></v-app>'
  }))
