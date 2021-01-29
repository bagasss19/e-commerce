<template>
  <section>
       <nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
      <button class="btn btn-primary" style="position: absolute; top: 15px; right: 160px;" @click="transaction">History Transaction</button>
      <button class="btn btn-primary" style="position: absolute; top: 15px; right: 80px;" @click="wishlist">My Wishlist</button>
     <button class="btn btn-danger" style="position: absolute; top: 10px; left: 30px;" @click="logout">logout</button>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <div class="dropdown navbar-right">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"> <span class="glyphicon glyphicon-shopping-cart"></span> My Cart</a>
          <ul class="dropdown-menu dropdown-cart" role="menu">
              <li v-for="cart in carts" :key="cart.id">
                  <span class="item">
                    <span class="item-left">
                        <img :src="cart.Product.image_url" style="width:25px;height:25px;"/>
                        <span class="item-info">
                            <span>{{cart.Product.name}}</span>
                            <span>{{cart.quantity}} x Rp. {{thousandSeparator(cart.Product.price)}} </span>
                        </span>
                    </span>
                    <span class="item-right">
                        <button class="btn btn-xs btn-danger pull-right" @click="remove(cart.id)">x</button>
                    </span>
                </span>
              </li>
              <li class="divider"></li>
              <li><a class="text-center pointer" @click="cart">View Cart</a></li>
          </ul>
        </div>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
  </nav>
  </section>
</template>

<script>
export default {
    name : "CartSmall",
    methods : {
        logout() {
            localStorage.clear()
            this.$router.push({name : 'Login', path : '/login'})
        },
        cart() {
            this.$router.push({name : 'Cart', path : '/cart'})
        },
        wishlist() {
            this.$router.push({name : 'Wishlist', path : '/wishlist'})
        },
        transaction() {
            this.$router.push({name : 'Transaction', path : '/transaction'})
        },
        thousandSeparator(num) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },

        remove(id) {
            this.$store.dispatch('deleteCart', id)
        }
    },
        computed: { 
       carts () {
            return this.$store.state.carts
        },
    },
        beforeCreate () {
          this.$store.dispatch('readCart')
    }
}
</script>

<style>

</style>