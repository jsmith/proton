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
      dragRef: 'drag',
      moving: false,
      mousemoveListner: null
    }
  },
  methods: {
    showCursor () {
      document.documentElement.style.cursor = this.cursor
    },
    resetCursor () {
      document.documentElement.style.cursor = 'auto'
    },
    addListeners (e, ...args) {
      if (!e.which) {
        console.error('Given event must be mouse event:', e)
      }

      if (e.which !== 1) return
      if (this.disabled) return

      this.prevent(e)
      this.showCursor()
      // noinspection JSUnusedGlobalSymbols
      this.moving = true
      this.initial = this.previous = {x: e.clientX, y: e.clientY}
      this.mousemoveListner = event => this.mousemove(event, ...args)
      window.addEventListener('mousemove', this.mousemoveListner)
      window.addEventListener('mouseup', this.removeListeners)
    },
    removeListeners (e) {
      if (this.disabled) return
      this.prevent(e)
      this.resetCursor()
      this.initial = null
      // noinspection JSUnusedGlobalSymbols
      this.moving = false
      window.removeEventListener('mousemove', this.mousemoveListner)
      this.mousemoveListner = null
      window.removeEventListener('mouseup', this.removeListeners)
      this.reset()
    },
    mousemove (e, ...args) {
      if (this.disabled) return

      this.prevent(e)
      const totalY = e.clientY - this.initial.y
      const totalX = e.clientX - this.initial.x

      const changeY = e.clientY - this.previous.y
      const changeX = e.clientX - this.previous.x

      this.previous = {x: e.clientX, y: e.clientY}
      this.move(e, {totalX, totalY, changeY, changeX}, ...args)
    },
    move () {
      console.warn('`move(e)` not defined')
    },
    squash (v, low, high) {
      return Math.max(low, Math.min(high, v))
    },
    mapRange (x, inMin, inMax, outMin, outMax) {
      return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    },
    prevent (e) {
      if (e && e.preventDefault) e.preventDefault()
    },
    reset () {}
  },
  mounted () {
    this.el = this.$refs[this.dragRef]

    if (!this.el) {
      return
    }

    this.el.addEventListener('mousedown', this.addListeners)
    this.el.addEventListener('mouseup', this.removeListeners)
    this.el.addEventListener('mouseenter', () => {
      this.el.style.cursor = this.cursor
    })
    this.el.addEventListener('mouseleave', () => {
      this.el.style.cursor = 'default'
    })
  },
  destroyed () {
    if (!this.el) {
      return
    }

    this.el.removeEventListener('mousedown', this.mousedown)
    this.el.removeEventListener('mouseup', this.mouseup)
  }
}
