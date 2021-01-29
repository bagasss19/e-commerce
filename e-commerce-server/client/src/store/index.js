import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import router from '../router/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products : [],
    product : {}
  },
  mutations: {
    read (state , payload) {
      state.products = payload
    },
    readId(state , payload) {
      state.product = payload
    } 

  },
  actions: {
    read (context) {
      axios({
        url : '/admin',
        method : 'get',
         headers : {
            token : localStorage.token
        }
      })
    .then(data => {
        context.commit('read' , data)
      })
    },

    readId (context, id) {
      axios({
        url : '/admin/' + id,
        method : 'get',
         headers : {
            token : localStorage.token
        }
    })
    .then(data => {
        context.commit('readId' , data.data)
        console.log(data.data);        
    })
    },

   edit(context, payload) {
      console.log(payload);
      console.log(payload.id,'<<<<<<<<<<<<<<id index');
         axios({
           url : `/admin/${payload.id}`,
           method : 'put',
           data : {
            name : payload.name,
            image_url : payload.image_url,
            price : payload.price,
            stock : payload.stock
           },
            headers : {
               token : localStorage.token
           }
       })
       .then(data => {
          router.push({ name: "Home" })
       })
   },

    remove(context, id) {
       axios({
           url : `/admin/${id}`,
           method : 'delete',
           headers : {
               token : localStorage.token
           }
       })
       .then(data => {
          this.dispatch('read')
       })
   },
      add (context, payload) {
        axios({
          url : '/admin',
          method : 'post',
          data : payload,
          headers : {
                       token : localStorage.token
                   }
           })
       .then(data => {
           router.push({ name: "Home" });
           })
      }
  }
})
