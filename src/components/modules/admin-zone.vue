<template>
  <v-dialog v-model="admin_visible" fullscreen transition="dialog-bottom-transition" >
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn :style="'padding: 0 40px;'" icon @click.native="close()" dark>
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Admin Zone</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-container fluid grid-list-lg class="grey lighten-4">
        <v-layout row wrap>
          <v-flex
            @click="incass"
            class="admin_menu_item">
            <v-card>
                <v-btn flat color="teal" value="recent">
                  <v-icon>system_update</v-icon>
                  <span>Инкассировать</span>
                </v-btn>
            </v-card>
          </v-flex>
          <v-flex
            @click="money_info"
            class="admin_menu_item">
            <v-card>
                <v-btn flat color="teal" value="recent">
                  <v-icon>attach_money</v-icon>
                  <span>Инфомация о наличке</span>
                </v-btn>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
var instance = axios.create({
  baseURL: 'http://backend.my/api/'
});
export default {
  name: 'admin-zone',
  data () {
    return {
    }
  },
  computed: {
    admin_visible () {
      //return true
      return this.$store.getters.admin_visible
    }
  },
  watch: {
  },
  methods: {
    close () {
      this.$store.dispatch('admin_visible', false)
    },
    money_info (check = false) {

      let _this = this
      instance.post('cash/info')
        .then(function (response) {
          _this.$snotify.info('Информация о наличке запрошена', 'Заберите чек', {
            timeout: 3000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    incass () {
      let _this = this
      instance.post('cash/incass')
        .then(function (response) {
          _this.$snotify.info('Инкассация проведена', 'Заберите чек', {
            timeout: 3000,
            showProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss">
.dialog--fullscreen,
.dialog__content {
  position: absolute;
}

.admin_menu_item {
  max-width: 50%;
  .btn {
    width: 100%;
    margin: 0;
    padding: 10px 0;
    .btn__content {
      flex-wrap: wrap;
      i {
        font-size: 100px;
        margin-bottom: 10px;
      }
      span {
        display: block;
        width: 100%;
      }
    }
  }
}

.dialog--fullscreen > .card {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
</style>