<template>
  <div class="input-number_wrapper">
    <div class="btns">
      <span  class="input-number-decrement" @click="decrement(1)">–</span>
      <input class="input-number" type="text" v-model="value" min="min" max="max" size="3">
      <span  class="input-number-increment" @click="increment(1)">+</span>
    </div>
    <div v-if="full" class="keyboard">
      <keyboard
        v-model="count"
        :layouts="[
          '123|456|789|0{:backspace}'
        ]"
        @input="changed"
        :maxlength="3"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  data () {
    return {
      count: '1',
      value: 0,
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: false
    },
    val: Number,
    min: Number,
    max: Number,
    full: Boolean,
  },
  methods: {
    decrement (val = 1) {
      if ((this.value - val) < this.min) {
        return;
      }
      this.value -= val
      this.$emit('change', this.id, this.value)
    },
    increment (val = 1) {
      if ((this.value + val) > this.max) {
        return;
      }
      this.value += val
      this.$emit('change', this.id, this.value)
    },
    changed (val) {
      if (val == '') {
        console.log('Удалили все символы')
        this.count = '0'
        this.value = this.count
        return
      }
      if (val.toNumber > this.max || val.toNumber < this.min) {
        console.log('Не входит в диапозон')
        let count = this.count.toString()
        this.count = count.slice(0, -1)
      }
      if (this.count.toString() == '0') {
        this.count = val
      }
      console.log(this.count.toString())
      this.value = this.count
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
    width: 400px;
    margin: 6px auto;
    .vue-keyboard {
      font-size: 16px;
      position: relative;
    }
  }
  .btns {
    font-size: 0;
    text-align: center;
  }
</style>
<style lang="scss">
  .input-number_wrapper {
    // font-size: 0;
    // height: 60px;
    margin: 6px 8px;
    .input-number {
      padding: 0 12px;
      vertical-align: top;
      text-align: center;
      outline: none;
    }

    .input-number,
    .input-number-decrement,
    .input-number-increment {
      font-size: 17px;
      border: 1px solid #ccc;
      line-height: 60px;
      user-select: none;
        height: 60px;
        width: 60px;
        line-height: 60px;
    }

    .input-number-decrement,
    .input-number-increment {
      display: inline-block;
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