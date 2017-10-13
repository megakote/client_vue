<template>
  <div>
    <v-stepper v-model="stage">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="stage > 1">Утвердите товары</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="stage > 2">Введите контактные данные</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Внесите деньги</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <v-card class="z-depth-1 mb-5" height="551px">
          <div style="height: 100%; position: relative;">
            <div class="table_list_wrapper">
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :no-data-text="no_data_text"
                :pagination.sync="pagination"
                hide-actions
                transition="fade-transition"
                class="elevation-2"
              >
                <template slot="headerCell" scope="props">
                  <span v-tooltip:bottom="{ 'html': props.header.text }">
                    {{ props.header.text }}
                  </span>
                </template>
                <template slot="items" scope="props">
                  <td>{{ props.item.name }}</td>
                  <td  class="text-xs-center">{{ props.item.price }} р.</td>
                  <td  class="text-xs-center">
                    <number-input2
                      :val="props.item.count"
                      :min="1"
                      :max="props.item.stock"
                      :id="props.item.guid"
                      @change="changeCount"
                    />
                  </td>
                  <td  class="text-xs-right">{{ props.item.stock }} {{ props.item.unit }} </td>
                  <td  class="text-xs-center"><remove-btn :id='props.item.guid' :name='props.item.name' /></td>
                </template>
              </v-data-table>
            </div>
            <div class="pagination_wrapper text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages" v-if="pages > 1"></v-pagination>
            </div>
          </div>
        </v-card>
        <div class="summ">ИТОГО: <span> {{ summ }} </span> р.</div>
        <v-btn primary @click.native="stage = 2" :disabled="summ <= 0 || isNaN(summ)">Далее</v-btn>
        <v-btn flat @click="clear">Очистить</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="lighten-1 z-depth-1 mb-5" height="591px">
        <h5 style="text-align: center;">Пожалуйста введите Ваше ФИО, Ваш номер телефона (без восьмерки) и адрес доставки</h5>
            <input
              :class="{ active: contactFocus == 'name'}"
              class="contact_input"
              type="text"
              placeholder="ФИО"
              v-model="contacts.name"
              @click="changeFocus('name')"
            ></input>

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
              :class="{ active: contactFocus == 'address'}"
              class="contact_input"
              type="text"
              placeholder="ул мира 150 кв 13"
              v-model="contacts.address"
              @click="changeFocus('address')"
            ></input>

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
          <keyboard
              v-if="contactFocus == 'name'"
              v-model="contacts.name"
              :layouts="[
                '1234567890{:backspace}|йцукенгшщзхъ|фывапролджэ|{shift:goto:1}ячсмитьбю.{shift:goto:1}|{очистить:clear}{пробел:space}{Далее:nxt}',
                '!@№$%^&*(){:backspace}|ЙЦУКЕНГШЩЗХЪ|ФЫВАПРОЛДЖЭ|{shift:goto:0}ЯЧСМИТЬБЮ,{shift:goto:0}|{очистить:clear}{пробел:space}{Далее:nxt}'
              ]"
              :maxlength="0"
              @input="changed"
              @nxt="changeFocus('tel')"
          />
          <keyboard
              class="tel"
              v-if="contactFocus == 'tel'"
              v-model="contacts.tel"
              :layouts="[
                '123|456|789|{очистить:clear}0{:backspace}'
              ]"
              :maxlength="0"
              @input="changed"
          />
        </v-card>
        <v-btn primary @click.native="addContacts" :disabled="!isValidate">Далее</v-btn>
        <v-btn flat @click.native="stage = 1">Назад</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <step-three
          :summ="summ"
        />
<!--         <v-btn primary @click.native="complete">Печать чека</v-btn>
        <v-btn flat @click.native="stage = 2">Назад</v-btn> -->
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
      search: '',
      no_data_text: 'Корзина пуста',
      pagination: {
        sortBy: 'column',
        page: 1,
        rowsPerPage: 8,
        descending: false,
        totalItems: 0
      },
      selected: [],
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Цена', align: 'center', value: 'price' },
        { text: 'Кол-во', align: 'center', value: 'count' },
        { text: 'На складе', value: 'stock' },
        { text: '', value: '' }
      ],
      contacts: {
        name: '',
        email: '',
        tel: '',
        address: ''
      },
      contactFocus: 'name',
    }
  },
  computed: {
    summ () {
      let summ = 0;
      this.items.forEach(function(item, i, arr) {
        summ += item.price*item.count
      });
      return summ
    },
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    },
    pageData: function() {
      let offset = (this.page - 1) * this.perPage;
      return this.items.slice(offset, offset + this.perPage);
    },
    items () {
      return this.$store.getters.cartProducts
    },
    isValidate () {return true
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
    changeCount (id, val) {
      this.$store.dispatch('addCartProduct', {id: id, count: val})
    },
    changeFocus (to) {
      this.contactFocus = to
    },
    append (){
      this.contactFocus = 'tel'
    },
    changed(value) {
      this.contacts[this.contacts.focus] = value.replace(/\s+/g,' ').trim()
    },
    addContacts() {
      this.$store.dispatch('addContacts', this.contacts)
      this.stage = 3
    },
    complete() {
      this.$store.dispatch('completeOrder')
      this.$router.push({ name: 'Categorys'})
    },
    clear(){
      this.$store.dispatch('completeOrder', 'canceled')
      this.$router.push({ name: 'Categorys'})
    }
  },
  mounted () {
    this.$store.dispatch('getCart')
  }
}
</script>

<style lang="scss" scoped>
  .stepper__content .btn {
    float: right;
  }

  .summ {
    font-size: 20px;
    text-align: right;
    padding-bottom: 10px;
  }

  .pagination_wrapper{
    position: absolute;
    bottom: -50px;
  }

  table.table tbody {
    position: relative;
  }

  table.table tbody td,
  table.table tbody th {
    height: 60px;
    font-size: 16px;
  }

  table.table tbody td{
    &:first-child {
      padding: 0 24px;
      max-width: 630px;
    }
  }
  .card {
    box-shadow: none;
  }

  .input-number,
  .input-number-decrement,
  .input-number-increment {
    height: 45px !important;
  }

  .vue-keyboard {
    position: absolute;
    bottom: 0;
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


<style lang="scss">
  .tac {
    text-align: center;
  }
  .btn_wrapper {
    .btn {
      float: none !important;
      margin: 30px auto 50px !important;
    }
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
  .btn__content {
    font-size: 16px;
    padding: 0 25px;
  }

  .btn--floating .icon {
      height: 28px;
      width: 28px;
  }
</style>