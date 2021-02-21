import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../../config/axios'
import route from '../router/index'
import router from '../router/index'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    token: null
  },
  plugins: [createPersistedState()],
  mutations: {
    read(state, payload) {
      state.products = payload
    },
    getToken(state, payload) {
      state.token = payload
    },
    removeToken(state, payload) {
      state.token = null
    },
    readId(state, payload) {
      state.product = payload
    }

  },
  actions: {
    login(context, payload) {
      axios({
        url: "/login",
        method: "post",
        data: {
          email: payload.email,
          password: payload.password,
        },
      })
        .then(data => {
          console.log(data);
          context.commit('getToken', data.data.token)
          localStorage.token = data.data.token
          route.push({ name: "Home" });
        })
    },

    logout(context, payload) {
      context.commit('removeToken', payload)
      localStorage.clear()
      route.push({ name: "Login" });
    },
    read(context) {
      axios({
        url: '/admin',
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.commit('read', data)
        })
    },

    readId(context, id) {
      axios({
        url: '/admin/' + id,
        method: 'get',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          context.commit('readId', data.data)
          console.log(data.data);
        })
    },

    edit(context, payload) {
      console.log(payload);
      console.log(payload.id, '<<<<<<<<<<<<<<id index');
      axios({
        url: `/admin/${payload.id}`,
        method: 'put',
        data: {
          name: payload.name,
          image_url: payload.image_url,
          price: payload.price,
          stock: payload.stock
        },
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          router.push({ name: "Home" })
        })
    },

    remove(context, id) {
      axios({
        url: `/admin/${id}`,
        method: 'delete',
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          this.dispatch('read')
        })
    },

    add(context, payload) {
      console.log(payload, "<<<<<<<<<<<<<<PAYLOADDD")
      const input = new FormData();
      input.append('name', payload.name)
      input.append('image_url', payload.image_url)
      input.append('price', payload.price)
      input.append('stock', payload.stock)

      axios({
        url: '/admin',
        method: 'post',
        data: input,
        headers: {
          token: localStorage.token
        }
      })
        .then(data => {
          router.push({ name: "Home" });
        })
    }
  }
})
