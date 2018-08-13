<template>
  <div id="app">
    <v-app dark>

      <v-navigation-drawer fixed clipped v-model="drawer" app>
        <v-list dense>
          <file-explorer :tree="tree"></file-explorer>
        </v-list>
      </v-navigation-drawer>

      <toolbar></toolbar>

      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>

      <v-footer app>
        <v-spacer></v-spacer>
        <span>&copy; Jacob Smith 2018</span>
      </v-footer>

    </v-app>
  </div>
</template>

<script>
  import FileExplorer from './components/FileExplorer'
  import Toolbar from '@/components/Toolbar'

  let tree = {
    label: 'root',
    trees: [
      {
        label: 'item1',
        trees: [
          {
            label: 'item1.1'
          },
          {
            label: 'item1.2',
            trees: [
              {
                label: 'item1.2.1'
              }
            ]
          }
        ]
      },
      {
        label: 'item2'
      }
    ]
  }

  export default {
    name: 'Proton',
    components: {Toolbar, FileExplorer},
    data: () => ({
      drawer: true,
      tree: tree
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
