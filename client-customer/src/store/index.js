import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import axios from '../../config/axios'
import route from '../router/index'
import store from './index'
import Swal from 'sweetalert2'

export default new Vuex.Store({
  state: {
    products : [],
    carts : [],
    wishlists : [],
    transactions : []
  },
  mutations: {
    read(state,payload) {
      state.products = payload
    },
    readCart(state,payload) {
      state.carts = payload
    },
    readWishlist(state,payload) {
      state.wishlists = payload
    },
    readTransaction(state,payload) {
      state.transactions = payload
    }
  },
  actions: {
    custlogin (context, payload) {
      axios({
         url : '/custlogin',
         method : 'post',
          data : {
               email : payload.email,
               password : payload.password
              }
            })
      .then(data => {
           console.log(data);
          localStorage.token = data.data.token
            route.push({ name: "Home" });
          })
        },

    custregister (context, payload) {
          axios({
             url : '/register',
             method : 'post',
              data : {
                   email : payload.email,
                   password : payload.password
                  }
                })
          .then(data => {
               console.log(data);
               Swal.fire(
                'Success!',
                'Register Success',
                'success'
                )
                route.push({ name: "Login" });
              })
            },
    
     read (context) {
      axios({
         url : '/customer',
         method : 'get',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        context.commit('read', data.data)
           console.log(data)
          })
        },

    
    addCart (context, id) {
      axios({
         url : '/customer/' + id,
         method : 'post',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        store.dispatch('readCart')
           console.log(data, '<<<< ini datanya')
          })
      .catch(err => {
        Swal.fire(
          'Oops!',
          'maximum stock reached!',
          'error'
          )
      })
    },

    readCart (context) {
      axios({
         url : '/customer/cart',
         method : 'get',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        context.commit('readCart', data.data)
           console.log(data)
          })
        },

    deleteCart (context, id) {
      axios({
         url : '/customer/' + id,
         method : 'delete',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        Swal.fire(
          'Success!',
          'Cart has been deleted',
          'success'
          )
            store.dispatch('readCart')

          })
        },

     increase (context, id) {
      axios({
         url : '/customer/' + id,
         method : 'put',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
            store.dispatch('readCart')
          })
        },

    decrease (context, id) {
      axios({
         url : '/customer/' + id,
         method : 'patch',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
            store.dispatch('readCart')
          })
        },

    addWishlist (context, id) {
      axios({
         url : '/wishlist/' + id,
         method : 'post',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        Swal.fire(
          'Success!',
          'Wishlist has been added',
          'success'
          )
        store.dispatch('readWishlist')
           console.log(data, '<<<< ini datanya')
          })
      .catch(err => {
        Swal.fire(
          'Oops!',
          'Wishlist already added',
          'info'
          )
      })
        },

    readWishlist (context) {
      axios({
         url : '/wishlist',
         method : 'get',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        context.commit('readWishlist', data.data)
           console.log(data)
          })
        },

    readTransaction (context) {
      axios({
         url : '/customer/transaction',
         method : 'get',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        context.commit('readTransaction', data.data)
           console.log(data)
          })
        },

    deleteWishlist (context, id) {
      axios({
         url : '/wishlist/' + id,
         method : 'delete',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        Swal.fire(
          'Success!',
          'Wishlist has been deleted',
          'success'
          )
            store.dispatch('readWishlist')
          })
        },
   checkout (context) {
      axios({
         url : '/customer/checkout',
         method : 'put',
         headers : {
               token : localStorage.token,
              }
            })
      .then(data => {
        store.dispatch('readCart')
        Swal.fire(
          'Success!',
          'checkout success, enjoy!',
          'success'
          )
          })
        }
  },
})
