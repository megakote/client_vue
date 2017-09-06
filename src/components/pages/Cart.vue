<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step step="1" :complete="e1 > 1">Утвердите товары</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="2" :complete="e1 > 2">Введите контактные данные</v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">Внесите деньги</v-stepper-step>
      </v-stepper-header>
      <v-stepper-content step="1">
        <!-- <v-card class="grey lighten-1 z-depth-1 mb-5" height="335px"> -->
        <v-card class="z-depth-1 mb-5" height="560px">
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
                  <td  class="text-xs-right">{{ props.item.price }} р.</td>
                  <td  class="text-xs-right">
                    <number-input 
                      :val="props.item.count"
                      :min="1"
                      :max="props.item.stock"
                      :id="props.item.id"
                      @change="changeCount"
                    />
                  </td>
                  <td  class="text-xs-right">{{ props.item.stock }} {{ props.item.unit }} </td>
                  <td  class="text-xs-center"><remove-btn :id='props.item.id' /></td>
                </template>                
              </v-data-table>
            </div>
            <div class="pagination_wrapper text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages" v-if="pages > 1"></v-pagination>
            </div> 
          </div>
        </v-card>
        <div class="summ">ИТОГО: <span> {{ summ }} </span> р.</div>
        <v-btn primary @click.native="e1 = 2" :disabled="summ <= 0 || isNaN(summ)">Далее</v-btn>
        <v-btn flat @click="complete">Отмена</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="lighten-1 z-depth-1 mb-5" height="591px">
        <h5 style="text-align: center;">Пожалуйста введите ваш номер телефона (без восьмерки) и email (По возможности)</h5>

            <input 
              v-model="contacts.tel"
              class="contact_input"
              type="tel"
              placeholder="+7 (999) 666-33-11"
              v-mask="'+7 (###) ###-##-##'"
              @click="changeFocus('tel')"
            ></input>

            <input 
              class="contact_input"
              type="mail"
              placeholder="info@mail.com"
              v-model="contacts.email"
              @click="changeFocus('email')"
            ></input>

        
          <keyboard       
              v-if="contactFocus == 'email'"        
              v-model="contacts.email"
              :layouts="[
                '1234567890{:backspace}|qwertyuiop|asdfghjkl|{shift:goto:1}@zxcvbnm.{shift:goto:1}|{очистить:clear}{пробел:space}{очистить:clear}',
                '!@#$%^&*(){:backspace}|QWERTYUIOP|ASDFGHJKL|{shift:goto:0}@ZXCVBNM.{shift:goto:0}|{очистить:clear}{пробел:space}{очистить:clear}'
              ]"
              :maxlength="0"
              @input="changed"
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
        <v-btn primary @click.native="e1 = 3" :disabled="!isValidate">Далее</v-btn>
        <v-btn flat @click.native="e1 = 1">Назад</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="591px"></v-card>
        <v-btn primary @click.native="complete">Печать чека</v-btn>
        <v-btn flat @click.native="e1 = 2">Назад</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      myInputModel: '',
      e1: 0,
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
        { text: 'Цена', value: 'price' },
        { text: 'Кол-во', value: 'count' },
        { text: 'На складе', value: 'stock' },
        { text: '', value: '' }
      ],
      contacts: {
        email: '',
        tel: ''
      },
      contactFocus: 'tel',

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
    isValidate () {
      if (this.contacts.tel.length < 18) {
        return false
      }
      return true
    }
  },
  methods: {
    changeCount (id, val) {
      this.$store.dispatch('changeCount', {'id': id, 'val': val})
    },
    changeFocus (to) {
      //this.contactInput = this.contacts[to]
      this.contactFocus = to
    },
    changed(value) {
      this.contacts[this.contacts.focus] = value
    },
    clear() {
      /* TODO: Написать метод очистки корзины */
    },
    complete() {
      this.e1 = 1
      this.$store.dispatch('completeOrder', this.contacts)
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
  table.table tbody  td{
    &:first-child {
      padding: 0 24px;
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
    margin: 30px auto 50px;
    padding: 10px 8px 10px 8px;
    border-radius: 5px;
    box-shadow: inset 0 1px 2px rgba(0,0,0, .55), 0px 1px 1px rgba(255,255,255,.5);
    border: 1px solid #666;
    &:focus {
      color:#08c;
      border: 1px solid #08c;
       box-shadow: 0px 1px 0px rgba(255,255,255,.25),inset 0px 3px 6px rgba(0,0,0,.25);
       outline: none;
    }
  }

</style>
<style>
  .animate {
    animation: leave 1s ease-in-out infinite;
  }

  @keyframes leave {
    from { 
      left: 0;
      opacity: 1;
    }   
    to { 
      left: -100%;
      opacity: 0;
    }
  }

  .vue-keyboard.tel .vue-keyboard-key[data-action="backspace"] {
    background-size: 12%;
  }
</style>