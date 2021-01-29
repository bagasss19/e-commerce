<template>
  <section id="home-page" class="container">
    <button class="btn btn-danger"  @click="logout" style="position: absolute; top: 10px; left: 10px;">logout</button>
    <div class="row justify-content-center mt-5 pt-5">
      <div class="col-6">
        <h4>
          <b>History Transaction</b>
          <button type="button" @click="home" class="btn btn-pink float-right btn-sm text-light">Back Home</button>
        </h4>
        <ul class="list-unstyled">
          <li v-for="transaction in transactions" :key="transaction.id"  class="media d-flex align-items-center bg-white rounded p-2 shadow mt-3">
            <img :src="transaction.Product.image_url" class="mr-3 rounded" alt="cover" width="100">
            <div class="media-body p-1">
              <div class="text-left">
                  <h4 class="mt-0 mb-0 text-blue">{{transaction.Product.name}}</h4> 
                  <h5 class="mt-0 mb-0 text-blue">Quantity : {{transaction.quantity}}</h5>
                  <h5 class="mt-0 mb-0 text-blue">Purchased AT : {{date(transaction.updatedAt)}}</h5>
              </div>
              <div class="text-left mt-2">
                <span class="text-muted"></span> 
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
    name : 'Transaction',
    methods : {
        home() {
            this.$router.push({name : 'Home', path : '/'})
        },
         logout() {
            localStorage.clear()
            this.$router.push({name : 'Login', path : '/login'})
        },
        date(time) {
            return new Date(time);
        }
    },
    beforeCreate () {
          this.$store.dispatch('readTransaction')
  },
  
  computed: { 
       transactions () {
            return this.$store.state.transactions
    }
  }
}
</script>

<style>

</style>