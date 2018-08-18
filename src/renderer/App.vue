<template>
  <div id="app">
    <v-app dark>

      <drawer></drawer>

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
  import Toolbar from '@/components/Toolbar'
  import Drawer from '@/components/Drawer'

  let tree = {
    label: 'root'
  }

  export default {
    name: 'Proton',
    components: {Drawer, Toolbar},
    data: () => ({
      children: tree
    })
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  /* Global CSS */
</style>
