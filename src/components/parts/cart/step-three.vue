<template>
  <div>
    <v-card class="lighten-1 z-depth-1 mb-5 tac" height="639px">
      <h2>Сумма заказа {{ summ }}р</h2>
      <h2>Необходимо внести минимум {{minimum}}р</h2>
      <h3>Вы внесли {{cashIn}}р</h3>
      <h3 v-if="cashNeed > 0">Осталось внести {{cashNeed}}р</h3>
      <!-- <h3 v-else-if="summ < cashIn">Сдачу в {{ cashIn - summ }}р вам вернет курьер</h3> -->
      <div v-if="cashActive" class="btn_wrapper">
        <v-btn v-if="cashIn == 0" @click.native="back()" warning dark large>Назад</v-btn>
        <v-spacer></v-spacer>
        <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>
        <v-spacer></v-spacer>
        <v-btn v-if="(cashIn > 0) && (cashIn < minimum)" @click.native="cancel_dialog_state = true" color="error" dark large>Отмена заказа</v-btn>
        <v-btn v-if="cashIn >= minimum" @click.native="completeOrder('complete', false)" color="primary" dark large>Завершить заказ</v-btn>
        <v-spacer></v-spacer>
      </div>
<!--       <div v-else class="btn_wrapper">
        <v-btn @click.native="complete_dialog.state = true"  primary dark large>Печать чека</v-btn>
      </div> -->
    </v-card>
    <v-dialog v-model="complete_dialog.state" max-width="500px" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline">Спасибо за заказ, ждем Вас снова</div>
        </v-card-title>
        <v-card-text>Не забудьте забрать чек. Если чек не вышел, мы привезем его вместе с заказом</v-card-text>
        <v-card-text v-if="complete_dialog.summ < complete_dialog.cashIn">Сдачу в {{ complete_dialog.cashIn - complete_dialog.summ }}р вам вернет курьер</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" primary @click.stop="goHome">
            Я понял
            <v-icon right dark>done</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancel_dialog_state" max-width="500px" lazy absolute persistent>
      <v-card>
        <v-card-title>
          <div class="headline">Отмена заказа</div>
        </v-card-title>
        <v-card-text>
          <h4>ВНИМАНИЕ!</h4> Ваш заказ не будет обработан, пожалуйста свяжитесь с оператором по телефону указанному на чеке</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" error @click.native="cancel_dialog_state = false">
            Нет
            <v-icon right dark>cancel</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" primary @click.native="completeOrder('cancel')">
            Да
            <v-icon right dark>done</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://backend.my/api/cash/',
  //timeout: 1000,
  // headers: {
  //   'Accept': 'application/json',
  //   //'Content-type': 'application/json'
  // },
  // responseType: 'json',
});

export default {
  name: 'step-three',
  data () {
    return {
      complete_btn_state: false, // Кнопка для вызова окна завершения
      complete_dialog: {
        state: false,
        cashIn: 0,
        summ: 0
      },
      cancel_dialog_state: false, // Окно для отмены заказа
      cashActive: false, // Запущен ли прием налички
      timeout: 120, // Через сколько прекращать прием денег
      timeEnd: 0, // Во сколько прерктить прием
      cashIn: 0, //Внесенная сумма
      timer: null, // Ссылка на цикл
    }
  },
  props: ['stage'],
  methods: {
    pauseCash() {
      let _this = this
      instance.get('pause')
        .then(function (response) {
          clearInterval(_this.timer)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    startCash() {
      /*
        Блокируем все остальные кнопки
      */
      this.$store.dispatch('top_bar_blocked', true)
      /*
        Запускаем приемку денег
      */
      this.timeEnd = Math.floor(Date.now() / 1000) + this.timeout
      instance.post('start', {cash: this.minimum})
        .catch(function (error) {
          console.log(error);
        })
      this.cashActive = true
      let _this = this
      this.timer = setInterval(function() {
        if (Math.floor(Date.now() / 1000) > _this.timeEnd) {
          _this.cashActive = false
          if (_this.cashIn != 0) {
            // TODO потом впишем дргуие причины
            _this.completeOrder('complete')
          } else {
            _this.completeOrder('timeout')
          }
        }
        _this.getCash()
      }, 2000)
    },
    getCash() {
      /*
        Получаем количество введенных купюр
      */
      let _this = this
      instance.get('summ')
        .then(function (response) {
          _this.cashIn = (response.data) ? response.data : 0;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    completeOrder (reason, push = true) {
      clearInterval(this.timer)
      //Передадим данные во всплывашку
      this.complete_dialog.cashIn = this.cashIn
      this.complete_dialog.summ = this.summ
      //Скроем всплыашки (не помню зачем)
      this.complete_dialog.state = false
      this.cancel_dialog_state = false

      this.$store.dispatch('top_bar_blocked', false)
      this.$store.dispatch('completeOrder', [reason, this.cashIn])
      if (push) {
        this.$router.push({ name: 'Categorys'})
      } else {
        this.complete_dialog.state = true
      }
    },
    goHome () {
      this.$router.push({ name: 'Categorys'})
    },
    back () {
      this.$store.dispatch('top_bar_blocked', false)
      this.pauseCash()
      this.$emit('changeStage', 2)
    },
  },
  computed: {
    summ () {
      let summ = 0;
      let items = this.$store.getters.cartProducts
      items.forEach(function(item, i, arr) {
        summ += item.price*item.count
      });
      summ = (summ < 2000) ? summ + 300 : summ
      return summ
    },
    minimum () {
      let min = 0;
      if (this.summ < 50) {
        min = this.summ*0.5/10
      } else {
        min = this.summ*0.5/50
      }
      min = Math.ceil(min)
      if (this.summ < 50) {
        return min*10
      } else {
        return min*50
      }
    },
    cashNeed () {
      return this.minimum - this.cashIn
    }
  },
  watch: {
    cashIn: function () {
      if (this.cashIn >= this.summ) {
        this.completeOrder('complete', false)
        this.complete_dialog.state = true
      }
      this.timeEnd = Math.floor(Date.now() / 1000) + this.timeout
    },
    stage () {
      // Тут запустим прием при переходе на экран - как именно я хз
      if (this.stage == 3) {
        this.startCash()
      }
    }
  }
}
</script>

<style lang="scss">
  .card__actions {
    padding: 10px 10px 30px;
  }
</style>