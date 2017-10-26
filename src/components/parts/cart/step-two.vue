<template>
  <div>
    <div style="height: 591px;margin-bottom: 48px;position: relative;">
      <h5 style="text-align: center;">Пожалуйста введите Ваше ФИО, Ваш номер телефона (без восьмерки) и адрес доставки</h5>
        <input
        :class="{ active: contactFocus == 'tel'}"
        v-model="contacts.tel"
        class="contact_input"
        type="tel"
        placeholder="+7 (999) 666-33-11"
        v-mask="'+7 (###) ###-##-##'"
        @click="changeFocus('tel')"
      ></input>
      <input
        :class="{ active: contactFocus == 'name'}"
        class="contact_input"
        type="text"
        placeholder="ФИО"
        v-model="contacts.name"
        @click="changeFocus('name')"
      ></input>
      <input
        :class="{ active: contactFocus == 'address'}"
        class="contact_input"
        type="text"
        placeholder="ул мира 150 кв 13"
        v-model="contacts.address"
        @click="changeFocus('address')"
      ></input>
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
          '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{shift:goto:1}ячсмитьбю.{shift:goto:1}|{очистить:clear}{пробел:space}{Далее:nxt}',
          '!@№$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{shift:goto:0}ЯЧСМИТЬБЮ,{shift:goto:0}|{очистить:clear}{пробел:space}{Далее:nxt}'
        ]"
        :maxlength="0"
        @input="changed"
        @nxt="changeFocus('address')"
      />
      <keyboard
        v-if="contactFocus == 'address'"
        v-model="contacts.address"
        :layouts="[
          '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{shift:goto:1}ячсмитьбю.{shift:goto:1}|{очистить:clear}{пробел:space}{очистить:clear}',
          '!@№$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{shift:goto:0}ЯЧСМИТЬБЮ,{shift:goto:0}|{очистить:clear}{пробел:space}{очистить:clear}'
        ]"
        :maxlength="0"
        @input="changed"
      />
    </div>
    <v-btn primary @click.native="addContacts" :disabled="!isValidate">Далее</v-btn>
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
      let hasTelNumber = this.contacts.tel.length == 18
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
    },
    changeStage (to) {
      this.$emit('changeStage', to)
    },
    changed(value) {
      //this.contacts[this.contactFocus] = value.replace(/\s+/g,'  ').trim()
      console.log(this.contacts.address.length)

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
  }
</style>