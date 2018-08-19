import { storiesOf } from '@storybook/vue'
import Tone from 'tone'

import Sequencer from '@/components/Sequencer'
import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Toolbar from '@/components/Toolbar'
import FileExplorer from '@/components/FileExplorer'
import ChannelRack from '@/components/ChannelRack'
import Knob from '@/components/Knob'
import { TREE } from '@/_'

let synth = new Tone.Synth().toMaster()

// noinspection RequiredAttributes
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
    template: '<key note="C#4" :synth="synth">'
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

// noinspection RequiredAttributes
storiesOf(FileExplorer.name, module)
  .add('Standard', () => ({
    template: `
    <v-app dark>
      <v-list dense style="max-width: 300px; height: 100%">
        <file-explorer :children="children.root" label="root"></file-explorer>
      </v-list>
    </v-app>
    `,
    data () {
      return {
        children: TREE
      }
    }
  }))

storiesOf(ChannelRack.name, module)
  .add('Standard', () => ({
    template: `
    <v-app dark>
      <channel-rack :instruments="instruments" style="max-width: 300px"></channel-rack>
    </v-app>
    `,
    components: {ChannelRack},
    data () {
      return {
        instruments: ['Synth A', 'SynthB']
      }
    }
  }))

storiesOf(Knob.name, module)
  .add('Standard', () => ({
    template: '<knob v-model="value"></knob>',
    components: {Knob},
    data () {
      return {value: 0}
    }
  }))
