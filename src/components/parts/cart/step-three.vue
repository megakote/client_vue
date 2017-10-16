<template>
  <div>
    <v-card class="lighten-1 z-depth-1 mb-5 tac" height="639px">
      <h2>Необходимо внести минимум {{minimum}}р</h2>
      <h3>Вы внесли {{cashIn}}р</h3>
      <h3 v-if="cashNeed > 0">Осталось внести {{cashNeed}}р</h3>
      <h3 v-else-if="cashNeed < 0">Сдачу в {{cashNeed * -1}}р вам вернет курьер</h3>
      <div v-if="!cashActive" class="btn_wrapper">
        <v-btn @click.native="startCash"  primary dark large>Начать прием</v-btn>
      </div>
      <div v-else-if="cashActive && !complete_btn_state" class="btn_wrapper">
        <v-btn @click.native="pauseCash" primary dark large>Пристановить прием</v-btn>
        <v-btn @click.native="cancel_dialog_state = true" error dark large>Отмена заказа</v-btn>
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
        <v-spacer></v-spacer>
      </div>
      <div v-else class="btn_wrapper">
        <v-btn @click.native="complete_dialog_state = true"  primary dark large>Печать чека</v-btn>
      </div>
    </v-card>
    <v-dialog v-model="complete_dialog_state" width="500px" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline">Заканчиваем заказ</div>
        </v-card-title>
        <v-card-text>Тут нужны текст</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" primary @click.native="completeOrder('complete')">
            Печать чека
            <v-icon right dark>done</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancel_dialog_state" width="500px" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline">Отмена заказа</div>
        </v-card-title>
        <v-card-text>
          <h4>ВНИМАНИЕ!</h4> Ваш заказ не будет обработан, пожалуйста свяжитесь с оператором по телефону указанному на чеке</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" primary @click.native="completeOrder('cancel')">
            Согласен
            <v-icon right dark>done</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      complete_btn_state: false, // Кнопка для вызова окна завершения
      complete_dialog_state: false, // Окно для завершения заказа
      cancel_dialog_state: false, // Окно для отмены заказа
      cashActive: false, // Запущен ли прием налички
      timeout: 3000, // Через сколько прекращать прием денег
      cashIn: 0, //Внесенная сумма
      timer: null, // Ссылка на цикл
    }
  },
  // props: ['summ'],
  methods: {
    pauseCash() {
      Vue.http.get('http://client.my/api/cash/pause').then(response => {
        this.cashActive = false
        clearInterval(this.timer)
      })
    },
    startCash() {
      /*
        Запускаем приемку денег
      */
      let time_start = new Date().getTime()
      console.log(time_start)
      let time_end = time_start + this.timeout
      console.log(time_end)
      Vue.http.options.emulateJSON = true
      Vue.http.options.emulateHTTP = true
      Vue.http.post('http://client.my/api/cash/start', {cash: this.minimum})
      this.cashActive = true
      let _this = this
      this.timer = setInterval(function() {
        if (new Date().getTime() > time_end) {
          _this.cashActive = false
          clearInterval(_this.timer)
        }
        _this.getCash()
      }, 2000)
    },
    getCash() {
      /*
        Получаем количество введенных купюр
      */
      Vue.http.get('http://client.my/api/cash/summ').then(response => {
        this.cashIn = response.body;
      })
    },
    completeOrder(reason){
      this.complete_dialog_state = false
      this.cancel_dialog_state = false
      this.$store.dispatch('top_bar_blocked', false)
      this.$store.dispatch('completeOrder', reason)
      this.$router.push({ name: 'Categorys'})
    },
  },
  computed: {
    summ () {
      let summ = 0;
      let items = this.$store.getters.cartProducts
      items.forEach(function(item, i, arr) {
        summ += item.price*item.count
      });
      return summ
    },
    minimum () {
      let min = this.summ*0.7/100;
      min = Math.ceil(min)
      return min*100
    },
    cashNeed() {
      return this.minimum - this.cashIn
    },
    activeLocker () {
      return this.$store.getters.top_bar_blocked
    }
  },
  watch: {
    cashIn: function () {
      if (this.cashIn >= this.minimum) {
        clearInterval(this.timer)
        this.pauseCash()
      }
      this.$store.dispatch('top_bar_blocked', true)
    }
  }
}
</script>

<style lang="scss">
  .card__actions {
    padding: 10px 10px 30px;
  }
</style>