<template>
  <keyboard
    v-if="visible && modalVisible"
    v-model="input"
    :layouts="[
        '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{shift:goto:1}ячсмитьбю{shift:goto:1}|{очистить:clear}{пробел:space}{найти:send}',
        '!@#$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{shift:goto:0}ЯЧСМИТЬБЮ{shift:goto:0}|{очистить:clear}{пробел:space}{найти:send}'
    ]"
    :maxlength="0"
    @send="send"
></keyboard>
</template>

<script>

export default {
  name: 'keyboard-search',
  data () {
    return {
      input: '',
    }
  },
  props: [],
  watch: {
    input: function () {
      let input = this.input.replace(/\s+/g,' ').trim()
      if (input == 'обновить') {
        document.location.href = "/";
      }
      this.$store.dispatch('search_input', input)
    },
    modalVisible: function () {
      //this.input = ''
    },
    visible: function () {
      if (this.visible) {
        this.input = ''
      }

    }
  },
  computed: {
    visible() {
      return this.$store.getters.keyboard_visible
    },
    modalVisible: function() {
      return this.$store.getters.modal_visible
    }
  },
  methods: {
    send() {
      //Отправка
      this.$store.dispatch('modal_visible', false)
      this.$router.push({ name: 'Search' })
    },
    clear(){
      this.input = '';
    }
  }
}
</script>



<style lang="scss">

  $width: 40;
  $height: 2.8em;
  $margin: 0.5em;
  $radius: 0.35em;

  .vue-keyboard {

    width: 100%;
    z-index: 10;
    position: absolute;
    bottom: 0;
    background-color: #EEE;
    box-shadow: 0px -3px 10px rgba(black, 0.3);
    border-radius: 10px;
    padding: 1em;
    z-index: 10;

      .vue-keyboard-row {
        display: flex;
        justify-content: space-around;
        &:not(:last-child) {
          margin-bottom: $margin;
        }
      }

      .vue-keyboard-key {
        &:not(:last-child) {
          margin-right: $margin;
        }

        flex: 1;
        // height: 2.4em;
        line-height: 2.1em;
        overflow: hidden;
        vertical-align: middle;
        border: 1px solid #ccc;
        color: #333;
        background-color: #fff;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
        border-radius: 0.35em;
        font-size: 1.6em;
        text-align: center;
        white-space: nowrap;
        user-select: none;
        cursor: pointer;
        padding: 0;
        //background: #e6f2f9;

        &[data-action="backspace"] {
          background: url("./icons/backspace.svg") no-repeat center center;
          background-size: 35%;
        }
        &[data-action="space"] {
          flex: 3;
        }

        &.half {
          flex: $width / 2;
        }

        &.action {
          color: #fff;
          background-color: #7d7d7d;
          border-color: #656565;
          font-size: 1.5em;
            &[data-action="clear"],
            &[data-action="validate"],
            &[data-action="send"] {
                color: #fff;
                background-color: #337ab7;
                border-color: #2e6da4;
            }
        }

        &.featured {
          color: #fff;
          background-color: #337ab7;
          border-color: #2e6da4;
        }

        &:hover {
          color: #333;
          background-color: #d6d6d6;
          border-color: #adadad;
        }

        &:active {
          transform: scale(.98); // translateY(1px);
          color: #333;
          background-color: #d4d4d4;
          border-color: #8c8c8c;
        }

        &.activated {
          color: #fff;
          background-color: #5bc0de;
          border-color: #46b8da;
        }

      }
      .placeholder {
        flex: $width / 2;
        height: $height;
        line-height: $height;

        &:not(:last-child) {
          margin-right: $margin;
        }
      }


      &:before,
      &:after {
        content: "";
        display: table;
      }
      &:after {
        clear: both;
      }


  }
</style>
