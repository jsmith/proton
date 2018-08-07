export const vmodel = {
  props: ['value'],
  data () {
    return {
      content: this.value
    }
  },
  methods: {
    input () {
      this.$emit('input', this.content)
    }
  },
  watch: {
    value () {
      this.content = this.value
    }
  }
}

export const px = {
  methods: {
    px (size) {
      return `${size}px`
    }
  }
}
