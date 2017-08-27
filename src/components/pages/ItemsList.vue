<template>
  <div>
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
	        <td>{{ props.item.name }}</td>
	        <td  class="text-xs-right">{{ props.item.price }} р.</td>
	        <td  class="text-xs-right">{{ props.item.stock }} {{ props.item.unit }} </td>
	        <td  class="text-xs-center"><buy-btn :id='props.item.id' /></td>
	      </template>
	    </v-data-table>
	  </div>
    <!-- <pagination :perPage='perPage' :length='length' /> -->

     <div class="text-xs-center pt-2">
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
			  { text: 'На складе', value: 'stock' },
			  { text: '', value: '' }
			],
    }
  }, 
  computed: {
  	items2 () {
  		let items = this.$store.getters.products
      let offset = (this.page - 1) * this.perPage;
      return items.slice(offset, offset + this.perPage);
  	},
  	items () {
  		return this.$store.getters.products     
  	},
  	pages () {
      return this.pagination.rowsPerPage ? Math.ceil(this.items.length / this.pagination.rowsPerPage) : 0
    },
  	length: function() {
      return this.$store.getters.products.length;
    }
  }
}
</script>

<style scss>
	.table_list_wrapper {
	  height: 580px;
	}
	table.table tbody td, table.table tbody th {
		font-size: 17px;
    height: 75px;
	}

</style>