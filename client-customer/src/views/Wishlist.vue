<template>
  <section id="home-page" class="container">
    <button class="btn btn-danger"  @click="logout" style="position: absolute; top: 10px; left: 10px;">logout</button>
    <div class="row justify-content-center mt-5 pt-5">
      <div class="col-6">
        <h4>
          <b>My Whislists</b>
          <button type="button" @click="home" class="btn btn-pink float-right btn-sm text-light">Back Home</button>
        </h4>
        <ul class="list-unstyled">
          <li v-for="wishlist in wishlists" :key="wishlist.id"  class="media d-flex align-items-center bg-white rounded p-2 shadow mt-3">
            <img :src="wishlist.Product.image_url" class="mr-3 rounded" alt="cover" width="100">
            <div class="media-body p-1">
              <button type="button" class="close float-right" aria-label="Close" @click="deleteWishlist(wishlist.id)">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="text-left">
                  <h5 class="mt-0 mb-0 text-blue">{{wishlist.Product.name}}</h5> 
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
    name : 'Wishlist',
    methods : {
        home() {
            this.$router.push({name : 'Home', path : '/'})
        },
         logout() {
            localStorage.clear()
            this.$store.dispatch('custlogout')
            this.$router.push({name : 'Home', path : '/'})
        },

        deleteWishlist(id) {
            this.$store.dispatch('deleteWishlist', id)
        }
    },
    beforeCreate () {
          this.$store.dispatch('readWishlist')
  },
  
  computed: { 
       wishlists () {
            return this.$store.state.wishlists
    }
  }
}
</script>

<style>

</style>