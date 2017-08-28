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
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="335px">
          <div style="height: 100%; position: relative;">
            <div class="table_list_wrapper">
              <v-data-table
                :headers="headers"
                :items="items"
                :search="search"
                :no-data-text="no_data_text"
                :pagination.sync="pagination"
                hide-actions
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
        <v-btn primary @click.native="e1 = 2">Далее</v-btn>
        <v-btn flat>Отмена</v-btn>
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="430px"></v-card>
        <v-btn primary @click.native="e1 = 3">Далее</v-btn>
        <v-btn flat @click.native="e1 = 1">Назад</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card class="grey lighten-1 z-depth-1 mb-5" height="430px"></v-card>
        <v-btn primary @click.native="e1 = 1">Печать чека</v-btn>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
export default {
  name: 'cart',
  data () {
    return {
      e1: 0,
      search: '',
      no_data_text: 'Корзина пуста',
      pagination: { 
        sortBy: 'column', 
        page: 1, 
        rowsPerPage: 5, 
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
    }
  },
  methods: {
    changeCount (val,id) {
      console.log(val,id)      
    }
  },
  // created () {
  //   this.$on('chan', function(val) {
  //     console.log(val)
  //     // body...
  //   })
  // }
}
</script>

<style lang="scss">
  .stepper__content .btn {
      float: right;
  }
  .summ {
    text-align: right;
      padding-bottom: 10px;
  }
</style>