<template>
  <v-toolbar fixed app clipped-left>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title v-text="title"></v-toolbar-title>
  </v-toolbar>
</template>

<script>
  export default {
    name: 'Toolbar',
    data () {
      return {
        title: 'Proton'
      }
    }
  }
</script>

<style scoped>

</style>