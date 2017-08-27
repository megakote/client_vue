<template>
  <div flex-end class="text-xs-center pagination_wrapper">
    <!-- <v-pagination v-bind:length.number="pages" v-model="page" total-visible="3" v-if="pages > 1"/> -->
    <v-pagination :length.number="pages" v-model="page" v-if="pages > 1"/>
  </div>  
</template>

<script>
export default {
  name: 'pagination',
  data () {
    return {
      page: 1
    }
  },
  props: ['perPage','length'],
  computed:{
    pages: function() {
      return Math.ceil(this.length / this.perPage);
    }
  },
  watch: {
    page: function() {
      this.$parent.page = this.page;
    }
  }
}
</script>