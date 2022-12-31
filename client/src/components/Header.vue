<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
        <router-link 
        class="home"
        tag="span"
        :to="{
          name: 'songs'
        }">
        TabTracker
        </router-link> 
    </v-toolbar-title>
    <v-toolbar-items class="items">
      <v-btn depressed dark color="transparent"
      :to="{
          name: 'songs'
        }">
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items >
        <v-btn v-if="!$store.state.isUserLoggedIn" depressed  dark color="transparent"  :to="{
          name: 'login'
        }">
            Log In
        </v-btn>
        <v-btn v-if="!$store.state.isUserLoggedIn" depressed  dark color="transparent"  :to="{
          name: 'register'
        }">
            Sign Up
        </v-btn>
        <v-btn v-if="$store.state.isUserLoggedIn" depressed  dark color="transparent" @click="logout">
            Log Out
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout () {
      // this.$store.dispatch('setToken', null)
      // this.$store.dispatch('setUser', null)
      this.$store.dispatch('removeStore') // metodo para borrar variables locales
      this.$router.push({
        name: '/anyroute'
      }) 
      this.$router.push({
        name: 'songs'
      })
    }
  }
}
</script>

<style scoped>
/* .theme--dark.v-btn.v-btn--has-bg {
    
} */
.home {
  cursor: pointer;
}
.home:hover {
  color: #E9E;
}
</style>
<!-- <button data-v-61dd7a3d="" type="button" class="v-btn v-btn--is-elevated theme--dark v-size--default"><span class="v-btn__content">
    Browse
</span></button> -->