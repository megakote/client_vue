<template>
  <div class="input-number_wrapper">
    <span class="input-number-decrement" @click="decrement()">–</span>
    <input class="input-number" type="text" v-model="value" min="min" max="max">
    <span class="input-number-increment" @click="increment()">+</span>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  data () {
    return {
      value: 0
    }
  },
  props: ['id','val','min','max'],
  methods: {
    decrement () {
      if ((this.value - 1) < this.min) {
        return;
      }
      this.value -= 1
      this.$emit('change', this.value, this.id)
    },
    increment () {
      if ((this.value + 1) > this.max) {
        return;
      }
      this.value += 1
      this.$emit('change', this.value, this.id)
    }
  },
  watch: {
    val (val) {
        this.value = val
    },
  },
  created() {
      this.value = this.val
  }

}
</script>

<style lang="scss">
  .input-number_wrapper {
    .input-number {
      width: 40px;
      padding: 0 12px;
      vertical-align: top;
      text-align: center;
      outline: none;
    }

    .input-number,
    .input-number-decrement,
    .input-number-increment {
      border: 1px solid #ccc;
      height: 40px;
      user-select: none;
    }

    .input-number-decrement,
    .input-number-increment {
      display: inline-block;
      width: 30px;
      line-height: 38px;
      background: #f1f1f1;
      color: #444;
      text-align: center;
      font-weight: bold;
      cursor: pointer;
    }
    .input-number-decrement:active,
    .input-number-increment:active {
      background: #ddd;
    }

    .input-number-decrement {
      border-right: none;
      border-radius: 4px 0 0 4px;
    }

    .input-number-increment {
      border-left: none;
      border-radius: 0 4px 4px 0;
    }
  }
</style>