<template>
  <div>
    <div style="height: 591px;margin-bottom: 48px;position: relative;">
      <h5 style="text-align: center;">Пожалуйста введите Ваше ФИО, Ваш номер телефона (без восьмерки) и адрес доставки</h5>
      <v-text-field
        :rules="[
          (v) => !!v || 'Номер телефон обязателен',
          (v) => v.length == 10 || 'Введите номер телефона полностью',
        ]"
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
      <v-text-field
        id="address"
        label="Адрес"
        value=""
        class="new_input"
        :class="{ 'input-group--focused': contactFocus == 'address'}"
        placeholder="Адрес"
        v-model="contacts.address"
        @click="changeFocus('address')"
        :rules="[(v) => (v.length >= 6) || 'Минимум 6 символов']"
      ></v-text-field>
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
        v-model.trim="contacts.name"
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
        v-model.trim="contacts.address"
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
        address: ''
      },
      contactFocus: 'tel',
    }
  },
  props: ['stage'],
  computed: {
    isValidate () {
      let hasTelNumber = this.contacts.tel.length == 10
      let hasName = this.contacts.name.length > 4
      let hasAddress = this.contacts.address.length > 5
      if (hasTelNumber && hasName && hasAddress) {
        return true
      }
      return false
    },
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
    stage () {
      if (this.stage == 2) {
        this.contacts = this.$store.getters.contacts
      }
    }
  }
}
</script>

<style lang="scss">
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
        height: 3em;
        line-height: 3em;

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
  .new_input {
    display: block;
    font-size: 16px;
    width: 300px;
    margin: 0 auto;
  }
</style>