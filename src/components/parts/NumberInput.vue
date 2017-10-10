<template>
  <div class="input-number_wrapper">
    <div class="btns">
      <!-- <span  class="input-number-decrement" @click="decrement(1)">–</span> -->
      <input class="input-number" type="text" v-model="value" min="min" max="max" size="3">
      <!-- <span  class="input-number-increment" @click="increment(1)">+</span> -->
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
    val: [String, Number],
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
      if (val > this.max || val < this.min) {
        let count = this.count.toString()
        this.count = count.slice(0, -1)
      }
      if (val > this.max){
        this.$snotify.info('На складе нет такого количества ', 'Максимум ' + this.max, {
          timeout: 4000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false
        });
        if (this.value == ''){
          this.value = 0
          return
        }
      }
      if (val == '') {
        //this.count = '0'
        this.value = 0
        this.$emit('change', this.id, this.value)
        return
      }
      if (this.count.toString() == '0') {
        this.count = val
      }
      this.value = this.count
      this.$emit('change', this.id, this.value)
    }
  },
  watch: {
    val (val) {
      this.value = val
    },
    // count () {
    //   this.$emit('change', this.id, this.count)
    // }
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

<style lang="scss" scoped>
  .input-number_wrapper .vue-keyboard {
    box-shadow: none;
    padding-top: 5px;
    padding: 5px 0 10px;
    .vue-keyboard-key[data-action="backspace"] {
      background-size: 25% !important;
    }
  }
  .input-number_wrapper {
    padding: 0 10px;
    margin: 0 auto 15px;
    border-radius: 10px;
    background-color: #EEE;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3);
    .input-number {
      width: 100% !important;
      margin-top: 10px;
      background: #FFF;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
</style>