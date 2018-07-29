<template>
  <div id="app">
    <v-app dark>
      <v-navigation-drawer fixed :clipped="clipped" v-model="drawer" app>
        <v-list dense>
          <file-explorer :tree="tree"></file-explorer>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-btn
          icon
          @click.native.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          @click.native.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          @click.native.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-slide-y-transition mode="out-in">
            <router-view></router-view>
          </v-slide-y-transition>
        </v-container>
      </v-content>
      <v-navigation-drawer temporary right fixed v-model="rightDrawer" app>
        <v-list>
          <v-list-tile router :to="item.to" :key="i" v-for="(item, i) in items" exact>
            <v-list-tile-action>
              <v-icon v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <v-spacer></v-spacer>
        <span>&copy; Jacob Smith 2018</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
  import FileExplorer from './components/FileExplorer'

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
    components: {FileExplorer},
    data: () => ({
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        { icon: 'info', title: 'Main', to: '/' },
        { icon: 'apps', title: 'Welcome', to: '/welcome' },
        { icon: 'bubble_chart', title: 'Inspire', to: '/inspire' }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      tree: tree
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
