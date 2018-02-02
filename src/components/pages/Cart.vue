<template>
  <div class="cart_page">
    <v-stepper v-model="stage">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stage > 1">Утвердите товары</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stage > 2">Введите контактные данные</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Внесите деньги</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <step-one
          @changeStage="changeStage"
        />
      </v-stepper-content>
      <v-stepper-content step="2">
        <step-two
          @changeStage="changeStage"
          :stage="stage"
        />
      </v-stepper-content>
      <v-stepper-content step="3">
        <step-three
          @changeStage="changeStage"
          :stage="stage"
        />
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      stage: 0,
    }
  },
  computed: {

  },
  methods: {
    changeStage(val) {
      this.stage = val
    },
  },
  mounted () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style lang="scss">
  .cart_page {
    .stepper__content .btn {
      float: right;
    }

    .card {
      box-shadow: none;
    }

    .tac {
      text-align: center;
    }
    .btn_wrapper {
      .btn {
        float: none !important;
        margin: 30px auto 50px !important;
      }
    }

    .btn__content {
      font-size: 16px;
      padding: 0 25px;
    }

    .btn--floating .icon {
        height: 28px;
        width: 28px;
    }
  }

  .stepper__step--complete .stepper__step__step {
    background: #009688;
  }

  .btns_bottom .btn__content {
      font-size: 20px;
      padding: 0 45px;
      line-height: 45px;
  }
</style>