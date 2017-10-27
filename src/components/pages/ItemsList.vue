<template>
  <div style="height: 100%; position: relative;">
    <div class="table_list_wrapper">
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        :pagination.sync="pagination"
        hide-actions
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
          <td><a href="#" @click.prevent="goPage(props.item.guid)">{{ props.item.name }}</a></td>
          <td class="text-xs-right">{{ props.item.price }} р.</td>
          <td class="text-xs-right">{{ props.item.count }} {{ props.item.unit }} </td>
          <!-- <td  class="text-xs-center"><buy-btn :id='props.item.id' /></td> -->
          <td class="text-xs-center">
            <v-btn color="primary" fab small dark @click.stop="buy_item(props.item.guid, props.item.count, props.item.name, props.item.unit)">
              <v-icon>add_shopping_cart</v-icon>
            </v-btn>
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="pagination_wrapper text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" v-if="pages > 1"></v-pagination>
    </div>
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
            :full=true
            @change="countChange"
          />
        <v-card-actions>

          <v-btn class="darken-1" color="error" @click.native="dialog.state = false">
            <v-icon left dark>block</v-icon>
            Отмена
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="darken-1" color="primary" @click.native="buy_btn">
            Добавить
            <v-icon right dark>done</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'items',
  data () {
    return {
      search: '',
      no_data_text: 'Ничего не найдено',
      dialog: {
        name: null,
        unit: null,
        state: false,
        max: 1,
        count: 1,
        id: null
      },
      pagination: {
        sortBy: 'name',
        page: 1,
        rowsPerPage: 10,
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
        { text: 'На складе', value: 'count' },
        { text: '', value: '', sortable: false, }
      ],
    }
  },
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    },
    items () {
      return this.$store.getters.products
    },
    id () {
      return this.$route.params.id
    }
  },
  methods: {
    goPage: function(id) {
      this.$router.push({ name: 'Product', params: { id:id }})
      //this.getData('getProduct', id)
    },
    getData: function(id) {
      this.$store.dispatch('getProducts', id)
    },
    buy_item: function(id, max, name, unit) {
      this.dialog.id = id
      this.dialog.name = name
      this.dialog.unit = unit
      this.dialog.count = 0
      this.dialog.max = max
      this.dialog.state = true
    },
    buy_btn: function() {
      if (this.dialog.count > 0) {
        this.$store.dispatch('addCartProduct', {id: this.dialog.id, count: this.dialog.count})
        this.$snotify.success('Добавлен в корзину ' + this.dialog.count + ' ' + this.dialog.unit, this.dialog.name, {
          timeout: 4000,
          showProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false
        });
      }
      this.dialog.state = false
    },
    countChange: function(id, val) {
      this.dialog.count = val
    }
  },
  watch: {
    id: function () {
      this.pagination.page = 1;
      this.getData(this.id)
    },
    'dialog.state' (val) {
      if (!val){
        this.dialog.id = 0
      }
    }
  },
  mounted: function() {
    this.getData(this.id);
  }
}
</script>

<style lang="scss">
  .table_list_wrapper {
    height: 730px;
  }
  .pagination_wrapper{
    position: absolute;
    width: 100%;
    bottom: 10px;
  }
  table.table tbody {
    td, th{
      font-size: 17px;
      height: 65px;
    }
    td{
      &:first-child {
        padding: 0;
        max-width: 630px;
      }
      a {
          color: rgba(0, 0, 0, 0.87);
          display: block;
          padding: 19px 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
    }
  }

  .btn--floating.btn--small .icon {
    font-size: 27px;
    height: 24px;
    width: 24px;
  }

  .dialog {
    .btn {
      margin: 0 30px;
      height: 50px;
      width: 163px;
    }
    .card__actions {
      padding-top: 20px;
      padding-bottom: 20px;
    }

    .input-number_wrapper {
      text-align: center;
      margin: 20px auto;
      .input-number,
      .input-number-decrement,
      .input-number-increment {
        height: 60px;
      //  width: 60px !important;
        line-height: 60px;
      }
    }
  }

</style>