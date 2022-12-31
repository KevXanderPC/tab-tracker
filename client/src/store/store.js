import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
   
    state:{
        token: null,
        user:  [],
        isUserLoggedIn: false
    },
    mutations:{
        setToken (state,token) {
            state.token = token  
            localStorage.setItem("token", state.token)
            if(token){
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser (state,user) {
                state.user = user
                localStorage.setItem("user", JSON.stringify(state.user))
        },
        removeUser (state) {
            if(localStorage.getItem("user")){
                state.user = localStorage.removeItem("user");
            }
          
            console.log(state.user) 
        },
        removeToken (state) {
            if(localStorage.getItem("token")){
                state.token = localStorage.removeItem("token");
                state.isUserLoggedIn = false
            }
            
            
            console.log(state.token)
        },
        initialiseStore (state) {
            var user = localStorage.getItem("user")
            console.log(user)
            console.log(typeof(user))
            
            if(user != null){
                state.user = JSON.parse(user)
                console.log(state.user)
                console.log(typeof(state.user))
            }
            var token = localStorage.getItem("token")
            console.log(token)
            console.log(typeof(token))
            if(token != null){
                state.token = token
                if(token){
                    state.isUserLoggedIn = true
                } else {
                    state.isUserLoggedIn = false
                }
            }
        
		}
    },

    actions:{
        
        setToken ({commit}, token){
            
            commit('setToken', token)
            
        },
        setUser ({commit}, user){
            commit('setUser', user)
        },

        removeStore ({commit}) { 
            console.log("initialized")
            commit('removeUser');   
            commit('removeToken');
        }

        
        }

    })

// user.subscribe((mutation, state) => {
//     Store the state object as a JSON string
//     mutation = commit
//     localStorage.setItem('token', JSON.stringify(state.token));
// })