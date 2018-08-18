<template>
  <v-navigation-drawer fixed clipped permanent app>
    <v-list dense>
      <file-explorer v-for="(children, label) in projects" :children="children" :label="label"></file-explorer>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { ipcRenderer } from 'electron'
  import FileExplorer from '@/components/FileExplorer'
  const fs = require('fs')
  const path = require('path')

  export default {
    name: 'Drawer',
    components: {FileExplorer},
    data () {
      return {
        drawer: true,
        folders: ['/home/jacob/Downloads']
      }
    },
    computed: {
      projects () {
        return this.folders.reduce((tree, folder) => {
          tree[path.basename(folder)] = this.computeTree(folder); return tree
        }, {})
      }
    },
    methods: {
      computeTree (dir, tree = {}) {
        fs.readdirSync(dir).map(item => {
          tree[item] = {}
          const p = path.join(dir, item)
          if (fs.statSync(p).isDirectory()) {
            this.computeTree(p, tree[item])
          }
        })
        return tree
      },
      addFolder (_, folder) {
        this.folders.push(folder[0]) // Folder is always an array of length 1
      }
    },
    mounted () {
      ipcRenderer.on('folder', this.addFolder)
    },
    destroyed () {
      ipcRenderer.removeListener('folder', this.addFolder)
    }
  }
</script>

<style scoped>

</style>