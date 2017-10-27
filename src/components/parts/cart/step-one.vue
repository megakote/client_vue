<template>
  <div>
    <div style="height:599px;">
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
            <template slot="headerCell" slot-scope="props">
              <v-tooltip bottom>
                <span slot="activator">
                  {{ props.header.text }}
                </span>
                <span>
                  {{ props.header.text }}
                </span>
              </v-tooltip>
            </template>
            <template slot="items" slot-scope="props">
              <td>{{ props.item.name }}</td>
              <td  class="text-xs-center">{{ props.item.price }} р.</td>
              <td  class="text-xs-center">
                <number-input2
                  :val="props.item.count"
                  :min="1"
                  :max="props.item.stock"
                  :id="props.item.guid"
                  @fullInput="fullInput(props.item.guid, props.item.count, props.item.stock, props.item.name, props.item.unit)"
                  @change="changeCount"
                />
              </td>
              <td  class="text-xs-right">{{ props.item.stock }} {{ props.item.unit }} </td>
              <td  class="text-xs-center"><remove-btn :id='props.item.guid' :name='props.item.name' /></td>
            </template>
          </v-data-table>
        </div>
        <div class="pagination_wrapper text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages" :total-visible="4" v-if="pages > 1"></v-pagination>
        </div>
      </div>
    </div>
    <div class="summ">ИТОГО: <span> {{ summ }} </span> р.</div>
    <v-btn color="primary" @click.stop="changeStage(2)" :disabled="summ <= 0 || isNaN(summ)">Далее</v-btn>
    <v-btn flat @click.stop="cancel_dialog_state = true" class="clear">Очистить</v-btn>
    <v-dialog v-model="dialog.state" max-width="500px" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">{{ dialog.name }}</div>
        </v-card-title>
        <span class="subheadline">Доступно для заказа: {{ dialog.max }}{{ dialog.unit }}</span>
        <v-card-text>Введите количество</v-card-text>
          <number-input
            :val="dialog.count"
            :min="1"
            :max="dialog.max"
            :id="dialog.id"
            @change="tempChangeCount"
            @tomuch="tempCount = 0"
          />
        <v-card-actions>

          <v-btn class="darken-1" color="error" @click.native="dialog.state = false" style="float: left">
            <v-icon left dark>block</v-icon>
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" color="primary" @click.native="changeCount(dialog.id, tempCount)">
            Обновить
            <v-icon right dark>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="cancel_dialog_state" max-width="500px" lazy absolute>
      <v-card>
        <v-card-title>
          <div class="headline">Очистка корзины</div>
        </v-card-title>
        <v-card-text>
          <h4>ВНИМАНИЕ!</h4> Ваш заказ не будет обработан, вы уверены что хотите очистить корзину ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" color="error" @click.native="cancel_dialog_state = false">
            Нет
            <v-icon right dark>cancel</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" color="primary" @click.native="clear">
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
export default {
  name: 'step-one',
  data () {
    return {
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
        { text: '', value: '', sortable: false }
      ],
      dialog: {
        name: null,
        unit: null,
        state: false,
        max: 1,
        count: 1,
        id: null
      },
      cancel_dialog_state: false,
      tempCount: 0,
    }
  },
  //props: ['formValidate'],
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
  },
  methods: {
    changeStage (to) {
      this.$emit('changeStage', to)
    },
    tempChangeCount (id, val) {
      this.tempCount = val
    },
    dialogChangeCount(id, val){
      if (val != 0) {
        this.changeCount(id, val)
      }
    },
    changeCount (id, val) {
      this.dialog.state = false
      this.tempCount = 0
      if (val != 0) {
        this.$store.dispatch('addCartProduct', {id: id, count: val})
      }
    },
    clear () {
      this.$store.dispatch('completeOrder', 'cancel')
      this.$router.push({ name: 'Categorys'})
    },
    fullInput (guid, val, max, name, unit) {
      this.dialog.id = guid
      this.dialog.name = name
      this.dialog.unit = unit
      this.dialog.count = val
      this.dialog.max = max
      this.dialog.state = true
    }
  },
  watch: {
    'dialog.state' (val) {
      this.tempCount = 0
      if (!val){
        this.dialog.id = 0
      }

    }
  }
}
</script>

<style lang="scss">
  .summ {
    font-size: 20px;
    text-align: right;
    padding-bottom: 10px;
  }

  .cart_page {
    .clear {
      float: left !important;
    }
    .table_list_wrapper {
      height: 536px;
    }
    .input-number,
    .input-number-decrement,
    .input-number-increment {
      height: 45px !important;
    }
    .input-number_wrapper {
      .input-number-decrement,
      .input-number-increment {
        line-height: 45px !important;
      }
    }
    .pagination_wrapper{
      margin-top: 15px;
      position: relative;
      width: 100%;
      bottom: auto;
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
  }




</style>