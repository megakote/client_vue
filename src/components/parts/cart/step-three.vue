<template>
  <div>
    <v-card class="lighten-1 z-depth-1 mb-5 tac" height="591px">
      <h2>Необходимо внести минимум {{minimum}}р</h2>
      <h3>Вы внесли {{cashIn}}р</h3>
      <h3 v-if="cashNeed > 0">Осталось внести {{cashNeed}}р</h3>
      <h3 v-else-if="cashNeed < 0">Сдачу в {{cashNeed * -1}}р вам вернет курьер</h3>
      <div v-if="!cashActive" class="btn_wrapper">
        <v-btn @click.native="startCash"  primary dark large>Начать прием</v-btn>
      </div>
      <div v-else class="btn_wrapper">
        <v-btn @click.native="endCash"  primary dark large>Остановить прием</v-btn>
        <v-progress-circular v-if="cashActive" indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
      </div>
    </v-card>
  </div>
</template>

<script>

import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

export default {
  name: 'step-three',
  data () {
    return {
      cashActive: false, // Запущен ли прием налички
      cashIn: 0, //Внесенная сумма
      timer: null, // Ссылка на цикл
    }
  },
  props: ['summ'],
  methods: {
    endCash() {
      Vue.http.get('http://client.my/api/cash/end').then(response => {
        this.cashActive = false
        clearInterval(this.timer)
      })
    },
    startCash() {
      /*
        Запускаем приемку денег
      */
      Vue.http.options.emulateJSON = true
      Vue.http.options.emulateHTTP = true
      Vue.http.post('http://client.my/api/cash/start', {cash: this.minimum})
      this.cashActive = true
      let _this = this
      this.timer = setInterval(function() {
        _this.getCash()
      }, 2000)
    },
    getCash() {
      /*
        Получаем количество введенных купюр
      */
      let resource = Vue.resource('http://client.my/api/cash/summ')
      resource.get().then(response => {
        this.cashIn = response.body;
      })
    }
  },
  computed: {
    minimum () {
      let min = this.summ/100;
      min = Math.ceil(min)
      return min*100
    },
    cashNeed() {
      return this.minimum - this.cashIn
    }
  },
  watch: {
    cashIn: function () {
      if (this.cashIn >= this.minimum) {
        clearInterval(this.timer)
        this.endCash()
      }
    }
  }
}
</script>
