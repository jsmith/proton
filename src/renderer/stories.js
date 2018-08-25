import { storiesOf } from '@storybook/vue'
import Tone from 'tone'

import Sequencer from '@/components/Sequencer'
import Piano from '@/components/Piano'
import Key from '@/components/Key'
import Toolbar from '@/components/Toolbar'
import FileExplorer from '@/components/FileExplorer'
import ChannelRack from '@/components/ChannelRack'
import Knob from '@/components/Knob'
import Tabs from '@/components/Tabs'
import Tab from '@/components/Tab'
import Mixer from '@/components/Mixer'
import Slider from '@/components/Slider'
import TimeDisplay from '@/components/TimeDisplay'
import Bpm from '@/components/Bpm'
import Note from '@/components/Note'
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
    template: '<knob v-model="value" style="margin: 50px"></knob>',
    components: {Knob},
    data () {
      return {value: 0}
    }
  }))
  .add('Potentiometer', () => ({
    template: '<knob v-model="value" style="margin: 50px" potentiometer></knob>',
    components: {Knob},
    data () {
      return {value: 0}
    }
  }))

storiesOf(Tabs.name, module)
  .add('Standard', () => ({
    template: `
     <tabs>
       <tab name="Playlist 1">
         This is the content of the first tab
       </tab>
       <tab name="Sequence 1">
         This is the content of the second tab
       </tab>
       <tab name="Sequence 2" :is-disabled="true">
         This content will be unavailable while :is-disabled prop set to true
       </tab>
       <tab name="Sequence 4">
           The fragment that is appended to the url can be customized
       </tab>
       <tab name="Master">
          A prefix and a suffix can be added
       </tab>
    </tabs>
    `,
    components: {Tab, Tabs}
  }))

storiesOf(Mixer.name, module)
  .add('Standard', () => ({
    template: `
    <mixer></mixer>
    `,
    components: {Mixer}
  }))

storiesOf(Slider.name, module)
  .add('Standard', () => ({
    template: `
    <slider v-model="value" :left="46" :right="50"></slider>
    `,
    components: {Slider},
    data: () => ({value: 70})
  }))

storiesOf(Bpm.name, module)
  .add('Standard', () => ({
    template: `
    <bpm v-model="value"></bpm>
    `,
    components: {Bpm},
    data: () => ({value: 128})
  }))

storiesOf(TimeDisplay.name, module)
  .add('Standard', () => ({
    template: `
    <time-display :time="time"></time-display>
    `,
    components: {TimeDisplay},
    data: () => ({time: {min: 0, sec: 0, milli: 0}})
  }))

storiesOf(Note.name, module)
  .add('Standard', () => ({
    template: `
    <note :height="20" v-model="length" :width="20"></note>
    `,
    components: {Note},
    data: () => ({length: 1})
  }))
