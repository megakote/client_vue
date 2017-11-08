<template>
  <div>
    <div style="height: 591px;margin-bottom: 48px;position: relative;">
      <h5 style="text-align: center;">Пожалуйста введите Ваше ФИО, Ваш номер телефона (без восьмерки) и адрес доставки</h5>
      <div class="input_group">
        <v-text-field
          :rules="[(v) => v.length == 10 || 'Введите номер телефона полностью']"
          :autofocus="true"
          id="tel"
          label="номер"
          value=""
          prefix="+7"
          :mask="'(###) ###-##-##'"
          class="new_input"
          :class="{ 'input-group--focused': contactFocus == 'tel'}"
          placeholder=" (ххх) ххх-хх-хх"
          v-model="contacts.tel"
          @click="changeFocus('tel')"
        ></v-text-field>
        <v-text-field
          id="name"
          label="ФИО"
          value=""
          class="new_input"
          :class="{ 'input-group--focused': contactFocus == 'name'}"
          placeholder="Иванов Петров"
          v-model="contacts.name"
          @click="changeFocus('name')"
          :rules="[(v) => (v.length >= 5) || 'Минимум 5 символов']"
        ></v-text-field>
      </div>
      <div class="input_group">
        <v-text-field
          @click="date_modal = true"
          label="Дата доставки"
          v-model="contacts.date"
          readonly
        ></v-text-field>
        <v-text-field
          id="address"
          label="Адрес"
          value=""
          class="new_input"
          :class="{ 'input-group--focused': contactFocus == 'address'}"
          placeholder="Волжский ул Пушкина 36"
          v-model="contacts.address"
          @click="changeFocus('address')"
          :rules="[(v) => (v.length >= 6) || 'Минимум 6 символов']"
        ></v-text-field>
        <v-select
          v-bind:items="timeRange"
          v-model="contacts.timeRange"
          label="Время доставки"
          :rules="[(v) => !!v || 'Выберите время доставки']"
          single-line
        ></v-select>
      </div>
      <keyboard
        class="tel"
        v-if="contactFocus == 'tel'"
        v-model="contacts.tel"
        :layouts="[
          '123|456|789|{:backspace}0{Далее:nxt}'
        ]"
        :maxlength="0"
        @nxt="changeFocus('name')"
        @input="changed"
      />
      <keyboard
        v-if="contactFocus == 'name'"
        v-model="contacts.name"
        :layouts="[
          '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{Назад:prv}ячсмитьбю.{shift:goto:1}|{очистить:clear}{пробел:space}{Далее:nxt}',
          '!@№$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{Назад:prv}ЯЧСМИТЬБЮ,{shift:goto:0}|{очистить:clear}{пробел:space}{Далее:nxt}'
        ]"
        :maxlength="0"
        @input="changed"
        @nxt="changeFocus('address')"
        @prv="changeFocus('tel')"
        :rules="[(v) => v.length <= 5 || 'Минимум 6 символов']"
      />
      <keyboard
        v-if="contactFocus == 'address'"
        v-model="contacts.address"
        :layouts="[
          '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{Назад:prv}ячсмитьбю.{shift:goto:1}|{очистить:clear}{пробел:space}{очистить:clear}',
          '!@№$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{Назад:prv}ЯЧСМИТЬБЮ,{shift:goto:0}|{очистить:clear}{пробел:space}{очистить:clear}'
        ]"
        :maxlength="0"
        @prv="changeFocus('name')"
        @input="changed"
      />
    </div>
    <v-btn color="primary" @click.native="addContacts" :disabled="!isValidate">Далее</v-btn>
    <v-btn flat @click.native="changeStage(1)">Назад</v-btn>

    <v-dialog
      persistent
      v-model="date_modal"
      max-width="350px"
      lazy
      full-width
    >
      <v-date-picker v-model="contacts.date" locale="ru-ru" :first-day-of-week="1" :allowed-dates="days" actions>
        <template slot-scope="{ save, cancel }">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="cancel">Отмена</v-btn>
            <v-btn flat color="primary" @click="save">OK</v-btn>
          </v-card-actions>
        </template>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'step-two',
  data () {
    return {
      contacts: {
        name: '',
        email: '',
        tel: '',
        address: '',
        date: '',
        timeRange: '',
      },
      date_modal: false,
      allowedDates: {
        min: '',
        max: ''
      },
      days: [],
      timeRange: [],
      contactFocus: 'tel',
    }
  },
  props: ['stage'],
  computed: {
    isValidate () {
      let hasTelNumber = this.contacts.tel.length == 10
      let hasName = this.contacts.name.length > 4
      let hasAddress = this.contacts.address.length > 5
      let hasTimeRange = this.contacts.timeRange
      if (hasTelNumber && hasName && hasAddress && hasTimeRange) {
        return true
      }
      return false
    },
    // timeRange () {
    //   let now = new Date().getHours()
    //   if (now > 11) {
    //     return [
    //       { text: '14:00 - 19:00' }
    //     ]
    //   } else {
    //     return [
    //       { text: '09:00 - 14:00' },
    //       { text: '14:00 - 19:00' }
    //     ]
    //   }
    // }
  },
  methods: {
    changeFocus (to) {
      this.contactFocus = to
      document.getElementById(to).focus()
    },
    changeStage (to) {
      this.$emit('changeStage', to)
    },
    changed(value) {
      if (this.contacts.tel.length > 10) {
        this.contacts.tel = this.contacts.tel.substring(0, 10)
      }
    },
    addContacts() {
      this.$store.dispatch('addContacts', this.contacts)
      this.changeStage(3)
    },
  },
  watch: {
    isValidate (val) {
      //this.$emit('validate', val)
    },
    'contacts.date' (val) {
      this.contacts.timeRange = ''
      let now = new Date().toISOString().substring(0, 10)
      let hour = new Date().getHours()
      if (val != now || hour <= 11) {
        this.timeRange = [
          { text: '09:00 - 14:00' },
          { text: '14:00 - 19:00' }
        ]
      } else {
        this.timeRange = [
          { text: '14:00 - 19:00' }
        ]
      }
    }
  },
  mounted: function () {
    let dayOfWeek = new Date().getDay()
    let hour = new Date().getHours()
    let now
    if (dayOfWeek == 0 || (dayOfWeek != 6 && hour >= 16)) {
      now = new Date(new Date().setDate(new Date().getDate() + 1))
    } else if (dayOfWeek == 6 && hour >= 16) {
      now = new Date(new Date().setDate(new Date().getDate() + 2))
    } else {
      now = new Date()
    }
    let timeRange
    console.log(now)
    // if (new Date() != now && hour <= 11) {
    //   timeRange = [
    //     { text: '09:00 - 14:00' },
    //     { text: '14:00 - 19:00' }
    //   ]
    // } else {
    //   timeRange = [
    //     { text: '14:00 - 19:00' }
    //   ]
    // }
    this.contacts = this.$store.getters.contacts
    this.contacts.date = now.toISOString().substring(0, 10)
    // this.timeRange = timeRange


    this.days = [...Array(150)].map((item, i, arr) => {
      let date = new Date().setDate(now.getDate() + i)
      if (new Date(date).getDay() != 0) {
        return new Date(date)
      }
    })
  }
}
</script>

<style lang="scss">
  .input_group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .new_input {
      display: block;
      font-size: 16px;
      flex-basis: 300px;
      margin: 0 30px;
    }
    .input-group__input {
      height: 40px;
      align-items: center;
    }
  }
  .cart_page {
    .vue-keyboard {
      position: absolute;
      bottom: 0;
      z-index: 4;
    }
    .vue-keyboard.tel {
      .vue-keyboard-key[data-action="backspace"] {
        background-size: 12%;
      }
      .vue-keyboard-key {
        height: 60px;
        line-height: 60px;
      }
    }
  }

  .vue-keyboard-key.action[data-action="nxt"] {
    background-color: #337ab7 !important;
    border-color: #2e6da4 !important;
  }
  .contact_input {
    display: block;
    font-size: 16px;
    width:300px;
    margin: 25px auto;
    padding: 10px 8px 10px 8px;
    border-radius: 5px;
    box-shadow: inset 0 1px 2px rgba(0,0,0, .55), 0px 1px 1px rgba(255,255,255,.5);
    border: 1px solid #666;
    &.active {
      color:#08c;
      border: 1px solid #08c;
       box-shadow: 0px 1px 0px rgba(255,255,255,.25),inset 0px 3px 6px rgba(0,0,0,.25);
       outline: none;
    }
    &[type="tel"] {
      //padding-left: 30px;
    }
  }

</style>

<style lang="scss">
.picker--date {
  width: 100%;
  table .btn.btn--date-picker {
    height: 40px;
    width: 40px;
    .btn__content {
      font-size: 19px;
    }
  }
  .card__actions {
    padding: 25px 10px 20px;
  }
}
</style>