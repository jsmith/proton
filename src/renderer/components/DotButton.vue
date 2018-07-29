<template>
  <v-btn icon @click="handleClick">
    <v-icon>circle</v-icon>
  </v-btn>
</template>

<script>
  export default {
    name: 'DotButton',
    methods: {
      handleClick () {
        this.$emit('click')
      }
    }
  }
</script>
