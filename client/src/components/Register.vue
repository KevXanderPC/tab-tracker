/* eslint-disable */
<!-- <template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense class="cyan" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

          <div class="pl-4 pr-4 pt-2 pb-2">
            <input type="email" v-model="email" name="email" placeholder="email">
            <input type="password" v-model="password" name="password" placeholder="password">
            <div class="error" v-html="error" />
            <br>
            <v-btn class="cyan" @click="register">Register</v-btn>
          </div>
      </div>
    </v-flex>
  </v-layout>
</template> -->
<template>
  <v-layout column class="ly" >
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <form 
          name="tab-tracker-form"
          autocomplete="off">
          <v-text-field
            label="Email"
            v-model="email"
          ></v-text-field>
          <br>
          <v-text-field
            label="Password"
            type="password"
            v-model="password"
            autocomplete="new-password"
          ></v-text-field>
        </form>
        <br>
        <div class="danger-alert" v-html="error" />
        <br>
        <v-btn
          dark
          class="cyan"
          @click="register">
          Register
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try{
        const response = await AuthenticationService.register({
            email: this.email,
            password: this.password
          })
          this.$store.dispatch('setToken', response.data.token)
          this.$store.dispatch('setUser', response.data.user)
          this.$router.push({
            name: 'songs'
          })
        } catch (error) {
          this.error = error.response.data.error
        }
  }
  }, 
  components:{
    
  }
}
</script>

<style scoped>
.error {
  color: red;
}
.ly{
  margin-right: 220px;
} 


</style>
/*eslint-enable */
