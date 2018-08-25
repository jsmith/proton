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

export const draggable = {
  props: {disabled: {type: Boolean, default: false}},
  data () {
    return {
      initial: null,
      previous: null,
      cursor: 'ns-resize',
      el: null,
      dragRef: 'drag'
    }
  },
  methods: {
    mousedown (e) {
      if (!this.disabled) {
        e.preventDefault()
        this.initial = this.previous = {x: e.clientX, y: e.clientY}
        document.documentElement.style.cursor = this.cursor
        window.addEventListener('mousemove', this.mousemove)
        window.addEventListener('mouseup', this.mouseup)
      }
    },
    mouseup (e) {
      if (!this.disabled) {
        e.preventDefault()
        document.documentElement.style.cursor = 'default'
        window.removeEventListener('mousemove', this.mousemove)
        window.removeEventListener('mouseup', this.mouseup)
      }
    },
    mousemove (e) {
      if (!this.disabled) {
        e.preventDefault()
        const totalY = e.clientY - this.initial.y
        const totalX = e.clientX - this.initial.x

        const changeY = e.clientY - this.previous.y
        const changeX = e.clientX - this.previous.x

        this.previous = {x: e.clientX, y: e.clientY}
        this.move(e, {totalX, totalY, changeY, changeX})
      }
    },
    move (e) {},
    squash (v, low, high) {
      return Math.max(low, Math.min(high, v))
    },
    mapRange (x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    }
  },
  mounted () {
    this.el = this.$refs[this.dragRef]

    this.el.addEventListener('mousedown', this.mousedown)
    this.el.addEventListener('mouseup', this.mouseup)
    this.el.addEventListener('mouseenter', () => {
      this.el.style.cursor = this.cursor
    })
    this.el.addEventListener('mouseleave', () => {
      this.el.style.cursor = 'default'
    })
  },
  destroyed () {
    this.el.removeEventListener('mousedown', this.mousedown)
    this.el.removeEventListener('mouseup', this.mouseup)
  }
}
