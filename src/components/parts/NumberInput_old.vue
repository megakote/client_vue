<template>
  <div class="input-number_wrapper">
    <span v-if="full" class="input-number-decrement" @click="decrement(1)">–1</span>
    <span v-if="full" class="input-number-decrement" @click="decrement(5)">–5</span>
    <span v-if="full" class="input-number-decrement" @click="decrement(10)">–10</span>
    <span v-else class="input-number-decrement" @click="decrement(1)">–</span>
    <input class="input-number" type="text" v-model="value" min="min" max="max">
    <span v-if="full" class="input-number-increment" @click="increment(1)">+1</span>
    <span v-if="full" class="input-number-increment" @click="increment(5)">+5</span>
    <span v-if="full" class="input-number-increment" @click="increment(10)">+10</span>
    <span v-else class="input-number-increment" @click="increment(1)">+</span>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  data () {
    return {
      value: 0,
    }
  },
  props: {
    id: {
      type: String | Number,
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

<style lang="scss" scoped>
  .input-number_wrapper {
    font-size: 0;
    height: 60px;
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