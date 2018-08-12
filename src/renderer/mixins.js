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
    },
    hw (h, w) {
      return {
        height: this.px(h),
        width: this.px(w)
      }
    },
    lightenDarken (color, amount) {
      let usePound = false

      if (color[0] === '#') {
        color = color.slice(1)
        usePound = true
      }

      const num = parseInt(color, 16)

      let r = (num >> 16) + amount
      if (r > 255) r = 255
      else if (r < 0) r = 0

      let b = ((num >> 8) & 0x00FF) + amount
      if (b > 255) b = 255
      else if (b < 0) b = 0

      let g = (num & 0x0000FF) + amount
      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    },
    lighten (color, amount) {
      return this.lightenDarken(color, -Math.abs(amount))
    }
  }
}
