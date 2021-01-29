<template>
  <section>
      <form class="col-lg-6 offset-lg-3" @submit.prevent="edit">
  <div class="form-group">
    <label for="email">Name:</label>
    <input v-model="name" type="text" class="form-control" placeholder="Enter name">
  </div>
  <div class="form-group">
    <label for="pwd">Image Url:</label>
    <input v-model="image_url" type="text" class="form-control" placeholder="Enter url">
  </div>
  <div class="form-group">
    <label for="pwd">Price:</label>
    <input v-model="product.price" type="text" class="form-control" placeholder="Enter price">
  </div>
  <div class="form-group">
    <label for="pwd">Stock:</label>
    <input v-model="product.stock" type="text" class="form-control" placeholder="Enter stock">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form><br>
  <button class="btn btn-primary" @click="back">Back</button>
  </section>
</template>
<script>
import axios from '../../config/axios'
export default {
    name : 'Add',
     data() {
        return {
            name : '',
            image_url :'',
            price : '',
            stock : ''
        }
    },
     methods : {
       logout() {
        localStorage.clear()
        this.$router.push({ name: "Login" });
    },
        back () {
            this.$router.push({ name: "Home" });
        },
        edit () {
            let payload = {
                name : this.name,
                image_url : this.image_url,
                price : this.price,
                stock : this.stock,
                id : this.product.id
            }
            this.$store.dispatch('edit', payload)
        }
     },
    watch : {
        product () {
            this.name = this.product.name
            this.image_url = this.product.image_url
            this.price = this.product.price
            this.stock = this.product.stock
            this.id = this.product.id
        }
    },

    computed : {
        product () {
         return this.$store.state.product
        }
    },
    created () {
    this.$store.dispatch('readId', this.$route.params.id )
    }
}
</script>

<style>

</style>