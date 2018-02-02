<template>
  <div style="height: 100%; position: relative; padding-bottom: 40px;">
    <v-layout fill-height  wrap>
      <v-flex  class="category_card"
        v-for='item in pageData'
        :key='item.id'
        @click.stop="goPage(item.guid, item.items_parent)"
      >
        <v-card>
          <v-card-media
            :src="item.image"
            data-childrens="item.childrens"
            height="100px"
          />
          <v-card-title primary-title> {{ item.name }} </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <pagination :perPage='perPage' :length='items.length' />
    <v-dialog v-model="dialog_more" max-width="550">
      <v-card class="dialog_more">
        <v-card-title class="headline">Не нашли что искали ?</v-card-title>
        <v-card-text>Если Вы не нашли необходимый товар - позвоните нашему эксперту и он Вам обязательно поможет !</v-card-text>
        <v-card-text class="tel"><b>8 (8443) 55-63-86 </b></v-card-text>
        <v-card-text>У нас есть более 30 000 товаров для Вашего ремонта, дома и интерьера.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" dark large  @click.native="dialog_more = false">Я понял</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>


export default {
  name: 'categorys',
  data () {
    return {
      page: 1,
      perPage: 20,
      dialog_more: false
    }
  },
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
      if (id == 0) {
        this.dialog_more = true
        this.$store.dispatch('more_info', true)
        return
      }
      if (childrens) {
        // this.getData('getProducts', id)
        this.$router.push({ name: 'Products', params: { id:id }})
      } else {
        // this.getData('getCategory', id)
        this.$router.push({ name: 'Categorys', params: { id:id }})
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
    },
    '$store.getters.more_info' (state) {
      this.dialog_more = state
    }
  }
}
</script>

<style lang="scss">
  .layout {
    align-content: flex-start;
    align-items: flex-start;
    .flex {
      padding-right: 10px;
      padding-left: 10px;
    }
  }
  .category_card {
    flex-basis: 20% !important;
    max-width: 20%;
    margin-bottom: 30px;
    padding-left: 10px;
    padding-right: 10px;
  }
  .pagination_wrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .card__title--primary {
    padding-top: 16px;
    height: 60px;
  }
  .card__media__background {
    background-size: contain !important;
  }
  .dialog_more {
    padding: 20px;
    .card__text {
      font-size: 20px;
      &.tel {
        text-align: center;
        font-size: 30px;
        color: green;
      }
    }
    .btn > div {
      font-size: 20px;
      padding: 0px 25px;
      height: auto;
      line-height: 50px;
    }
  }
</style>