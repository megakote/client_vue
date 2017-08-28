<template>
  
  <v-layout fill-height  wrap>
    <v-flex xs3 v-for='item in pageData' :key='item.id'>
      <v-card>
        <v-card-media
                :src="'/static/images/' + item.img"
                @click.stop="goPage(item.id, item.childrens)"
                data-childrens="item.childrens"
                height="160px"
        />
        <v-card-title primary-title> {{ item.name }} </v-card-title>          
      </v-card>
    </v-flex>

    <pagination :perPage='perPage' :length='items.length' />
  </v-layout>

</template>

<script>


export default {
  name: 'categorys',
  data () {
    return {
      page: 1,
      perPage: 8,
      //items: data
    }
  },
  //props: ['id'],
  computed:{
    pageData: function() {
      let offset = (this.page - 1) * this.perPage;
      return this.items.slice(offset, offset + this.perPage);
    },
    items () {
      return this.$store.getters.categorys
    },
    id () {
      return this.$route.params.id
    }
  },
  methods:{
    getData: function(page, id) {
      this.$store.dispatch(page, id)
    },
    goPage: function(id, childrens = false) {
      if (childrens) {
        this.$router.push({ name: 'Products', params: { id:id }})
        this.getData('getProducts', id)
      } else {
        this.$router.push({ name: 'Categorys', params: { id:id }})
        this.getData('getCategory', id)
      }
    }
  },
  mounted: function() {
    this.getData('getCategory', this.id);
  },
  watch: {
    id: function () {
      this.page = 1;
      this.getData('getCategory', this.id)
    }
  }
}
</script>

<style scss>
  .pagination_wrapper {
    width: 100%;
    align-self: flex-end;
  }
  .card__title--primary {
      padding-top: 24px;
      height: 60px;
  }
</style>