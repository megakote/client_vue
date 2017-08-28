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
        <template slot="headerCell" scope="props">
          <span v-tooltip:bottom="{ 'html': props.header.text }">
            {{ props.header.text }}
          </span>
        </template>
        <template slot="items" scope="props">
          <td><a href="#" @click.prevent="goPage(props.item.id)">{{ props.item.name }}</a></td>
          <td  class="text-xs-right">{{ props.item.price }} р.</td>
          <td  class="text-xs-right">{{ props.item.stock }} {{ props.item.unit }} </td>
          <td  class="text-xs-center"><buy-btn :id='props.item.id' /></td>
        </template>
      </v-data-table>
    </div>
    <div class="pagination_wrapper text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages" v-if="pages > 1"></v-pagination>
    </div> 
  </div>
</template>

<script>
export default {
  name: 'items',
  data () {
    return {
      search: '',
      no_data_text: 'Ничего не найдено',
      pagination: { 
        sortBy: 'column', 
        page: 1, 
        rowsPerPage: 7, 
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
        { text: 'На складе', value: 'stock' },
        { text: '', value: '' }
      ],
    }
  }, 
  computed: {
    pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    },
    ///
    pageData: function() {
      let offset = (this.page - 1) * this.perPage;
      return this.items.slice(offset, offset + this.perPage);
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
    }
  },
  watch: {
    id: function () {
      this.page = 1;
      this.getData(this.id)
    }
  },
  mounted: function() {
    this.getData(this.id);
  }
}
</script>

<style lang="scss" scoped>
  .table_list_wrapper {
    height: 580px;
  }
  .pagination_wrapper{
    position: absolute;
    width: 100%;
    bottom: 0;
  }
  table.table tbody {
    td, th{
      font-size: 17px;
      height: 65px;
    }
    td{
      &:first-child {
        padding: 0;
      }
      a {
          color: rgba(0, 0, 0, 0.87);
          display: block;
          padding: 19px 20px;
      }
    }
  }


</style>