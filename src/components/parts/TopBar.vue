<template>
  <v-card height="80px" style="position: relative">
    <div class="locker" :class="{ active: activeLocker}">
    </div>
    <v-bottom-nav style="position: relative; height: 100%;" value="true" class="transparent">
      <v-toolbar-title :class="'top_logo'" v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat light class="teal--text" @click="back">
        <v-icon>reply</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @mousedown='to("Categorys")' :class="{ 'active': currentRouter == 'Categorys' }">
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @mousedown='to("About")' :class="{ 'active': currentRouter == 'About' }">
        <v-icon>help_outline</v-icon>
      </v-btn>
      <v-btn flat light class="teal--text" @mousedown="modalSearchShow" :class="{ 'active': searchVisible }">
        <v-icon>search</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <div class="cart_wrapper" :class="{ active: cartCount > 0 }">
        <v-btn flat light class="teal--text"  @mousedown='to("Cart")' :disabled="cartCount == 0" :class="{ 'active': currentRouter == 'Cart' }">
          <v-badge left>
            <span slot="badge">{{ cartCount }}</span>
            <v-icon>shopping_cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </v-bottom-nav>
    <search-block :visible="searchVisible"/>
  </v-card>
</template>

<script>
export default {
  name: 'TopBar',
  data () {
    return {
      searchVisible: false,
      currentRouter: 'Categorys'
    }
  },
  props: ['title'],
  methods: {
    back: function () {
      this.$router.go(-1)
      //console.log(this.$parent.history)
    },
    modalSearchShow: function() {
      this.searchVisible = true
      this.$store.dispatch('modal_visible', true)
    },
    to: function(target) {
      // console.log(this.$router.currentRoute)
      this.$router.push({ name: target })
    }
  },
  computed: {
    cartCount () {
      return this.$store.getters.cartProducts.length
    },
    activeLocker () {
      return this.$store.getters.top_bar_blocked
    },
  },
  watch: {
    '$store.getters.modal_visible': function(val) {
      this.searchVisible = val
    },
    '$route': function (val) {
      this.currentRouter = val.name
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    font-size: 50px;
  }
  button.active {
    filter: none !important;
    opacity: 1;
  }
  button.active i{
    // color: #1976d2 !important;
  }
</style>
<style lang="scss">
  .top_logo {
    align-self: center;
    position: absolute;
    left: 10px;
  }
  .cart_wrapper {
    position: absolute;
    right: 10px;
    top: 0;
    bottom: 0;
    width: 160px;
    &.active a {
      filter: none !important;
      i {
        color: #2196f3 !important;
      }
    }
  }
  .icon {
    font-size: 40px;
  }
  .badge::after {
    font-size: 15px;
  }

  .btn--floating.btn--small {
    height: 50px;
    width: 50px;
    .icon {
      font-size: 27px;
    }
  }
  .bottom-nav {
    z-index: 3;
  }
  .locker {
    &.active {
      display: block;
    }
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    opacity: .6;
    left: 250px;
    bottom: 0;
    background: #FFF;
    z-index: 4;
  }
</style>