<template>
  <div class="knob-control" :style="{ height: size-5 + 'px' }">
    <!--suppress HtmlUnknownAttribute -->
    <svg
        v-if="potentiometer"
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        @click="click"
        @mousedown="mousedown"
        @mouseup="mouseup">
      <circle :r="center" :cx="center" :cy="center" :fill="secondaryColor"></circle>
      <rect :width="rectWidth" :x="center - rectWidth / 2" :y="center - size / 8 * 4" :height="size / 3" fill="#000" :transform="transform"></rect>
    </svg>

    <!--suppress HtmlUnknownAttribute -->
    <svg
        v-else
        :width="size"
        :height="size"
        viewBox="0 0 100 100"
        @click="click"
        @mousedown="mousedown"
        @mouseup="mouseup">
      <path
          :d="rangePath"
          :stroke-width="strokeWidth"
          :stroke="secondaryColor"
          class="knob-control__range">
      </path>
      <path
          v-if="showValue"
          :d="valuePath"
          :stroke-width="strokeWidth"
          :stroke="primaryColor"
          class="knob-control__value">
      </path>
      <text
          v-if="showValue"
          :x="50"
          :y="57"
          text-anchor="middle"
          :fill="textColor"
          class="knob-control__text-display">
        {{ valueDisplay }}
      </text>
    </svg>

  </div>
</template>

<script>
  const RADIUS = 40
  const MID_X = 50
  const MID_Y = 50
  const MIN_RADIANS = 4 * Math.PI / 3
  const MAX_RADIANS = -Math.PI / 3

  // const ifEnabled = (target, name, descriptor) => {
  //   const original = descriptor.value
  //   descriptor.value = (...args) => {
  //     if (!this.enabled) {
  //       return
  //     }
  //     return original(...args)
  //   }
  //   return descriptor
  // }

  // map a value (x) from one range (in min/max) onto another (out min/max)
  const mapRange = (x, inMin, inMax, outMin, outMax) => {
    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
  }

  export default {
    name: 'Knob',
    data () {
      return {initialY: null}
    },
    props: {
      value: {type: Number},
      max: {type: Number, default: 100},
      min: {type: Number, default: 0},
      stepSize: {type: Number, default: 1},
      disabled: {type: Boolean, default: false},
      size: {type: Number, default: 100},
      primaryColor: {type: String, default: '#409eff'},
      secondaryColor: {type: String, default: '#dcdfe6'},
      textColor: {type: String, default: '#000'},
      strokeWidth: {type: Number, default: 17},
      valueDisplayFunction: {type: Function, default: (v) => v},
      potentiometer: {type: Boolean, default: false},
      rectWidth: {type: Number, default: 6}
    },
    computed: {
      rangePath () {
        return `M ${this.minX} ${this.minY} A ${RADIUS} ${RADIUS} 0 1 1 ${this.maxX} ${this.maxY}`
      },
      valuePath () {
        return `M ${this.zeroX} ${this.zeroY} A ${RADIUS} ${RADIUS} 0 ${this.largeArc} ${this.sweep} ${this.valueX} ${this.valueY}`
      },
      showValue () {
        return (this.value >= this.min && this.value <= this.max) && !this.disabled
      },
      zeroRadians () {
        /* this weird little bit of logic below is to handle the fact that usually we
            want the value arc to start drawing from the 'zero' point, but, in the case
            that the minimum and maximum values are both above zero, we set the 'zero point'
            at the supplied minimum, so the value arc renders as the user would expect */
        if (this.min > 0 && this.max > 0) {
          return mapRange(this.min, this.min, this.max, MIN_RADIANS, MAX_RADIANS)
        } else {
          return mapRange(0, this.min, this.max, MIN_RADIANS, MAX_RADIANS)
        }
      },
      valueRadians () {
        return mapRange(this.value, this.min, this.max, MIN_RADIANS, MAX_RADIANS)
      },
      valueDegrees () {
        return this.valueRadians * 360 / 2 / Math.PI - 90
      },
      minX () {
        return MID_X + Math.cos(MIN_RADIANS) * RADIUS
      },
      minY () {
        return MID_Y - Math.sin(MIN_RADIANS) * RADIUS
      },
      maxX () {
        return MID_X + Math.cos(MAX_RADIANS) * RADIUS
      },
      maxY () {
        return MID_Y - Math.sin(MAX_RADIANS) * RADIUS
      },
      zeroX () {
        return MID_X + Math.cos(this.zeroRadians) * RADIUS
      },
      zeroY () {
        return MID_Y - Math.sin(this.zeroRadians) * RADIUS
      },
      valueX () {
        return MID_X + Math.cos(this.valueRadians) * RADIUS
      },
      valueY () {
        return MID_Y - Math.sin(this.valueRadians) * RADIUS
      },
      largeArc () {
        return Math.abs(this.zeroRadians - this.valueRadians) < Math.PI ? 0 : 1
      },
      sweep () {
        return this.valueRadians > this.zeroRadians ? 0 : 1
      },
      valueDisplay () {
        return this.valueDisplayFunction(this.value)
      },
      transform () {
        return `rotate(${-this.valueDegrees} ${this.center} ${this.center})`
      },
      center () {
        return this.size / 2
      }
    },
    methods: {
      updatePosition (e) {
        const diff = -(e.clientY - this.initialY)
        this.initialY = e.clientY
        this.$emit('input', Math.min(this.max, Math.max(this.min, this.value + Math.round(diff))))
      },
      click (e) {
        if (!this.disabled) {
          this.updatePosition(e)
        }
      },
      mousedown (e) {
        if (!this.disabled) {
          e.preventDefault()
          this.initialY = e.clientY
          document.documentElement.style.cursor = 'ns-resize'
          window.addEventListener('mousemove', this.onMouseMove)
          window.addEventListener('mouseup', this.mouseup)
        }
      },
      mouseup (e) {
        if (!this.disabled) {
          e.preventDefault()
          document.documentElement.style.cursor = 'default'
          window.removeEventListener('mousemove', this.onMouseMove)
          window.removeEventListener('mouseup', this.mouseup)
        }
      },
      onMouseMove (e) {
        if (!this.disabled) {
          e.preventDefault()
          this.updatePosition(e)
        }
      }
    }
  }
</script>

<style scoped>
  .knob-control:hover {
    cursor: ns-resize;
  }

  .knob-control__range {
    fill: none;
    transition: stroke .1s ease-in;
  }
  .knob-control__value {
    fill: none;
  }
  .knob-control__text-display {
    font-size: 1.3rem;
    text-align: center;
  }
</style>