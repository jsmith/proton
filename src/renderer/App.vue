<template>
  <v-app dark id="#app">
    <drawer></drawer>
    <toolbar></toolbar>
    <v-content>
      <v-container fluid fill-height>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
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
</style>
