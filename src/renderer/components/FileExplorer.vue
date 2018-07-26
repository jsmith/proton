<template>
  <div class="jacob" style="display: contents">
    <v-list-tile @click="showChildren = !showChildren">
      <v-list-tile-content>
        <v-list-tile-title :style="indent">{{ tree.label }}</v-list-tile-title>
        <!--<v-list-tile-action>-->
          <!--<v-icon light>compare_arrows</v-icon>-->
        <!--</v-list-tile-action>-->
        <!--<v-list-tile-title>Switch drawer (click me)</v-list-tile-title>-->
      </v-list-tile-content>
    </v-list-tile>
    <file-explorer v-if="showChildren" v-for="tree in self.trees" :tree="tree" :depth="depth + 1">
    </file-explorer>
  </div>
</template>

<script>
  export default {
    name: 'FileExplorer',
    props: {tree: Object, depth: {type: Number, default: 0}},
    data () {
      return { showChildren: false }
    },
    computed: {
      indent () {
        return { transform: `translate(${this.depth * 20}px)` }
      },
      self () {
        // Doing this removes confusion
        return this.tree
      }
    }
  }
</script>

<style scoped>

</style>